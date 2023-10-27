import {UseFetchOptions} from "nuxt/app";
import {useAuthStore} from '~/stores/authStore';
import {ApiResult} from "~/api";
import {API_BASE_URL} from "@/config/setting";
import {useMemberStore} from "~/stores/member";

type Methods = "GET" | "POST" | "DELETE" | "PUT";

class HttpRequest {
    request<T = any>(url: string, method: Methods, data: any, options?: UseFetchOptions<T>,): Promise<ApiResult<T>> {
        return new Promise((resolve, reject) => {
            const token = useCookie("token").value ?? '';

            const headers = reactive<Record<string, any>>({
                'Authorization': token,
                ...options?.headers,
            })

            const newOptions: UseFetchOptions<T> = {
                baseURL: API_BASE_URL,
                headers: headers,
                method: method,
                ...options,
            };

            if (method === "GET" || method === "DELETE") {
                newOptions.params = data;
            }

            if (method === "POST" || method === "PUT") {
                newOptions.body = data;
            }

            useFetch(url, newOptions).then((res) => {
                const data = res.data.value as ApiResult<T>;

                // 登录过期处理
                if (data.code === 401) {
                    const cookie = useCookie("token");
                    cookie.value = undefined;

                    const userStore = useMemberStore();
                    userStore.logout();

                    // 登录过期
                    const authStore = useAuthStore();
                    authStore.openModal();
                }

                if (data.code === 403) {
                    navigateTo('/vip');
                }

                // 假设 res 已经是 ApiResult 类型或您可以进行适当的转换
                resolve(data); // 确保解析为 ApiResult<T> 类型
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    // 封装常用方法
    get<T = any> (url: string, params?: any, options?: UseFetchOptions<T>) {
        return this.request(url, "GET", params, options);
    }

    post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
        return this.request(url, "POST", data, options);
    }

    put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
        return this.request(url, "PUT", data, options);
    }

    delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
        return this.request(url, "DELETE", params, options);
    }
}

const request = new HttpRequest();

export default request;