import react from "@vitejs/plugin-react";
import { ConfigEnv, defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }: ConfigEnv) => {
  console.log(`configuring vite with command: ${command}, mode: ${mode}`);
  const cwd = process.cwd();
  const env = { ...loadEnv(mode, cwd, "VITE_") };

  const serverConfig = {
    host: true,
    port: Number(env.VITE_APP_PORT),
    strictPort: true,
  };

  return {
    plugins: [react()],
    preview: serverConfig,
    server: serverConfig,
  };
});
