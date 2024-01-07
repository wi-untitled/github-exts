import { NotificationsService } from "src/services";
import * as stores from "src/stores";
import { ModuleStores, StoreName, Stores } from "src/stores/types";
import { Transport } from "src/transport";

export const ignoreStores = ["LoadableStore"];

export function createGlobalStores(
    globalStores: ModuleStores,
    transport: Transport,
) {
    const notificationService = new NotificationsService();

    return Object.keys(globalStores).reduce(
        // @ts-expect-error Need to build stores object
        (table: Stores, name: StoreName) => {
            // @ts-expect-error Need to build stores object
            table[name] = new globalStores[name](
                transport,
                notificationService,
            );

            return table;
        },
        {} as Stores,
    );
}

export default (transport: Transport) => createGlobalStores(stores, transport);
