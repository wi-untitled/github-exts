import { useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { SettingsWidgetClassicModule } from "src/modules";
import { Icon } from "src/components";

export function Settings() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleSpaceKeyUpCallback = useCallback(
        (_: React.KeyboardEvent<HTMLDivElement>) => {
            return undefined;
        },
        [],
    );

    return (
        <div>
            <div
                className="p-2"
                onClick={handleNavigateBackCallback}
                role="back"
                onKeyUp={handleSpaceKeyUpCallback}
            >
                <Icon
                    icon="back"
                    className="w-6 h-6 cursor-pointer dark:text-dark text-accent"
                />
            </div>
            <SettingsWidgetClassicModule />
        </div>
    );
}

Settings.routeName = "/settings";

export const SettingsScreen = observer(Settings);
