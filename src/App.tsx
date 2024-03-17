import { observer } from "mobx-react";
import { RouterProvider } from "react-router-dom";
import { Assets } from "src/components";
import { router } from "src/routes";

import * as Sentry from "@sentry/react";

import "./App.css";
import { useEscape } from "./hooks";

function AppComponent() {
    useEscape();
    console.log(312);
    return (
        <>
            <Assets />
            <RouterProvider router={router} />
        </>
    );
}

const App = Sentry.withProfiler(observer(AppComponent));

export default App;
