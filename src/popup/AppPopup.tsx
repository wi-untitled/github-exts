import "./AppPopup.css";

import { useStore } from "src/hooks";
import { WidgetsId } from "src/enums";
import {
    NotificationsApprovedTop10Module,
    NotificationsModule,
    NotificationsRequstedChangesModule,
} from "src/modules";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Assets, PopupNoAuth } from "src/components";

function AppComponent() {
    const appStore = useStore("AppStore");
    const settingsStore = useStore("SettingsStore");

    useEffect(() => {
        appStore.updateIsOpen(true);
    }, [appStore]);

    useEffect(() => {
        chrome.runtime.connect();
    }, []);

    return (
        <>
            <Assets />
            {appStore.isAuthorized ? (
                <>
                    <div className="flex flex-col w-full p-4">
                        {settingsStore.visibleWidgets[
                            WidgetsId.Notifications
                        ] && <NotificationsModule />}
                        {settingsStore.visibleWidgets[
                            WidgetsId.NotificationsRequestedChanges
                        ] && <NotificationsRequstedChangesModule />}
                        {settingsStore.visibleWidgets[
                            WidgetsId.NotificationsApprovedTop10
                        ] && <NotificationsApprovedTop10Module />}
                    </div>
                </>
            ) : (
                <PopupNoAuth />
            )}
        </>
    );
}

const App = observer(AppComponent);

export default App;
