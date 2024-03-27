import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
  },
  server: {
    proxy: {
      "/api":
        "http://peak-mail-env.eba-rxdvyipv.ap-northeast-2.elasticbeanstalk.com/",
    },
  },
});
