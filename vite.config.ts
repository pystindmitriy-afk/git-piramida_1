import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/@react-three")) return "react-three";
          if (id.includes("node_modules/recharts")) return "charts";
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) return "react-core";
        }
      }
    }
  },
  server: {
    allowedHosts: true,
    host: true,
    port: 5173,
    strictPort: true
  }
});
