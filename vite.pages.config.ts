import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "pages-src",
  publicDir: "../public",
  base: process.env.PAGES_BASE || "/",
  plugins: [react()],
  build: {
    outDir: "../out",
    emptyOutDir: true,
  },
});
