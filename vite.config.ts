<<<<<<< HEAD
import { defineConfig } from "vite";
=======
import { defineConfig, loadEnv } from "vite";
>>>>>>> df4bac4 (third commit)
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
<<<<<<< HEAD
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
=======
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const configuredPort = Number(env.PORT) || 5173;

  return {
    server: {
      host: "::",
      port: configuredPort,
    },
    preview: {
      host: "::",
      port: configuredPort,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
>>>>>>> df4bac4 (third commit)
