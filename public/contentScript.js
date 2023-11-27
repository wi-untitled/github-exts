function init() {
    const iframe = document.createElement("iframe");
<<<<<<< HEAD

    // Styles
    iframe.style.display = "block";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.left = "0px";
    iframe.style.width = "320px";
    iframe.style.height = "100%";
    iframe.style.border = "none";

=======
    iframe.classList.add("github-exts-frame", "github-exts-frame--hidden");
>>>>>>> e706dc9 (feat: toggle extension iframe)
    iframe.src = chrome.runtime.getURL("contentScript.html");

    const button = document.createElement("button");
    button.classList.add("github-exts-toggler");
    button.textContent = "Toggle GitHub Exts";

    function handleToggle() {
        iframe.classList.toggle("github-exts-frame--hidden");
    }
    button.addEventListener("click", handleToggle);

    document.body.appendChild(iframe);
    document.body.appendChild(button);
}

init();
