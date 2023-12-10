import React from "react";
import { FeatureFlagContext } from "src/core";

export const useFeatureFlags = () => React.useContext(FeatureFlagContext);
