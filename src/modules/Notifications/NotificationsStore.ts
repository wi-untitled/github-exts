import { action, makeObservable, observable } from "mobx";
import { NotificationsService } from "src/services";
import { AppStore } from "src/stores";
import { INotification } from "src/types";

export class NotificationsStore {
    public appStore: AppStore;
    public notificationsService: NotificationsService;
    public notifications: INotification[];

    public constructor(
        appStore: AppStore,
        notificationsService: NotificationsService,
    ) {
        makeObservable(this, {
            notifications: observable,
            setNotifications: action,
        });

        this.appStore = appStore;
        this.notificationsService = notificationsService;

        this.notifications = [];

        if (this.appStore.isAuthorized) {
            this.initAsync();
        }
    }

    public initAsync = async (): Promise<void> => {
        try {
            const notifications =
                await this.notificationsService.getNotifications();

            this.setNotifications(notifications);
        } catch (error) {
            console.error(error);
        }
    };

    public setNotifications = (notifications: INotification[]): void => {
        this.notifications = [...notifications];
    };

    public get reviewRequestedNotifications(): INotification[] {
        return this.notifications.filter(({ reason }) => {
            return reason === "review_requested";
        });
    }

    public get isEmpty(): boolean {
        return this.reviewRequestedNotifications.length === 0;
    }
}
