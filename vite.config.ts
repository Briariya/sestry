import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Статичный сайт для GitHub Pages: относительные пути (base "./") и
// адреса страниц через # (см. App.tsx), поэтому сайт работает под любым
// адресом репозитория и прямые ссылки на сестру не дают 404.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: "127.0.0.1",
  },
});
