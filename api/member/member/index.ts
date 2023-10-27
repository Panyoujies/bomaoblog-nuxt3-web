import request from "~/composables/request";
import type {EmailParam, LoginParam, LoginResult, Member} from "./model";
/**
 * 登录
 */
export async function login(data: LoginParam) {
  data.tenantId = 2; // 租户id
  const res = await request.post<LoginResult>('/member/member/login', data, {
    server: false
  });
  if (res.code === 0 && res.data) {
    const token = useCookie("token", {
      maxAge: 60 * 60 * 24 * 14
    })
    token.value = res.data?.access_token;
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getMemberInfo(): Promise<Member> {
  const res = await request.get<Member>('/member/member/auth/member', null, {server: false});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 发送邮件验证码
 */
export async function sendEmailCode(data: EmailParam) {
  const res = await request.post<LoginResult>('/member/member/sendEmailVerificationCode', data, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 更新用户资料
 */
export async function updateMemberInfo(data?: Member) {
  const res = await request.post<unknown>('/member/member/updateMemberInfo', data, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}