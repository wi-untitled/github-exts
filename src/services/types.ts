import * as services from "src/services";

export type ServiceClass<T> = new () => T;

export type ServiceName = keyof typeof services;

export type DisposableServiceInstance<T> = {
    new: () => void;
    dispose?: () => void;
} & T;

export type Services = {
    [key in ServiceName]: DisposableServiceInstance<
        InstanceType<(typeof services)[key]>
    >;
};

export type ModuleServices = {
    [key in ServiceName]: ServiceClass<(typeof services)[key]["prototype"]>;
};
