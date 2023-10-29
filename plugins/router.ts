import {Router} from 'vue-router';

interface CustomRouter extends Router {
    running?: boolean;
    nextRoute?: string | null;
}

/**
 * 修复路由切换错误
 * 原因是加入动画导致的
 */
export default defineNuxtPlugin((nuxtApp) => {
    const customRouter: CustomRouter = <CustomRouter>useNuxtApp().$router;

    /**
     * 修复路由跳转回到顶部
     */
    customRouter.options.scrollBehavior = () => {
        return { left: 0, top: 0 }
    }

    nuxtApp.hook("page:start", () => {
        customRouter.running = false;
        customRouter.beforeEach((to, _from, next) => {
            if (customRouter.running) {
                next(true);
            } else {
                customRouter.nextRoute = to.fullPath;
                next(false);
            }
        });
    });
    nuxtApp.hook("page:transition:finish", () => {
        customRouter.running = true;
        if (customRouter.nextRoute) {
            customRouter.push(customRouter.nextRoute);
            customRouter.nextRoute = null;
        }
    });
});