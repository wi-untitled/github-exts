import { useCallback, useEffect } from "react";
import { getTransport } from "src/transport";
import { useStore } from ".";

export function useEscape() {
    const appStore = useStore("AppStore");

    const handleEscapeCallback = useCallback((event: KeyboardEvent) => {
        if (event.key.toLowerCase() === "escape") {
            getTransport().sendMessageRuntime({
                action: "IFRAME_CLOSE_BY_ESCAPE",
                data: {
                    isOpen: false,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (appStore.isOpen) {
            document.addEventListener("keyup", handleEscapeCallback);
        } else {
            document.removeEventListener("keyup", handleEscapeCallback);
        }
    }, [appStore.isOpen, handleEscapeCallback]);
}
