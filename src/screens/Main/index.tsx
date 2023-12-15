import { observer } from "mobx-react";
import { WidgetsId } from "src/enums";
import { useStore } from "src/hooks";
import {
    UserProfileModule,
    UserFollowersModule,
    UserFollowingsModule,
    NotificationsModule,
    NotificationsRequstedChangesModule,
    TopLanguagesModule,
    NotificationsApprovedTop10Module,
} from "src/modules";

export function Main() {
    const appStore = useStore("AppStore");
    const settingsStore = useStore("SettingsStore");

    return (
        <>
            {appStore.isAuthorized && <UserProfileModule />}
            <div className="flex flex-col w-full p-4">
                {settingsStore.visibleWidgets[WidgetsId.UserFollowers] && (
                    <UserFollowersModule />
                )}
                {settingsStore.visibleWidgets[WidgetsId.UserFollowings] && (
                    <UserFollowingsModule />
                )}
                {settingsStore.visibleWidgets[WidgetsId.Notifications] && (
                    <NotificationsModule />
                )}
                {settingsStore.visibleWidgets[
                    WidgetsId.NotificationsRequestedChanges
                ] && <NotificationsRequstedChangesModule />}
                {settingsStore.visibleWidgets[
                    WidgetsId.NotificationsApprovedTop10
                ] && <NotificationsApprovedTop10Module />}
                {settingsStore.visibleWidgets[WidgetsId.TopLanguages] && (
                    <TopLanguagesModule />
                )}
            </div>
        </>
    );
}

Main.routeName = "/";

export const MainScreen = observer(Main);
