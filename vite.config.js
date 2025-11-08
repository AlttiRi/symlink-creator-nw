import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue(),
    ],
    base: "./",
    esbuild: {
        target: "es2021",
    },
    build: {
        target: "es2020",
        sourcemap: true,
        minify: false,
        rollupOptions: {
            preserveEntrySignatures: "strict",
            output: {
                compact: false,
                minifyInternalExports: false,
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
                manualChunks: {
                    "vue":  ["vue"],
                    "util": ["@alttiri/util-js", "@alttiri/vue-file-input"],
                },
            }
        }
    }
});
