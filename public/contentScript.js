function init() {
    const iframe = document.createElement("iframe");

    // Styles
    iframe.style.display = "block";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.width = "320px";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    iframe.classList.add("github-exts-frame", "github-exts-frame--hidden");
    iframe.src = chrome.runtime.getURL("contentScript.html");

    /**
     * Defining button to open and close extentions
     */
    const button = document.createElement("button");

    button.classList.add("github-exts-toggler");
    button.textContent = "Toggle GitHub Exts";

    function handleToggle() {
        iframe.classList.toggle("github-exts-frame--hidden");
        
        document.body.addEventListener("click", handleClickOutside);
    }

    function handleClickOutside(event) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
        const isClickInside = event.composedPath().includes(button);

        if (!isClickInside) {
            iframe.classList.toggle("github-exts-frame--hidden");

            document.body.removeEventListener("click", handleClickOutside);
        }
    }

    button.addEventListener("click", handleToggle);

    /** 
     * Appending elements into body
     */
    document.body.appendChild(iframe);
    document.body.appendChild(button);
}

init();
