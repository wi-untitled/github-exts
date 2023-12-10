import { observer } from "mobx-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginScreen, MainScreen, SettingsScreen } from "src/screens";
import { ProtectedRoute } from "./screens/components";
import { Assets } from "src/components";

import "./App.css";

const router = createBrowserRouter(
    [
        {
            path: MainScreen.routeName,
            element: <ProtectedRoute element={<MainScreen />} />,
        },
        {
            path: LoginScreen.routeName,
            element: <LoginScreen />,
        },
        {
            path: SettingsScreen.routeName,
            element: <ProtectedRoute element={<SettingsScreen />} />,
        },
    ],
    {
        basename: "/contentScript.html",
    },
);

function AppComponent() {
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);
    console.log(42);

    return (
        <>
            <Assets />
            <RouterProvider router={router} />
        </>
    );
}

const App = observer(AppComponent);

export default App;
