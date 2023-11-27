import { observer } from "mobx-react";
import { useGithubAuth, useService, useStore } from "./hooks";

import "./App.css";
import { useEffect } from "react";
import { UserProfileModule } from "./modules";
import { UserFollowersModule } from "./modules/UserFollowers/UserFollowers";

function AppComponent() {
    const appService = useService("AppService");
    const appStore = useStore("AppStore");

    const { handleLoginGithubCallback, handleRequestAccessTokenCallback } =
        useGithubAuth({
            onRequestAccessTokenSuccess:
                appStore.handleRequestAccessTokenSuccess,
            onRequestAccessTokenError: appStore.handleRequestAccessTokenError,
        });

    useEffect(() => {
        if (appStore.isAuthorized) {
            const setUserData = async () => {
                // TODO: make in service
                const userData = await appService.getUserData();

                appStore.setLogin(userData.login);
                appStore.setUserData(userData);
            };

            setUserData();
        }
    }, [appStore.isAuthorized]);

    return (
        <>
            <div className="flex flex-col w-full">
                {appStore.isAuthorized && <UserProfileModule />}
                {appStore.isAuthorized && <UserFollowersModule />}
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
