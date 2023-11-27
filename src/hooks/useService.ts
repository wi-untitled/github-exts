import { MobXProviderContext } from "mobx-react";
import { Context, useContext } from "react";
import { ServiceName, Services } from "../services/types";

export function useService<T extends ServiceName>(serviceName: T): Services[T] {
    const appContext = useContext(MobXProviderContext as Context<any>);

    return appContext.services[serviceName];
}
