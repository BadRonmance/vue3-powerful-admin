import path from "path";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
/**
* @type { import('vite').UserConfig }
*/
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
      "@": `${path.resolve(__dirname, "src")}`,
      "/icon": 'src/assets/icon',
    },
  },
  build: {
    // 调整包告警的大小
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) { // 分包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "~/styles/common/var.scss" as *;`,
  //     },
  //   },
  // },
  server: {
    port: 8888,
    open: true,
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/mock",
      supportTs: false
    }),
  ],
});