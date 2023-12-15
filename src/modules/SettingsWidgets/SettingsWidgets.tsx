import { useCallback } from "react";
import { observer } from "mobx-react";
import { useStore } from "src/hooks";
import { useTranslation } from "react-i18next";
import { SaveSettingsButton, SettingsSwitch } from "./components";
import { WidgetsId } from "src/enums";

export function SettingsWidget() {
    const settingsStore = useStore("SettingsStore");
    const { t } = useTranslation();

    const handleWidgetChangeEnabledCallback = useCallback(
        ({ id, value }: { id: string; value: boolean }) => {
            settingsStore.updateWidgetById({
                id: id,
                enabled: value,
            });
        },
        [settingsStore],
    );

    const handleSaveSettingsCallback = useCallback(() => {
        settingsStore.saveSettings();
    }, [settingsStore]);

    return (
        <div className="py-2 px-4 space-y-3">
            <p className="text-base">{t("settingsWidgets.title")}</p>
            <div className="space-y-2">
                {settingsStore.widgets.map(({ id, enabled }) => {
                    const widgetId = id as WidgetsId;
                    const i18nKey = `settingsWidgets.${widgetId}` as const;

                    return (
                        <SettingsSwitch
                            id={id}
                            enabled={enabled}
                            title={t(i18nKey)}
                            onChange={handleWidgetChangeEnabledCallback}
                        />
                    );
                })}
            </div>
            <div>
                <SaveSettingsButton
                    needSave={settingsStore.needSave}
                    onClick={handleSaveSettingsCallback}
                />
            </div>
        </div>
    );
}

export const SettingsWidgetModule = observer(SettingsWidget);
