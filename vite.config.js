import path from "path";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            ssr: "resources/js/ssr.js",
            refresh: true,
        }),
        svelte(),
        viteCompression({ algorithm: "gzip" }),
        viteCompression({ algorithm: "brotliCompress" }),
    ],
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "resources/assets"),
            "@public": path.resolve(__dirname, "public"),
        },
    },
});
