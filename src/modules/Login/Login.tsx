import { observer } from "mobx-react";
import { Button, Input } from "src/modules/Login/components";
import { useLogin, useStore } from "src/hooks";
import { useTranslation } from "react-i18next";

export function Login() {
    const appStore = useStore("AppStore");
    const { t } = useTranslation();
    const {
        accessToken,
        isActionDisabled,
        handleButtonClick,
        handleInputChange,
    } = useLogin({
        onButtonClickSuccess: appStore.setAccessToken,
    });

    return (
        <div className="flex flex-col space-y-2">
            <Input
                onChange={handleInputChange}
                defaultValue={accessToken}
                value={accessToken}
                placeholder={t("login.placeholder")}
            />
            <Button isDisabled={isActionDisabled} onClick={handleButtonClick} />
        </div>
    );
}

export const LoginModule = observer(Login);
