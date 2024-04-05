import { defineConfig } from "cypress";
import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

export default defineConfig({
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
        // viteConfig: customViteConfig,
        // trashAssetsBeforeHeadlessRuns: false,
        setupNodeEvents: (on, config) => {
            addMatchImageSnapshotPlugin(on, config);
        },
    },

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
