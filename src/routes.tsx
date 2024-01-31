import { createBrowserRouter } from "react-router-dom";
import { LoginScreen, MainScreen, SettingsScreen } from "src/screens";
import { ProtectedRoute } from "./screens/components";
import { InstructionScreen } from "./screens/Instruction";

export const router = createBrowserRouter(
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
