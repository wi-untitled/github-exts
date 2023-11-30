import { observer } from "mobx-react";
import { useState, useMemo, useCallback } from "react";
import { Button, Input } from "./components";
import { DEFAULT_INPUT_PLACEHOLDER } from "./constants";
import { isEmpty } from "lodash";
import { useService, useStore } from "src/hooks";

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

export function Login() {
    const appStore = useStore("AppStore");

    const {
        accessToken,
        isActionDisabled,
        handleButtonClick,
        handleInputChange,
    } = useLogin({
        onButtonClickSuccess: appStore.setAccessToken,
    });

    return (
        <div className="flex flex-col space-y-2 border rounded-md p-2">
            <Input
                onChange={handleInputChange}
                defaultValue={accessToken}
                value={accessToken}
                placeholder={DEFAULT_INPUT_PLACEHOLDER}
            />
            <Button isDisabled={isActionDisabled} onClick={handleButtonClick} />
        </div>
    );
}

export const LoginModule = observer(Login);
