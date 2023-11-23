import * as stores from "../";
import { ModuleStores, StoreName, Stores } from "../types";

export function createGlobalStores(globalStores: ModuleStores, transport: any) {
    return Object.keys(globalStores).reduce(
        // @ts-expect-error Need to build stores object
        (table: Stores, name: StoreName) => {
            table[name] = new globalStores[name](transport);

            return table;
        },
        {} as Stores,
    );
}

export default (transport: any) => createGlobalStores(stores, transport);
