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
})
