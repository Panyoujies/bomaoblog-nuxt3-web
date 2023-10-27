import request from "~/composables/request";
import type {Category, CategoryParam} from "./model";

/**
 * 查询类别列表
 */
export async function listCategorys(params?: CategoryParam) {
  const res = await request.get<Category[]>('/content/category',
    params, {server: true}
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询类别
 */
export async function getCategory(id?: number) {
  const res = await request.get<Category>('/content/category/' + id, null, {server: true});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据标识查询类别
 */
export async function getCategoryByAlias(alias?: string) {
  const res = await request.get<Category>('/content/category/getCategoryByAlias/' + alias, null, {server: true});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}