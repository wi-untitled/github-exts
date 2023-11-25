import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import crx from 'vite-plugin-crx-mv3'
import svgr from "vite-plugin-svgr";

// TODO: makes dedicated enrties for popup and content script
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: mode == 'production',
        rollupOptions: {
          input: {
            contentScript: resolve(__dirname, "contentScript.html"),
            popup: resolve(__dirname, "popup.html"),
            main: "src/main.tsx",
            mainPopup: "src/popup/mainPopup.tsx",
          },
        },
      },
    plugins: [svgr(), react(), crx({
      manifest: './src/manifest.json',
    }),],
}
});
