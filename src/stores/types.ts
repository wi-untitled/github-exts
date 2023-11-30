import * as stores from "src/stores";

export interface StoreClass<T> {
    new (transport: any): T;
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
