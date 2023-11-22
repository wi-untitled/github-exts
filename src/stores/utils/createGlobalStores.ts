import * as stores from "../";
import { ModuleStores, StoreName, Stores } from "../types";

export function createGlobalStores(globalStores: ModuleStores, transport: any) {
  return Object.keys(globalStores).reduce(
    // @ts-ignore
    (table: Stores, name: StoreName) => {
      // @ts-ignore
      table[name] = new globalStores[name](transport);

      return table;
    },
    {} as Stores
  );
}

export default (transport: any) => createGlobalStores(stores, transport);
