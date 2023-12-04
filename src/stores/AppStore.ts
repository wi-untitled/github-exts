import {
    action,
    makeAutoObservable,
    observable,
    override,
    reaction,
    when,
} from "mobx";
import { STORAGE_KEYS } from "src/constants";
import { AppService } from "src/services";
import { IUserData } from "src/types";
import { BaseStore } from "./BaseStore";

export class AppStore extends BaseStore {
    public userData: IUserData;
    public accessToken: string | null;
    public appService: AppService;
    public isOpen: boolean;

    public constructor() {
        super();

        makeAutoObservable<AppStore, "updateIsOpen" | "updateLoading">(this, {
            isLoading: override,
            isOpen: observable,
            accessToken: observable,
            userData: observable,
            setUserData: action,
            setAccessToken: action,
            updateIsOpen: action,
            updateLoading: override,
        });

        this.accessToken = "";
        this.isOpen = false;
        this.appService = new AppService();
        this.userData = {};

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
    }

    private handleStateIframe = ({
        action,
        data: { isOpen },
    }: {
        action: string;
        data: { isOpen: boolean };
    }): void => {
        if (action === "IFRAME_TOGGLE") {
            this.updateIsOpen(isOpen);
        }
    };

    protected init = (): void => {
        this.initializeAccessToken();
        this.registerRuntimeMessageHandler();
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

    protected registerRuntimeMessageHandler = (): void => {
        chrome.runtime.onMessage.addListener(this.handleStateIframe);
    };

    protected initAsync = async (): Promise<void> => {
        await this.initUserData();
    };

    protected initUserData = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const userData = await this.appService.getUserData();

            this.setUserData(userData);
            this.updateLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    protected updateIsOpen = (isOpen: boolean): void => {
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
    };

    public get isAuthorized(): boolean {
        return Boolean(this.accessToken);
    }
}
