import { useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { SettingsWidgetClassicModule } from "src/modules";
import BackIcon from "src/assets/back.svg?react";

export function Settings() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div>
            <div className="p-2" onClick={handleNavigateBackCallback}>
                <BackIcon className="w-6 h-6 cursor-pointer fill-current dark:text-dark text-accent" />
            </div>
            <SettingsWidgetClassicModule />
        </div>
    );
}

Settings.routeName = "/settings";

export const SettingsScreen = observer(Settings);
