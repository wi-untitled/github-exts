import { observer } from "mobx-react";
import { RouterProvider } from "react-router-dom";
import { Assets } from "src/components";
import { router } from "src/routes";

import "./App.css";
import { useEscape } from "./hooks";

function AppComponent() {
    useEscape();

    return (
        <>
            <Assets />
            <RouterProvider router={router} />
        </>
    );
}

const App = observer(AppComponent);

export default App;
