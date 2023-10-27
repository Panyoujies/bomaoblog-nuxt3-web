/**
 * 登录用户 store
 */
import {defineStore} from 'pinia';
import {Member} from "@/api/member/member/model";
import {getMemberInfo} from "@/api/member/member";

export interface MemberState {
  info: Member | null;
}

export const useMemberStore = defineStore('member', {
  state: (): MemberState => ({
    // 当前登录用户的信息
    info: null
  }),
  getters: {
    memberInfo(state) {
      return state.info;
    },
  },
  actions: {
    /**
     * 请求用户信息、权限
     */
    async fetchMemberInfo() {
      const result = await getMemberInfo().catch(() => {});
      if (!result) {
        return {};
      }
      // 用户信息
      this.info = result;
    },
    /**
     * 更新用户信息
     */
    setInfo(value: Member) {
      this.info = value;
    },
    /**
     * 退出登录
     */
    logout() {
      this.info = null;
      const cookie = useCookie('token');
      cookie.value = undefined;
    },
  },
  persist: true
});
