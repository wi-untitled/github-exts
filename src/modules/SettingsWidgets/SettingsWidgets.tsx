import { useCallback } from "react";
import { observer } from "mobx-react";
import { useFeatureFlags, useStore } from "src/hooks";
import { useTranslation } from "react-i18next";
import {
    SaveSettingsButton,
    SettingsSwitch,
    SettingsTitle,
} from "./components";
import { WidgetsId } from "src/enums";

export function SettingsWidget() {
    const settingsStore = useStore("SettingsStore");
    const { t } = useTranslation();
    const { updateFeatureFlag, flags } = useFeatureFlags();

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
            <div className="space-y-1">
                <SettingsTitle title={t("settingsWidgets.widgetTitle")} />
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
            </div>
            <div className="space-y-2">
                <SettingsTitle
                    title={t("settingsWidgets.globalText")}
                    info={t("settingsWidgets.globalInfo")}
                />
                <SettingsSwitch
                    id="topLanguagesTooltip"
                    enabled={flags["enableWidgetTitleTooltip"]}
                    title={t("settingsWidgets.widgetTitleTooltipText")}
                    onChange={handleToggleWidgetTitleTooltipCallback}
                />
                <SettingsSwitch
                    id="autoUpdateEnabled"
                    enabled={settingsStore.isAutoUpdateEnabled}
                    title={t("settingsWidgets.autoUpdate")}
                    onChange={handleAutoUpdateEnabled}
                    info={t("settingsWidgets.autoUpdateInfo")}
                />
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
