import { useState, useMemo, useCallback } from "react";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { MainScreen } from "src/screens";
import { useService } from "src/hooks/useService";

export function useLogin({
    onButtonClickSuccess,
}: {
    onButtonClickSuccess: (value: string) => void;
}) {
    const [accessToken, setAccessToken] = useState<string>("");
    const loginService = useService("LoginService");
    const navigate = useNavigate();
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
            const data = await loginService.getUserData(accessToken);

            if (data) {
                onButtonClickSuccess(accessToken);
                navigate(MainScreen.routeName);
            }
        } catch (error) {
            console.error(error);
        }
    }, [onButtonClickSuccess, accessToken, navigate, loginService]);

    return {
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        isActionDisabled: isActionDisabled,
        handleInputChange: handleInputChangeCallback,
        handleButtonClick: handleButtonClickCallback,
    };
}
