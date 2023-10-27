// 接口地址
export const API_BASE_URL: string = import.meta.env.VITE_API_URL;

// 项目名称
export const PROJECT_NAME: string = import.meta.env.VITE_APP_NAME;

// 不需鉴权的路由
export const WHITE_LIST: string[] = [
    '/user',
    '/user/purchased',
    '/user/follow',
    '/user/wallet'
];