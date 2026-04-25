const { defineConfig } = require("vite");

module.exports = defineConfig({
  root: "public",
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
