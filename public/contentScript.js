function init() {
    let hasDiff = false;

    const iframe = document.createElement("iframe");
    iframe.classList.add("github-exts-frame", "github-exts-frame--hidden");
    iframe.src = chrome.runtime.getURL("contentScript.html");

    /**
     * Defining button to open and close extentions
     * and container with notifyer
     */
    const div = document.createElement("div");
    const notifyier = document.createElement("div");
    notifyier.setAttribute("id", "notifyier");
    const button = document.createElement("button");

    div.classList.add("github-exts-button-container");
    notifyier.classList.add("github-exts-notifyer-container");
    button.classList.add("github-exts-toggler");
    button.textContent = "Toggle GitHub Exts";

    function handleToggle() {
        sendMessageIframeToggle(
            !iframe.classList.toggle("github-exts-frame--hidden"),
        );

        document.body.addEventListener("click", handleClickOutside);

        if (document.querySelector("#notifyier")) {
            div.removeChild(notifyier);
        }
    }

    function handleClickOutside(event) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
        const isClickInside = event.composedPath().includes(button);

        if (!isClickInside) {
            iframe.classList.add("github-exts-frame--hidden");
            document.body.removeEventListener("click", handleClickOutside);

            sendMessageIframeToggle(false);
        }
    }

    button.addEventListener("click", handleToggle);

    /**
     * Send event about iframe status visible
     */
    function sendMessageIframeToggle(isOpen) {
        chrome.runtime.sendMessage({
            action: "IFRAME_TOGGLE",
            data: {
                isOpen: isOpen,
            },
        });
    }

    /**
     * Register message from application
     */
    window.addEventListener("message", (event) => {
        if (
            event.source &&
            event.origin === `chrome-extension://${chrome.runtime.id}`
        ) {
            const { data } = event;

            switch (data.action) {
                case "BROADCAST": {
                    handleBroadcast();
                    return;
                }
                case "NOTIFY_BROADCAST": {
                    hasDiff = hasDiff || data.data.hasDiff;

                    if (hasDiff) {
                        /**
                         * TODO: There is setTimeout to make fake delay.
                         * In future it can be removed.
                         */
                        setTimeout(() => {
                            div.appendChild(notifyier);
                        }, 3000);
                    }

                    return;
                }
                case "IFRAME_CLOSE_BY_ESCAPE": {
                    handleToggle();

                    return;
                }
                default: {
                    return;
                }
            }
        }
    });

    function handleBroadcast() {
        // code here
    }

    /**
     * Appending elements into body
     */
    div.appendChild(button);

    document.body.appendChild(iframe);
    document.body.appendChild(div);
}

init();
