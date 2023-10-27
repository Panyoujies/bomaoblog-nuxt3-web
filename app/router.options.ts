import type {RouterConfig} from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition // 返回上一次滚动位置
        } else {
            return { top: 0 } // 返回滚动到页面顶部
        }
    }
}