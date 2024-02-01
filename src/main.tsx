import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import App from "src/App.tsx";
import createGlobalStores from "src/stores/utils/createGlobalStores";
import createGlobalServices from "src/services/utils/createGlobalServices";
import { FeatureFlagProvider } from "src/core";
import { getTransport } from "src/transport";
import { defaultState } from "src/featureFlags";

import "src/i18n/config";
import "./index.css";
import { WelcomeLoading } from "./components";

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
        }, 1500);
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
                <FeatureFlagProvider initialFeatureFlags={defaultState}>
                    <App />
                </FeatureFlagProvider>
            </React.StrictMode>
        </Provider>
    ) : (
        <WelcomeLoading />
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<RenderApp />);
