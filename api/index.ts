/**
 * 接口统一返回结果
 */
export interface ApiResult<T> {
  // 状态码
  code: number;
  // 状态信息
  message?: string;
  // 返回数据
  data?: T;
}

/**
 * 分页查询统一结果
 */
export interface PageResult<T> {
  // 返回数据
  list: T[];
  // 总数量
  count: number;
}

/**
 * 分页查询基本参数
 */
export interface PageParam {
  // 第几页
  page?: number;
  // 每页多少条
  limit?: number;
  // 排序字段
  sort?: string;
  // 排序方式, asc升序, desc降序
  order?: string;
}
