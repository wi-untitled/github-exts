import { useCallback } from "react";
import { STORAGE_KEYS, HOST } from "src/constants";

export interface IUseGithubAuth {
    onRequestAccessTokenSuccess: () => void;
    onRequestAccessTokenError: () => void;
}

export function useGithubAuth({
    onRequestAccessTokenSuccess,
    onRequestAccessTokenError,
}: IUseGithubAuth) {
    const handleLoginGithubCallback = useCallback(() => {
        chrome.runtime.sendMessage({ action: "redirect", data: {} });
        // window.parent.postMessage({ action: 'redirect' }, '*');
    }, []);

    const handleLogoutGithubCallback = useCallback(() => {
        chrome.runtime.sendMessage({ action: "logout", data: {} });
        // window.parent.postMessage({ action: 'redirect' }, '*');
    }, []);

    const handleRequestAccessTokenCallback = useCallback(async () => {
        const result = await chrome.storage.local.get(STORAGE_KEYS.CODE);

        if (!result) {
            return;
        }

        try {
            const response = await fetch(
                `${HOST}/getAccessToken?test=42&code=${
                    result[STORAGE_KEYS.CODE]
                }`,
                {
                    method: "GET",
                },
            );

            const json = await response.json();

            /**
             * Example of response after getAccessToken is called.
             *
             * {
             *   access_token: "ghu_MijyMIXtjYcmFzd4YjnWl639a05O6n4NkSHr"
             *   expires_in: 28800
             *   refresh_token: "ghr_r69yW5bdcDv6fvQ8Yn4a7vjZWmAE7NxVrviBTcP5IGfHDARz8YIVKwCgzJ2UBSF2CeG9jm15NsxQ"
             *   refresh_token_expires_in: 15724800
             *   scope: ""
             *   token_type: "bearer"
             * }
             */
            const { access_token, token_type } = json;

            // This need to be stored if there is need to access on [background.js] script
            await chrome.storage.local.set({
                [STORAGE_KEYS.ACCESS_TOKEN]: access_token,
            });
            await chrome.storage.local.set({
                [STORAGE_KEYS.TOKEN_TYPE]: token_type,
            });

            // (Important)Stores into local storage of extentions only.
            localStorage.setItem(STORAGE_KEYS.CODE, result[STORAGE_KEYS.CODE]);
            localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
            localStorage.setItem(STORAGE_KEYS.TOKEN_TYPE, token_type);

            onRequestAccessTokenSuccess();
        } catch (error) {
            console.trace(error);
            onRequestAccessTokenError();
        }
    }, [onRequestAccessTokenError, onRequestAccessTokenSuccess]);

    return {
        handleLoginGithubCallback,
        handleRequestAccessTokenCallback,
        handleLogoutGithubCallback,
    };
}
