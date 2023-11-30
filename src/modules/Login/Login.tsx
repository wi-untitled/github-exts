import { observer } from "mobx-react";
import { Button, Input } from "src/modules/Login/components";
import { DEFAULT_INPUT_PLACEHOLDER } from "src/modules/Login/constants";
import { useLogin, useStore } from "src/hooks";

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
