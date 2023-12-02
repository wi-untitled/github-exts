import { observer } from "mobx-react";
import { useStore } from "src/hooks";

import "./App.css";

import {
    UserProfileModule,
    UserFollowersModule,
    UserFollowingsModule,
    LoginModule,
    NotificationsModule,
} from "./modules";

function AppComponent() {
    const appStore = useStore("AppStore");
    console.log(appStore.isLoading);
    return (
        <>
            <div className="flex flex-col w-full">
                {appStore.isAuthorized && <UserProfileModule />}
                {appStore.isAuthorized && <UserFollowersModule />}
                {appStore.isAuthorized && <UserFollowingsModule />}
                {appStore.isAuthorized && <NotificationsModule />}
                {!appStore.isAuthorized && <LoginModule />}
            </div>
        </>
    );
}

const App = observer(AppComponent);

export default App;
