import { useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { SettingsWidgetModule } from "src/modules";
import { Icon } from "src/components";

export function Settings() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div>
            <div className="p-2" onClick={handleNavigateBackCallback}>
                <Icon
                    icon="back"
                    className="w-6 h-6 text-gray-400 dark:text-gray-500"
                />
            </div>
            <SettingsWidgetModule />
        </div>
    );
}

Settings.routeName = "/settings";

export const SettingsScreen = observer(Settings);
