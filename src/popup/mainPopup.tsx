import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import AppPopup from "./AppPopup.tsx";

import "./indexPopup.css";
import { Provider } from "mobx-react";
import createGlobalServices from "src/services/utils/createGlobalServices.ts";
import createGlobalStores from "src/stores/utils/createGlobalStores.ts";
import { getTransport } from "src/transport/Transport.ts";
import "src/i18n/config";
import { WelcomeLoading } from "src/components/index.ts";

export async function initialize(): Promise<any> {
    const transport = getTransport();

    const stores = createGlobalStores(transport);
    const services = createGlobalServices();

    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                stores: stores,
                services: services,
            });
        }, 30000000);
    });

    return promise;
}

export function RenderApp() {
    const [initialized, setInitialized] = useState(false);
    const ref = useRef<any>();

    useEffect(() => {
        const initializeAsync = async () => {
            const { stores, services } = await initialize();

            ref.current = {
                stores: stores,
                services: services,
            };

            setInitialized(true);
        };

        initializeAsync();
    }, []);

    return initialized ? (
        <Provider stores={ref.current.stores} services={ref.current.services}>
            <React.StrictMode>
                <AppPopup />
            </React.StrictMode>
        </Provider>
    ) : (
        <WelcomeLoading />
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<RenderApp />);
