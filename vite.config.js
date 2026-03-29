import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/cards-popular-words-v1/",
    server: {
        host: '127.0.0.1'
    },
    optimizeDeps: {
        esbuildOptions: {
        loader: {
            '.js': 'jsx',
        },
    },
  },
})