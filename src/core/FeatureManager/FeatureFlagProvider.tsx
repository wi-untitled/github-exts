import { useState, useCallback } from "react";
import { FeatureFlagContext } from "./FeatureFlagContext";
import { IFeatureFlagManagerProviderProps } from "./types";

export function FeatureFlagProvider({
    children,
    initialFeatureFlags,
}: IFeatureFlagManagerProviderProps) {
    const [flags, setFlags] = useState(initialFeatureFlags);

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
