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

        this.notifications = [];
        this.uniqueUrls = new Set(
            this.notifications.map(({ pull_request }) => pull_request.html_url),
        );

        this.transport = getTransport();

        autorun(async () => {
            if (
                this.appStore.isAuthorized &&
                this.appStore.isOpen &&
                !this.appStore.isLoading
            ) {
                await this.initAsync();
            }
        });
    }

    protected initAsync = async (): Promise<void> => {
        await this.fetch();

        this.appStore.listeners.add(this.fetch);
    };

    protected fetch = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const login = this.appStore.userData.login;
            const { items } =
                await this.notificationsService.getNotificationsApprovedTop10({
                    login: login,
                });

            this.setNotifications(items);

            const newUrls = items.map(
                ({ pull_request }) => pull_request.html_url,
            );
            const hasDiff =
                difference([...this.uniqueUrls], newUrls).length > 0;

            this.transport.sendMessageRuntime({
                action: "NOTIFY_BROADCAST",
                data: {
                    hasDiff: hasDiff,
                },
            });
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

        // TODO: just for test
        //this.uniqueUrls.add("qwe");
    };

    public get isEmpty(): boolean {
        return this.notifications.length === 0;
    }
}
