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
        sendMessageIframeToggle(!iframe.classList.toggle("github-exts-frame--hidden"));
        document.body.addEventListener("click", handleClickOutside);
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
    window.addEventListener('message', event => {
        if (event.source && event.origin === `chrome-extension://${chrome.runtime.id}`) {
                const { data } = event;
                
                switch(data.action) {
                    case "BROADCAST": {
                        handleBroadcast();
                        return;
                    }
                    default: {
                        return;
                    }
                }
            }
        }   
    );

    function handleBroadcast() {
        console.log('handleBroadcast is called');
    }

    /**
     * Appending elements into body
     */
    document.body.appendChild(iframe);
    document.body.appendChild(button);
}

init();
