import {PageParam} from "@/api";

export interface FriendLinks {
  // 自增id
  id?: number;

  // 网站名称
  name?: string;

  // 网站链接
  url?: string;

  // 网站说明简介
  description?: string;

  // 图标链接
  iconUrl?: string;

  // 站长QQ
  qq?: string;

  // 审核状态
  status?: number;

  // 租户id
  tenantId?: number;

  // 添加时间
  createTime?: string;

  // 修改时间
  updateTime?: string;
}

/**
 * 文章搜索条件
 */
export interface FriendLinksParam extends PageParam {
  // 自增id
  id?: number;

  // 网站名称
  name?: string;

  // 网站链接
  url?: string;

  // 网站说明简介
  description?: string;

  // 图标链接
  iconUrl?: string;

  // 站长QQ
  qq?: string;
}
