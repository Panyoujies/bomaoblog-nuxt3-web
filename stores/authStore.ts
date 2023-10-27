// stores/authStore.ts
import {defineStore} from 'pinia'

export interface AuthStore {
    showModal: boolean;
    redirectTo?: string;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthStore => ({
        showModal: false,
        redirectTo: '/',  // 默认为首页
    }),
    actions: {
        openModal(redirectTo?: string) {
            this.showModal = true;
            this.redirectTo = redirectTo;  // 保存要导航到的路由
        },
        closeModal() {
            this.showModal = false;
        },
    },
    persist: true
})