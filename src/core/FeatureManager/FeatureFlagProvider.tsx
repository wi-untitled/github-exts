import { useState, useCallback, useEffect } from "react";
import { FeatureFlagContext } from "./FeatureFlagContext";
import { IFeatureFlagManagerProviderProps } from "./types";
import { useStore } from "src/hooks";

export function FeatureFlagProvider({
    children,
    initialFeatureFlags,
}: IFeatureFlagManagerProviderProps) {
    const [flags, setFlags] = useState(initialFeatureFlags);

    /**
     *
     * Need to sync FF with value from Locale Storage
     * to enforce tile view
     *
     */
    const settingsStore = useStore("SettingsStore");

    useEffect(() => {
        setFlags({
            ...flags,
            enableSettingsTile: settingsStore.isSettingsTileEnabled,
        });
    }, []);

    const handleUpdateFeatureFlag = useCallback(
        (featureFlagName: string, value: boolean) => {
            if (flags[featureFlagName] !== undefined) {
                setFlags({
                    ...flags,
                    [featureFlagName]: value,
                });
            }
        },
        [flags],
    );

    return (
        <FeatureFlagContext.Provider
            value={{ flags: flags, updateFeatureFlag: handleUpdateFeatureFlag }}
        >
            {children}
        </FeatureFlagContext.Provider>
    );
}
