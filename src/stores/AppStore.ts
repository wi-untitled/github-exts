import {
    action,
    computed,
    makeObservable,
    observable,
    override,
    reaction,
    when,
} from "mobx";
import { STORAGE_KEYS } from "src/constants";
import { AppService, NotificationsService } from "src/services";
import { IUserData } from "src/types";
import { BaseStore } from "src/stores/BaseStore";
import { IState } from "src/stores/interfaces";
import { Transport, IFRAME_TOGGLE_EVENT } from "src/transport";
import { LinkedList } from "src/core/LinkedList";
import * as Sentry from "@sentry/react";

export const AUTO_UPDATES_INTERVAL = 120000;

export type IHandleAutoUpdateArguments = { isAutoUpdateEnabled: boolean };

export class AppStore extends BaseStore implements IState {
    public userData: IUserData;
    public accessToken: string | null;
    public appService: AppService;
    public isOpen: boolean;

    protected isAutoUpdateEnabled: boolean;
    protected intervalId: any | null;
    public listeners: LinkedList<() => void>;

    public constructor(
        transport: Transport,
        notificationsService: NotificationsService,
    ) {
        super(transport, notificationsService);

        makeObservable<
            AppStore,
            "updateIsOpen" | "updateLoading" | "isLoading"
        >(this, {
            isLoading: override,
            isOpen: observable,
            accessToken: observable,
            userData: observable,
            setUserData: action,
            setAccessToken: action,
            updateIsOpen: action,
            updateLoading: override,
            readyInitAsync: computed,
        });

        this.accessToken = "";
        this.userData = {};
        this.isOpen = false;
        this.isAutoUpdateEnabled = false;
        this.listeners = new LinkedList();
        this.appService = new AppService();

        this.init();

        when(
            () => this.isAuthorized,
            async () => {
                await this.initAsync();
            },
        );

        reaction(
            () => this.accessToken,
            (accessToken: string | null) => {
                if (accessToken) {
                    localStorage.setItem(
                        STORAGE_KEYS.ACCESS_TOKEN,
                        accessToken,
                    );
                }
            },
        );

        reaction(
            () => this.isAutoUpdateEnabled,
            (isAutoUpdateEnabled) => {
                if (isAutoUpdateEnabled && this.isAuthorized) {
                    this.registerAutoUpdateHandler();
                } else {
                    clearInterval(this.intervalId);
                }
            },
        );
    }

    protected handleStateIframe = ({
        action,
        data: { isOpen },
    }: {
        action: string;
        data: { isOpen: boolean };
    }): void => {
        if (action === "IFRAME_TOGGLE") {
            this.updateIsOpen(isOpen);
        }
        // TODO: example how to make broadcast message
        // this.transport.sendMessageRuntime({
        //     action: "BROADCAST",
        //     data: {
        //         test: 42,
        //     },
        // });
    };

    protected handleAutoUpdateChange = ({
        isAutoUpdateEnabled,
    }: IHandleAutoUpdateArguments): void => {
        this.isAutoUpdateEnabled = isAutoUpdateEnabled;
    };

    protected init = (): void => {
        this.initializeAccessToken();
        this.readAutoUpdateEnabledFromLocalStorage();
        this.registerRuntimeMessageHandler();
        this.registerAutoUpdate();

        if (this.isAutoUpdateEnabled) {
            this.registerAutoUpdateHandler();
        }
    };

    protected initAsync = async (): Promise<void> => {
        await this.initUserData();
    };

    protected initializeAccessToken = (): void => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

            if (token) {
                this.setAccessToken(token);
            }
        } catch (error) {
            console.error(error);
        }
    };

    protected registerAutoUpdate = (): void => {
        this.transport.addListener<IHandleAutoUpdateArguments>(
            "AutoUpdateChange",
            (payload) => {
                this.handleAutoUpdateChange(payload.data);
            },
        );
    };

    protected registerRuntimeMessageHandler = (): void => {
        this.transport.onValueRuntime<IFRAME_TOGGLE_EVENT>(
            this.handleStateIframe,
        );
    };

    protected registerAutoUpdateHandler = (): void => {
        try {
            this.intervalId = setInterval(() => {
                if (this.isAutoUpdateEnabled === false) {
                    clearInterval(this.intervalId);
                }

                let cursor = this.listeners.head;

                while (cursor) {
                    if (typeof cursor.value === "function") {
                        cursor.value();
                    }
                    cursor = cursor.next;
                }
            }, AUTO_UPDATES_INTERVAL);
        } catch (error) {
            console.trace(error);
        }
    };

    protected initUserData = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const userData = await this.appService.getUserData();

            Sentry.setUser({ login: userData.login });

            this.setUserData(userData);
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    protected readAutoUpdateEnabledFromLocalStorage = (): void => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);

            if (!data) {
                return;
            }

            const { isAutoUpdateEnabled } = JSON.parse(data);

            this.isAutoUpdateEnabled = Boolean(isAutoUpdateEnabled);
        } catch (error) {
            console.log("error");
            console.trace(error);
            this.isAutoUpdateEnabled = false;
        }
    };

    /**
     * Make it public because inside popup.html
     * there is no way pass message to change "isOpen" to "true".
     */
    public updateIsOpen = (isOpen: boolean): void => {
        this.isOpen = isOpen;
    };

    public setUserData = (userData: IUserData): void => {
        this.userData = userData;
    };

    public handleLogout = (): void => {
        this.setAccessToken(null);

        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    };

    public setAccessToken = (accessToken: string | null): void => {
        this.accessToken = accessToken;

        if (accessToken) {
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        }
    };

    public get isAuthorized(): boolean {
        return Boolean(this.accessToken);
    }

    public get readyInitAsync(): boolean {
        return this.isAuthorized && this.isOpen && !this.isLoading;
    }
}
