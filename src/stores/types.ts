import { NotificationsService } from "src/services";
import * as stores from "src/stores";
import { Transport } from "src/transport";

export interface StoreClass<T> {
    new (transport: Transport, notificationService: NotificationsService): T;
}

export type StoreName = keyof typeof stores;

export type DisposableStoreInstance<T> = T & { dispose?: () => void };

export type Stores = {
    [key in StoreName]: DisposableStoreInstance<
        InstanceType<(typeof stores)[key]>
    >;
};

export type ModuleStores = {
    [key in StoreName]: StoreClass<(typeof stores)[key]["prototype"]>;
};
