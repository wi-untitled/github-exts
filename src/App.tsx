import React from "react";
import { observer } from "mobx-react";
import { useStore } from "./hooks";

import "./App.css";

import {
    UserProfileModule,
    UserFollowersModule,
    UserFollowingsModule,
    LoginModule,
} from "./modules";

function AppComponent() {
    const appStore = useStore("AppStore");

    return (
        <>
            <div className="flex flex-col w-full">
                {appStore.isAuthorized && <UserProfileModule />}
                {appStore.isAuthorized && <UserFollowersModule />}
                {appStore.isAuthorized && <UserFollowingsModule />}
                {appStore.isAuthorized && (
                    <button onClick={appStore.handleLogout}>Logout</button>
                )}
                {!appStore.isAuthorized && <LoginModule />}
            </div>
        </>
    );
}

const App = observer(AppComponent);

export default App;
