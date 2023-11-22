function init() {
    const iframe = document.createElement("iframe");

    // Styles
    iframe.style.display = "block";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    iframe.src = chrome.runtime.getURL("index.html");

    document.body.appendChild(iframe);
}

init();