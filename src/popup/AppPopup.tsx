import { useCallback } from "react";
import "./AppPopup.css";

function App() {
    const handleClickCallback = useCallback(() => {
        window.open(
            "https://github.com/login/oauth/authorize?client_id=Iv1.1247dc257ee98cdd",
            "_blank",
        );
    }, []);
    return (
        <>
            <div>
                <button onClick={handleClickCallback} id="loginBtn">
                    Click
                </button>
            </div>
        </>
    );
}

export default App;
