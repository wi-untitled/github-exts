import { MobXProviderContext } from "mobx-react";
import { Context, useContext } from "react";

import { StoreName, Stores } from "src/stores/types";
import { AppOptions } from "src/types";

export function useStore<T extends StoreName>(storeName: T): Stores[T] {
    const appContext = useContext(
        MobXProviderContext as unknown as Context<AppOptions>,
    );

    return appContext.stores[storeName];
}
