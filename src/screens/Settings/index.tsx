import { useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

import { SettingsWidgetModule } from "src/modules";

export function Settings() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div>
            Setting Page
            <button onClick={handleNavigateBackCallback}>Back</button>
            <SettingsWidgetModule />
        </div>
    );
}

Settings.routeName = "/settings";

export const SettingsScreen = observer(Settings);
