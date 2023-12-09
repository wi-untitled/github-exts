import { observer } from "mobx-react";
import { useStore } from "src/hooks";
import {
    UserProfileModule,
    UserFollowersModule,
    UserFollowingsModule,
    NotificationsModule,
    NotificationsRequstedChangesModule,
    TopLanguagesModule,
} from "src/modules";

export function Main() {
    const appStore = useStore("AppStore");

    return (
        <>
            {appStore.isAuthorized && <UserProfileModule />}
            <div className="flex flex-col w-full p-4">
                <UserFollowersModule />
                <UserFollowingsModule />
                <NotificationsModule />
                <NotificationsRequstedChangesModule />
                <TopLanguagesModule />
            </div>
        </>
    );
}

Main.routeName = "/";

export const MainScreen = observer(Main);
