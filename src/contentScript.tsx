import ReactDOM from "react-dom/client";
import {RenderApp} from "./main.tsx";


function init() {
    const iframe = document.createElement("iframe");
    console.log(4233);
    // Styles
    // iframe.style.display = "block";
    // iframe.style.position = "fixed";
    // iframe.style.top = "0px";
    // iframe.style.left = "0px";
    // iframe.style.height = "100%";
    // iframe.style.border = "none";

    // iframe.src = chrome.runtime.getURL("contentScript.html");

    // document.body.appendChild(iframe);

    // const app = document.createElement('div');
    // app.setAttribute('id', 'root');

    // const body = document.querySelector('body');

    // window.onload = async () => {
    //     const el = document.querySelector('body');
    //     if (el) {
    //       el.insertAdjacentHTML(
    //         'afterend',
    //         '<div id="crx-app"></div>',
    //       );
    //       ReactDOM.render(<App />, document.getElementById('crx-app'));
    //     }
    // }
    console.log(chrome.runtime.getURL("vite.svg"))
    window.onload = function () {
        const body = document.querySelector('body');

        if (body) {
            console.log(body);
            // TODO: make diff id avoiding conflicts as well
            body.insertAdjacentHTML(
                'afterend',
                '<div id="root"></div>',
              );


            ReactDOM.createRoot(document.getElementById("root")!).render(<RenderApp />);
        }
    }
}

init();