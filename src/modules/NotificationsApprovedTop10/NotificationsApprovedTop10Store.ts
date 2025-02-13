import { difference } from "lodash";
import { action, autorun, makeObservable, observable } from "mobx";
import { NotificationsService } from "src/services";
import { AppStore } from "src/stores";
import { LoadableStore } from "src/stores/LoadableStore";
import { Transport, getTransport } from "src/transport";
import { INotification } from "src/types";

export class NotificationsApprovedTop10Store extends LoadableStore {
    public appStore: AppStore;
    public notificationsService: NotificationsService;
    public notifications: INotification[];

    protected uniqueUrls: Set<string>;
    protected transport: Transport;
    protected isListenerRegistered: boolean;

    public constructor(
        appStore: AppStore,
        notificationsService: NotificationsService,
    ) {
        super();

        makeObservable(this, {
            notifications: observable,
            setNotifications: action,
        });

        this.appStore = appStore;
        this.notificationsService = notificationsService;
        this.isListenerRegistered = false;

        this.notifications = [];
        this.uniqueUrls = new Set(
            this.notifications.map(({ pull_request }) => pull_request.html_url),
        );

        this.transport = getTransport();

        autorun(async () => {
            if (this.appStore.readyInitAsync) {
                await this.initAsync();
            }
        });
    }

    protected initAsync = async (): Promise<void> => {
        await this.fetch();

        if (this.isListenerRegistered === false) {
            this.appStore.listeners.add(this.fetch);

            this.isListenerRegistered = true;
        }
    };

    protected fetch = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const login = this.appStore.userData.login;
            const { items } =
                await this.notificationsService.getNotificationsApprovedTop10({
                    login: login,
                });

            const newUrls = items.map(
                ({ pull_request }) => pull_request.html_url,
            );
            const hasDiff =
                difference(newUrls, [...this.uniqueUrls]).length > 0;
            this.transport.sendMessageRuntime({
                action: "NOTIFY_BROADCAST",
                data: {
                    hasDiff: hasDiff,
                    name: "notification top 10",
                },
            });

            this.setNotifications(items);
        } catch (error) {
            console.error(error);
        } finally {
            this.updateLoading(false);
        }
    };

    public setNotifications = (notifications: INotification[]): void => {
        this.notifications = [...notifications];

        const newUniqueUrls = this.notifications.map(
            ({ pull_request }) => pull_request.html_url,
        );

        this.uniqueUrls = new Set(newUniqueUrls);
    };

    public get isEmpty(): boolean {
        return this.notifications.length === 0;
    }
}
