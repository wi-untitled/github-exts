import { observer } from "mobx-react";
import { RouterProvider } from "react-router-dom";
import { Assets } from "src/components";
import { router } from "src/routes";

import "./App.css";

function AppComponent() {
    return (
        <>
            <Assets />
            <RouterProvider router={router} />
        </>
    );
}

const App = observer(AppComponent);

export default App;
