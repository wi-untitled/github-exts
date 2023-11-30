import { useState, useMemo, useCallback } from "react";
import { useService } from "./useService";
import { isEmpty } from "lodash";

export function useLogin({
    onButtonClickSuccess,
}: {
    onButtonClickSuccess: (value: string) => void;
}) {
    const [accessToken, setAccessToken] = useState<string>("");
    const loginService = useService("LoginService");

    const isActionDisabled = useMemo(() => {
        return isEmpty(accessToken);
    }, [accessToken]);

    const handleInputChangeCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setAccessToken(event.target.value);
        },
        [],
    );

    const handleButtonClickCallback = useCallback(async () => {
        try {
            /**
             * There is important to recieve any 200 status http code
             * to make sure that the access token is valid.
             */
            await loginService.getUserData(accessToken);

            onButtonClickSuccess(accessToken);
        } catch (error) {
            console.error(error);
        }
    }, [onButtonClickSuccess, accessToken]);

    return {
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        isActionDisabled: isActionDisabled,
        handleInputChange: handleInputChangeCallback,
        handleButtonClick: handleButtonClickCallback,
    };
}
