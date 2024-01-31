import { difference } from "lodash";
import { action, autorun, makeObservable, observable } from "mobx";
import { NotificationsService } from "src/services";
import { AppStore } from "src/stores";
import { LoadableStore } from "src/stores/LoadableStore";
import { Transport, getTransport } from "src/transport";
import { INotification } from "src/types";

export class NotificationsStore extends LoadableStore {
    public appStore: AppStore;
    public notificationsService: NotificationsService;
    public notifications: INotification[];

    protected transport: Transport;
    protected uniqueUrls: Set<string>;

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
            if (this.appStore.readyInitAsync) {
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

            const { items } =
                await this.notificationsService.getNotificationsCreatedLastWeek();

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
    };

    public get isEmpty(): boolean {
        return this.notifications.length === 0;
    }
}
