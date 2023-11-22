import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "mobx-react";
import App from "./App.tsx";
import createGlobalStores from "./stores/utils/createGlobalStores";

import "./index.css";

export async function initialize(): Promise<any> {
  const transport = {};

  const stores = createGlobalStores(transport);

  const promise = new Promise(async (resolve) => {
    setTimeout(() => {
      resolve({
        stores: stores,
      });
    }, 1000);
  });

  return promise;
}

export function RenderApp() {
  const [initialized, setInitialized] = useState(false);
  const ref = useRef<any>();

  useEffect(() => {
    const initializeAsync = async () => {
      const { stores } = await initialize();

      ref.current = {
        stores: stores,
      };

      setInitialized(true);
    };

    initializeAsync();
  }, []);

  return initialized ? (
    <Provider stores={ref.current.stores} services={ref.current.services}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  ) : (
    <div>loading</div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<RenderApp />);
