import {PageParam} from "@/api";

export interface Carousel {
  // 自增id
  id?: number;

  // 标题
  title?: string;

  // 简介
  summary?: string;

  // 状态
  status?: number;

  // 封面
  cover?: string;

  // 外置链接
  externalLink?: string;

  // 是否为外链
  isExternalLink?: number;

  // 租户id
  tenantId?: number;

  // 创建时间
  createTime?: string;

  // 修改时间
  updateTime?: string;
}

/**
 * 搜索条件
 */
export interface CarouselParam extends PageParam {
  id?: number;

  // 标题
  title?: string;

  // 简介
  summary?: string;

  // 状态
  status?: number;
}
