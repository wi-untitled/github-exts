import { action, makeObservable, observable, when } from "mobx";
import { NotificationsService } from "src/services";
import { AppStore } from "src/stores";
import { BaseStore } from "src/stores/BaseStore";
import { INotification } from "src/types";

export class NotificationsStore extends BaseStore {
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

        when(
            () => this.appStore.isAuthorized && !this.appStore.isLoading,
            async () => {
                await this.initAsync();
            },
        );
    }

    public initAsync = async (): Promise<void> => {
        try {
            this.updateLoading(true);

            const notifications =
                await this.notificationsService.getNotifications();
            // const {items} =
            // await this.notificationsService.getNotificationsCreatedLastWeek();

            // TODO: check when PR is open
            // this.setNotifications(items);
            this.setNotifications(notifications);
            this.updateLoading(false);
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
