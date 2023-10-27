import {PageParam} from "@/api";

export interface Member {
  // 自增id
  id?: number;
  // 昵称
  nickName?: string;
  // 头像
  avatar?: string;
  // 性别
  sex?: number;
  // 邮箱
  email?: string;
  // 邮箱是否验证,0否,1是
  emailVerified?: number;
  // 状态,0正常,1冻结
  state?: number;
  // 余额
  balance?: number;
  // 冻结余额
  freezeBalance?: number;
  // 是否删除,0否,1是
  deleted?: number;
  // 个人简介
  introduction?: string;
  // 注册时间
  createTime?: string;
  // 修改时间
  updateTime?: string;
}

export interface Authority {
  name?: string;
  authority?: string;
}

/**
 * 登录参数
 */
export interface LoginParam {
  // 账号
  email?: string;
  code?: string;
  // 租户id
  tenantId?: number;
  // 是否记住密码
  remember?: boolean;
}

export interface AuthLoginParam {
  source?: string;
  code?: string;
  state?: string;
  // 是否记住密码
  remember?: boolean;
}

/**
 * 登录返回结果
 */
export interface LoginResult {
  // token
  access_token?: string;
  // 授权地址
  authorizeUrl?: string;
}

/**
 * 登录返回结果
 */
export interface EmailParam {
  sendType?: string;
  // token
  email?: string;
}