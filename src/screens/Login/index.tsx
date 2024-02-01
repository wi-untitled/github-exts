import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { LoginModule } from "src/modules";
import { InstructionScreen } from "src/screens/Instruction";
import { Link } from "react-router-dom";

function Login() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col w-full p-4 space-y-2">
            <LoginModule />
            <Link
                className="underline hover:no-underline text-blue-500"
                to={InstructionScreen.routeName}
            >
                {t("instruction.instruction")}
            </Link>
        </div>
    );
}

Login.routeName = "/login";

export const LoginScreen = observer(Login);
