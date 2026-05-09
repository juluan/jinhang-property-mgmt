import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspector from 'unplugin-vue-dev-locator/vite'
import traeBadgePlugin from 'vite-plugin-trae-solo-badge'

export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Inspector(),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#app',
    }),
  ],
  optimizeDeps: {
    include: [
      'element-plus',
      '@element-plus/icons-vue',
      'element-plus/es/components/avatar/style/css',
      'element-plus/es/components/badge/style/css',
      'element-plus/es/components/breadcrumb/style/css',
      'element-plus/es/components/breadcrumb-item/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/card/style/css',
      'element-plus/es/components/carousel/style/css',
      'element-plus/es/components/carousel-item/style/css',
      'element-plus/es/components/checkbox/style/css',
      'element-plus/es/components/checkbox-group/style/css',
      'element-plus/es/components/col/style/css',
      'element-plus/es/components/collapse/style/css',
      'element-plus/es/components/collapse-item/style/css',
      'element-plus/es/components/date-picker/style/css',
      'element-plus/es/components/descriptions/style/css',
      'element-plus/es/components/descriptions-item/style/css',
      'element-plus/es/components/dialog/style/css',
      'element-plus/es/components/dropdown/style/css',
      'element-plus/es/components/dropdown-menu/style/css',
      'element-plus/es/components/dropdown-item/style/css',
      'element-plus/es/components/empty/style/css',
      'element-plus/es/components/form/style/css',
      'element-plus/es/components/form-item/style/css',
      'element-plus/es/components/icon/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/input-number/style/css',
      'element-plus/es/components/link/style/css',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/option/style/css',
      'element-plus/es/components/pagination/style/css',
      'element-plus/es/components/progress/style/css',
      'element-plus/es/components/radio/style/css',
      'element-plus/es/components/radio-group/style/css',
      'element-plus/es/components/row/style/css',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/select/style/css',
      'element-plus/es/components/switch/style/css',
      'element-plus/es/components/table/style/css',
      'element-plus/es/components/table-column/style/css',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/tab-pane/style/css',
      'element-plus/es/components/tag/style/css',
      'element-plus/es/components/upload/style/css',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})