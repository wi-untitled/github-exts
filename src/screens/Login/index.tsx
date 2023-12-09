import { observer } from "mobx-react";
import { LoginModule } from "src/modules";

function Login() {
    return (
        <div className="flex flex-col w-full p-4">
            <LoginModule />
        </div>
    );
}

Login.routeName = "/login";

export const LoginScreen = observer(Login);
