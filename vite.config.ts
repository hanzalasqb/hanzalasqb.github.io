import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: { output: { manualChunks: { three: ["three", "@react-three/fiber", "@react-three/drei"], motion: ["motion"] } } },
    chunkSizeWarningLimit: 1200,
  },
});
