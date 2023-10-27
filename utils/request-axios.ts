/**
 * axios 实例
 */
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { unref } from 'vue';
import { ElMessageBox } from 'element-plus/es';
import { API_BASE_URL } from '@/config/setting';
import type { ApiResult } from '@/api';

const service = axios.create({
  baseURL: API_BASE_URL
});

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 添加 token 到 header
    const token = useCookie('token');
      if (token.value && config.headers) {
          config.headers.Authorization = token.value;
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  (res: AxiosResponse<ApiResult<unknown>>) => {
    // 登录过期处理
    if (res.data?.code === 401) {
        /*const { path, fullPath } = unref(router.currentRoute);
        if (path == LAYOUT_PATH) {
            logout(true, void 0, router.push);
        } else if (path !== '/login') {
            ElMessageBox.close();
            ElMessageBox.alert('登录状态已过期, 请退出重新登录!', '系统提示', {
                confirmButtonText: '重新登录',
                callback: (action: string) => {
                    if (action === 'confirm') {
                        logout(false, fullPath);
                    }
                },
                draggable: true
            });
        }*/
      return Promise.reject(new Error(res.data.message));
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
