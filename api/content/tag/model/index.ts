import { PageParam } from "@/api";

export interface Tag {
  // 自增id")
  tagId?: number;

  tagName?: string;

  // 租户id")
  tenantId?: number;

  // 添加时间")
  createTime?: string;

  // 修改时间")
  updateTime?: string;
}

/**
 * 文章搜索条件
 */
export interface TagParam extends PageParam {
  // 自增ID
  tagId?: number;

  tagName?: string;
}
