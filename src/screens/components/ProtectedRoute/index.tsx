import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import { useStore } from "src/hooks";
import { LoginScreen } from "src/screens/Login";

export interface IProtectedRouteProps {
    element: React.ReactElement;
}

export function ProtectedRouteComponent({ element }: IProtectedRouteProps) {
    const appStore = useStore("AppStore");

    if (appStore.isAuthorized === false) {
        return <Navigate to={LoginScreen.routeName} />;
    }

    return element;
}

export const ProtectedRoute = observer(ProtectedRouteComponent);
