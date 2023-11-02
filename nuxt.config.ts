// https://nuxt.com/docs/api/configuration/nuxt-config
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@vant/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'dayjs-nuxt',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],
  vant: {
    /** Options */
    lazyload: {
      lazyComponent: true
    }
  },
  dayjs: {
    locales: ['zh-cn'],
    defaultLocale: 'zh-cn',
    plugins: [
      'relativeTime' // 需要的插件
    ]
  },
  // @ts-ignore
  app: {
    pageTransition: {name: 'fade-slide-y', mode: 'out-in'},
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
    }
  },
  css: ['~/assets/global.less', "element-plus/dist/index.css"],
  experimental: {
    inlineSSRStyles: false,
    asyncContext: true
  },
  build: {
    transpile:
        process.env.NODE_ENV === 'production'
            ? [
              'naive-ui',
              'vueuc',
              '@css-render/vue3-ssr',
              '@juggle/resize-observer'
            ]
            : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
          process.env.NODE_ENV === 'development'
              ? ['naive-ui', 'vueuc']
              : []
    },
    plugins: [
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ],
  }
})
