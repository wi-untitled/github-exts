import { ModuleServices, ServiceName, Services } from "../types";
import * as modules from "../";

export function createGlobalServices(services: ModuleServices) {
    return Object.keys(services).reduce((acc: Services, name: string) => {
        // @ts-expect-error Need to build stores object
        acc[name as ServiceName] = new services[name]();

        return acc;
    }, {} as Services);
}

export default () => createGlobalServices(modules);
