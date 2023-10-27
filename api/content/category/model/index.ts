import {PageParam} from "@/api";

export interface Category {
  // 自增ID
  id?: number;

  // 类别标题
  name?: string;

  // 类别简介
  summary?: string;

  // 封面
  cover?: string;

  // 别名
  alias?: string;

  // 类别状态
  status?: number;

  // 排序
  sortNumber?: number;

  // 查看数量
  seeNumber?: number;

  // 文章数量
  articleNumber?: number;

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
export interface CategoryParam extends PageParam {
  // 自增ID
  id?: number;

  // 类别标题
  name?: string;

  // 别名
  alias?: string;

  // 类别状态
  status?: number;
}
