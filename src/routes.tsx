import { createBrowserRouter } from "react-router-dom";
import { LoginScreen } from "src/screens/Login";
import { InstructionScreen } from "src/screens/Instruction";
import { MainScreen } from "src/screens/Main";
import { SettingsScreen } from "src/screens/Settings";
import { ProtectedRoute } from "src/screens/components";

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
