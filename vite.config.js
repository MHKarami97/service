import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['fonts/**/*', 'icons/**/*'],
      manifest: {
        name: 'مدیریت سرویس',
        short_name: 'سرویس‌یار',
        description: 'مدیریت تاریخچه و یادآوری سرویس دوره‌ای وسایل خانه و خودرو',
        theme_color: '#d946ef',
        background_color: '#FAFAFA',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        dir: 'rtl',
        lang: 'fa',
        icons: [
          { src: '/icons/icon-72.png', sizes: '72x72', type: 'image/png' },
          { src: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
          { src: '/icons/icon-144.png', sizes: '144x144', type: 'image/png' },
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,png,svg,ico}']
      }
    })
  ]
})
