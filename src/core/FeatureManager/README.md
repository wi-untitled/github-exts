## Example

```typescript

import { FeatureFlagsProvider, FeatureFlag, useFeatureFlags } from './FeatureFlagManager';

export function CihldComponent() {
    const { updateFeatureFlag } = useFeatureFlags();
    
    const hanlder = useCallback(() => {
        updateFeatureFlag("feature2", true);
    }, [updateFeatureFlag]);
    
    return (
        <>
            <FeatureFlag name="feature1">
                <div>feature 1</div>
            </FeatureFlag>
            <FeatureFlag name="feature2">
                <div>feature 2</div>
            </FeatureFlag>
            
            <button onClick={hanlder}>show feature 2</button>
        </>
    );
}

// need to wrap application into Provider

export initialFF = {
    feauture1: true,
    feauture2: false,
};

export const function ParentComponent() {
    
    return (
        <FeatureFlagsProvider initialFeatureFlags={}>
            <ChildComponent />
        </FeatureFlagsProvider>
    );
} 
```