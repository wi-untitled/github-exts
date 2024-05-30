import { defineConfig, devices } from "@playwright/experimental-ct-react";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import svgr from "vite-plugin-svgr";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
import { loadConfigFromFile } from "vite";
const __dirname = path.dirname(__filename);
console.log(__dirname);
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: ".",
    testMatch: /(.+\.)?(browser)\.[jt]sx/,
    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    // snapshotDir: "./__snapshots__",
    /* Maximum time one test can run for. */
    snapshotPathTemplate: "{snapshotDir}/{testFileDir}/screenshots/{arg}{ext}",
    outputDir: "playwright-output/",
    timeout: 10 * 1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",

        /* Port to use for Playwright component endpoint. */
        ctPort: 3100,
        ctViteConfig: async () => {
            console.log(4242424242424);

            return Promise.resolve({
                resolve: {
                    alias: {
                        src: path.resolve(__dirname, "./src"),
                        // src: "./src",
                        // "src/utils": path.resolve(__dirname, "./src/utils"),
                        // "src/components": "/src/components",
                    },
                },
                test: {
                    alias: {
                        "src/utils": path.resolve(__dirname, "./src/utils"),
                    },
                    globals: true,
                    environment: "jsdom",
                    setupFiles: [
                        "./globalSetup.ts",
                        "./octokit.ts",
                        "./localStorage.ts",
                    ],
                    mockReset: false,
                },
            });
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
