import { useCallback } from "react";
import { useFeatureFlags, useStore } from "src/hooks";
import { useTranslation } from "react-i18next";
import { SettingsTile } from "./components";
import { GlobalDeveloper } from "src/components";
import { observer } from "mobx-react";

function SettingsWidgetTileComponent() {
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

    const handleToggleSettingsTileCallback = useCallback(() => {
        const prev = settingsStore.isSettingsTileEnabled;

        settingsStore.updateSettingsTileEnabled(!prev);

        setTimeout(() => {
            updateFeatureFlag("enableSettingsTile", !prev);
        }, 3000);
    }, [updateFeatureFlag, settingsStore]);

    const handleAutoUpdateEnabled = useCallback(() => {
        const prevAutoUpdateEnabled = settingsStore.isAutoUpdateEnabled;

        settingsStore.updateAutoUpdateEnabled(!prevAutoUpdateEnabled);
    }, [settingsStore]);

    return (
        <div className="py-2 px-3 grid gap-3 grid-cols-5">
            {settingsStore.widgets.map(({ id, enabled }) => {
                return (
                    <SettingsTile
                        key={id}
                        id={id}
                        enabled={enabled}
                        onClick={() => {
                            console.log(id);
                            handleWidgetChangeEnabledCallback({
                                id,
                                value: !enabled,
                            });
                        }}
                    />
                );
            })}
            <GlobalDeveloper>
                <SettingsTile
                    id="topLanguagesTooltip"
                    enabled={flags["enableWidgetTitleTooltip"]}
                    onClick={handleToggleWidgetTitleTooltipCallback}
                />
            </GlobalDeveloper>
            <GlobalDeveloper>
                <SettingsTile
                    id="tileSettingsEnabled"
                    enabled={settingsStore.isSettingsTileEnabled}
                    onClick={handleToggleSettingsTileCallback}
                />
            </GlobalDeveloper>
            <GlobalDeveloper>
                <SettingsTile
                    id="autoUpdateEnabled"
                    enabled={settingsStore.isAutoUpdateEnabled}
                    onClick={handleAutoUpdateEnabled}
                    info={t("settingsWidgets.autoUpdateInfo")}
                />
            </GlobalDeveloper>
        </div>
    );
}

export const SettingsWidgetTileModule = observer(SettingsWidgetTileComponent);
