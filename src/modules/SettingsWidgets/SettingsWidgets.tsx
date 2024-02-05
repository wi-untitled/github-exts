import { SettingsWidget as ClassicWidget } from "./SettingsClassicWidgets";
import { SettingsWidget as TileWidget } from "./SettingsTileWidgets";
import { FeatureFlag } from "src/core";

export function SettingsWidgetModule() {
    return (
        <>
            <FeatureFlag name="enableSettingsTiles">
                <TileWidget />
            </FeatureFlag>
            <FeatureFlag name="enableSettingsClassic">
                <ClassicWidget />
            </FeatureFlag>
        </>
    );
}
