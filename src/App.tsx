import { observer } from "mobx-react";
import { useGithubAuth, useStore } from "./hooks";

import "./App.css";
import { useEffect } from "react";
import { UserProfileModule } from "./modules";

function AppComponent() {
    const appStore = useStore("AppStore");

    const { handleLoginGithubCallback, handleRequestAccessTokenCallback } =
        useGithubAuth({
            onRequestAccessTokenSuccess:
                appStore.handleRequestAccessTokenSuccess,
            onRequestAccessTokenError: appStore.handleRequestAccessTokenError,
        });

    return (
        <>
            <div className="flex flex-col w-full">
                {appStore.isAuthorized && <UserProfileModule />}
                {appStore.isAuthorized && (
                    <button onClick={appStore.handleLogout}>Logout</button>
                )}
                {!appStore.isAuthorized && (
                    <>
                        <button onClick={handleLoginGithubCallback}>
                            Login GitHub
                        </button>
                        <button onClick={handleRequestAccessTokenCallback}>
                            Click to request access token
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

const App = observer(AppComponent);

export default App;
