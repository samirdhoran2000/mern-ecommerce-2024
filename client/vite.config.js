import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: true,
  },
  optimizeDeps: {
    include: ["lucide-react"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Set a target that ensures modern features like optional chaining are transpiled
    target: "es2015",
  },
});
