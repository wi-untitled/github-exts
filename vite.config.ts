import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    build: {
        rollupOptions: {
            input: {
                contentScript: resolve(__dirname, "contentScript.html"),
                popup: resolve(__dirname, "popup.html"),
                main: "src/main.tsx",
                mainPopup: "src/popup/mainPopup.tsx",
            },
            ...(process.env.NODE_ENV === "production"
                ? {
                      output: {
                          entryFileNames: `assets/[name].js`,
                          chunkFileNames: `assets/[name].js`,
                          assetFileNames: `assets/[name].[ext]`,
                      },
                  }
                : {}),
            // external: ["@sentry/integrations"],
        },
        chunkSizeWarningLimit: 1600,
        sourcemap: true,
    },
    plugins: [
        react(),
        AutoImport({
            imports: ["vitest"],
            dts: true, // generate TypeScript declaration
        }),
        sentryVitePlugin({
            org: "home-yxt",
            project: "github-helper",
            telemetry: process.env.NODE_ENV === "production",
        }),
        svgr(),
    ],
    resolve: {
        alias: {
            src: "/src",
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
         alias: {
                        "src/utils": "./src/utils",
                    },
        setupFiles: ["./octokit.ts", "./localStorage.ts", "./console.ts"],
        mockReset: false,
        coverage: {
            // you can include other reporters, but 'json-summary' is required, json is recommended
            reporter: ["text", "json-summary", "json"],
        },
        poolOptions: {
            threads: {
                maxWorkers: 2,
            },
        },
    },
});
