import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// TODO: makes dedicated enrties for popup and content script
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                contentScript: resolve(__dirname, "contentScript.html"),
                popup: resolve(__dirname, "popup.html"),
                main: "src/main.tsx",
                mainPopup: "src/popup/mainPopup.tsx",
            },
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            src: "/src",
        },
    },
});
