export interface IFeatureFlagManagerContextProps {
    updateFeatureFlag: (featureFlagName: string, value: boolean) => void;
    flags: Record<string, any>;
}

export interface IFeatureFlagManagerProviderProps {
    children: JSX.Element;
    initialFeatureFlags: Record<string, any>;
}
