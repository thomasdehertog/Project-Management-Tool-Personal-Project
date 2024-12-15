import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as path from "path";  // Changed import syntax
import tsconfigPaths from "vite-tsconfig-paths"; 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // Simplified alias configuration
    },
  }
});