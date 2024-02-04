import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import App from "src/App.tsx";
import createGlobalStores from "src/stores/utils/createGlobalStores";
import createGlobalServices from "src/services/utils/createGlobalServices";
import { FeatureFlagProvider } from "src/core";
import { getTransport } from "src/transport";
import { defaultState } from "src/featureFlags";
import { WelcomeLoading } from "./components";
import * as Sentry from "@sentry/react";
import { Dedupe, Debug, HttpClient } from "@sentry/integrations";

import "src/i18n/config";
import "./index.css";

Sentry.init({
    release: import.meta.env.APP_VERSION,
    environment: import.meta.env.MODE,
    dsn: "https://e6f522d37c7ed1e1ff70895d774a5af8@o422463.ingest.sentry.io/4506678795960320",
    integrations: [
        new Sentry.BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ["localhost", "*"],
        }),
        Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
        }),
        new Dedupe(),
        new Debug(),
        new HttpClient(),
        new Sentry.BrowserProfilingIntegration(),
        new Sentry.BrowserTracing(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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

    return (
        <div className="h-full">
            {initialized ? (
                <Provider
                    stores={ref.current.stores}
                    services={ref.current.services}
                >
                    <React.StrictMode>
                        <FeatureFlagProvider initialFeatureFlags={defaultState}>
                            <App />
                        </FeatureFlagProvider>
                    </React.StrictMode>
                </Provider>
            ) : (
                <WelcomeLoading />
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<RenderApp />);
