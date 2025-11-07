import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ entryRoot: "src", outDir: "dist", insertTypesEntry: true }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line
      // @ts-ignore
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      name: "react-locale-formatted-input",
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", /\.css$/],
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
});
