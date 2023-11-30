import { useCallback } from "react";

export function useAccessToken() {
    const handleSetupAccessKeyCallback = useCallback(() => {}, []);

    return {
        handleSetupAccessKey: handleSetupAccessKeyCallback,
    };
}
