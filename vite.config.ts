import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_relativeSplatPath: true,
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    open: true,
  },
});
