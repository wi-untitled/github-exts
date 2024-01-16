import { observer } from "mobx-react";
import { LoginModule } from "src/modules";
import { InstructionScreen } from "../Instruction";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="flex flex-col w-full p-4">
            <LoginModule />
            {/* TODO: update i18n */}
            <Link to={InstructionScreen.routeName}>Instruction</Link>
        </div>
    );
}

Login.routeName = "/login";

export const LoginScreen = observer(Login);
