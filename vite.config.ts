import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";

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
        chunkSizeWarningLimit: 1600,
    },
    plugins: [
        react(),
        AutoImport({
            imports: ["vitest"],
            dts: true, // generate TypeScript declaration
        }),
    ],
    resolve: {
        alias: {
            src: "/src",
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./octokit.ts", "./localStorage.ts", "./console.ts"],
        mockReset: false,
        coverage: {
            // you can include other reporters, but 'json-summary' is required, json is recommended
            reporter: ["text", "json-summary", "json"],
        },
    },
});
