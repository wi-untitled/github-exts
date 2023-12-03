import { observer } from "mobx-react";
import { useStore } from "src/hooks";

import "./App.css";

import {
    UserProfileModule,
    UserFollowersModule,
    UserFollowingsModule,
    LoginModule,
    NotificationsModule,
    NotificationsRequstedChangesModule,
    TopLanguagesModule,
} from "./modules";

function AppComponent() {
    const appStore = useStore("AppStore");

    return (
        <>
            {appStore.isAuthorized && <UserProfileModule />}
            <div className="flex flex-col w-full p-4">
                {appStore.isAuthorized && <UserFollowersModule />}
                {appStore.isAuthorized && <UserFollowingsModule />}
                {appStore.isAuthorized && <NotificationsModule />}
                {appStore.isAuthorized && (
                    <NotificationsRequstedChangesModule />
                )}
                {appStore.isAuthorized && <TopLanguagesModule />}
                {!appStore.isAuthorized && <LoginModule />}
            </div>
        </>
    );
}

const App = observer(AppComponent);

export default App;
