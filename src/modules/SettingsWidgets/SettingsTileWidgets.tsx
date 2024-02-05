import { useCallback } from "react";
import { useFeatureFlags, useStore } from "src/hooks";
import { useTranslation } from "react-i18next";
import { SettingsTile } from "./components";
import { WidgetsId } from "src/enums";
import { GlobalDeveloper } from "src/components";
import { observer } from "mobx-react";

function SettingsWidgetComponent() {
    const settingsStore = useStore("SettingsStore");
    const { t } = useTranslation();
    const { updateFeatureFlag, flags } = useFeatureFlags();

    const handleWidgetChangeEnabledCallback = useCallback(
        ({ id, value }: { id: string; value: boolean }) => {
            settingsStore.updateWidgetById({
                id: id,
                enabled: value,
            });

            settingsStore.saveSettings();
        },
        [settingsStore],
    );

    const handleToggleWidgetTitleTooltipCallback = useCallback(() => {
        const current = flags["enableWidgetTitleTooltip"];

        updateFeatureFlag("enableWidgetTitleTooltip", !current);
    }, [flags, updateFeatureFlag]);

    const handleAutoUpdateEnabled = useCallback(() => {
        const prevAutoUpdateEnabled = settingsStore.isAutoUpdateEnabled;

        settingsStore.updateAutoUpdateEnabled(!prevAutoUpdateEnabled);
    }, [settingsStore]);

    return (
        <div className="py-2 px-4 space-y-3">
            <div className="grid gap-1 grid-cols-5">
                {settingsStore.widgets.map(({ id, enabled }) => {
                    const widgetId = id as WidgetsId;
                    const i18nKey = `settingsWidgets.${widgetId}` as const;

                    return (
                        <SettingsTile
                            key={id}
                            id={id}
                            enabled={enabled}
                            title={t(i18nKey)}
                            onClick={() =>
                                handleWidgetChangeEnabledCallback({
                                    id,
                                    value: !enabled,
                                })
                            }
                        />
                    );
                })}
                <GlobalDeveloper>
                    <SettingsTile
                        id="topLanguagesTooltip"
                        enabled={flags["enableWidgetTitleTooltip"]}
                        title={t("settingsWidgets.widgetTitleTooltipText")}
                        onClick={handleToggleWidgetTitleTooltipCallback}
                    />
                </GlobalDeveloper>
                <GlobalDeveloper>
                    <SettingsTile
                        id="autoUpdateEnabled"
                        enabled={settingsStore.isAutoUpdateEnabled}
                        title={t("settingsWidgets.autoUpdate")}
                        onClick={handleAutoUpdateEnabled}
                        info={t("settingsWidgets.autoUpdateInfo")}
                    />
                </GlobalDeveloper>
            </div>
        </div>
    );
}

export const SettingsWidget = observer(SettingsWidgetComponent);
