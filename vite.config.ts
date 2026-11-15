// @lovable.dev/vite-tanstack-config already includes the core plugin stack — do NOT add them manually.
import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      alias: [
        { find: /^entities\/lib\/decode\.js$/, replacement: path.resolve(__dirname, "node_modules/entities/lib/decode.js") },
        { find: /^entities\/lib\/encode\.js$/, replacement: path.resolve(__dirname, "node_modules/entities/lib/encode.js") },
        { find: /^entities$/, replacement: path.resolve(__dirname, "node_modules/entities/lib/index.js") },
      ],
    },
  },
});
