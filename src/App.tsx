import { observer } from "mobx-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginScreen, MainScreen, SettingsScreen } from "src/screens";
import { ProtectedRoute } from "./screens/components";
import { Assets } from "src/components";

import "./App.css";
import { InstructionScreen } from "./screens/Instruction";

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
            path: InstructionScreen.routeName,
            element: <InstructionScreen />,
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
    return (
        <>
            <Assets />
            <RouterProvider router={router} />
        </>
    );
}

const App = observer(AppComponent);

export default App;
