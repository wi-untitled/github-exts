import { action, autorun, makeObservable, observable } from "mobx";
import { NotificationsService } from "src/services";
import { AppStore } from "src/stores";
import { BaseStore } from "src/stores/BaseStore";
import { INotification } from "src/types";

export class NotificationsApprovedTop10Store extends BaseStore {
    public appStore: AppStore;
    public notificationsService: NotificationsService;
    public notifications: INotification[];

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

        autorun(async () => {
            if (this.appStore.isAuthorized && this.appStore.isOpen) {
                await this.initAsync();
            }
        });
    }

    protected initAsync = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const login = this.appStore.userData.login;
            const { items } =
                await this.notificationsService.getNotificationsApprovedTop10({
                    login: login,
                });

            this.setNotifications(items);
            this.updateLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    public setNotifications = (notifications: INotification[]): void => {
        this.notifications = [...notifications];
    };

    public get isEmpty(): boolean {
        return this.notifications.length === 0;
    }
}
