import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 黄金现货行情等 ak.zhaoyeqing.cn 接口，开发时走代理解决跨域
      '/api/sge': {
        target: 'https://ak.zhaoyeqing.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sge/, ''),
      },
    },
  },
})
