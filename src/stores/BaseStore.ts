import { NotificationsService } from "src/services";
import { Transport, getTransport } from "src/transport";
import { ILoadable } from "./interfaces";
import { LoadableStore } from "./LoadableStore";

export class BaseStore extends LoadableStore implements ILoadable {
    protected transport: Transport;
    protected notificationService: NotificationsService;

    public constructor(
        transport: Transport = getTransport(),
        notificationService: NotificationsService,
    ) {
        super();

        this.transport = transport;
        this.notificationService = notificationService;
    }
}
