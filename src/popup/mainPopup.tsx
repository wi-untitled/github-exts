import React from "react";
import ReactDOM from "react-dom/client";
import AppPopup from "./AppPopup.tsx";


import "./indexPopup.css";

export function RenderApp() {

    return  <React.StrictMode>
                <AppPopup />
            </React.StrictMode>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<RenderApp />);
