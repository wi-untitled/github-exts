function init() {
    const iframe = document.createElement("iframe");
    iframe.classList.add("github-exts-frame", "github-exts-frame--hidden");
    iframe.src = chrome.runtime.getURL("contentScript.html");

    /**
     * Defining button to open and close extentions
     */
    const button = document.createElement("button");

    button.classList.add("github-exts-toggler");
    button.textContent = "Toggle GitHub Exts";

    function handleToggle() {
        sendMessage(!iframe.classList.toggle("github-exts-frame--hidden"));
        document.body.addEventListener("click", handleClickOutside);
    }

    function handleClickOutside(event) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
        const isClickInside = event.composedPath().includes(button);

        if (!isClickInside) {
            iframe.classList.add("github-exts-frame--hidden");
            document.body.removeEventListener("click", handleClickOutside);
            sendMessage(false);
        }
    }

    button.addEventListener("click", handleToggle);

    /**
     *
     */
    function sendMessage(isOpen) {
        chrome.runtime.sendMessage({
            action: "IFRAME_TOGGLE",
            data: {
                isOpen: isOpen,
            },
        });
    }

    /**
     * Appending elements into body
     */
    document.body.appendChild(iframe);
    document.body.appendChild(button);
}

init();
