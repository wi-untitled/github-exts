import { action, makeObservable, observable } from "mobx";
import { NotificationsService } from "src/services";
import { Transport, getTransport } from "src/transport";

export class BaseStore {
    public isLoading: boolean;
    protected transport: Transport;
    protected notificationService: NotificationsService;

    public constructor(
        transport: Transport = getTransport(),
        notificationService: NotificationsService,
    ) {
        makeObservable<BaseStore, "updateLoading">(this, {
            isLoading: observable,
            updateLoading: action,
        });

        this.isLoading = true;

        this.transport = transport;
        this.notificationService = notificationService;
    }

    protected updateLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}
