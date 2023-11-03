import request from "~/composables/request";
import type { ApiResult, PageResult } from "@/api";
import type { Tag, TagParam } from "./model";

/**
 * 分页查询类别
 */
export async function pageTags(params: TagParam) {
  const res = await request.get<ApiResult<PageResult<Tag>>>(
    '/content/tag/page',
    { params }, {server: true}
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询类别列表
 */
export async function listTags(params?: TagParam) {
  const res = await request.get<Tag[]>('/content/tag', { ...params }, {server: true});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询类别
 */
export async function getTag(id?: number) {
  const res = await request.get<Tag>('/content/tag/' + id, null, {server: true});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加类别
 */
export async function addTag(data: Tag) {
  const res = await request.post<ApiResult<unknown>>('/content/tag', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改类别
 */
export async function updateTag(data: Tag) {
  const res = await request.put<ApiResult<unknown>>('/content/tag', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除类别
 */
export async function removeTag(id?: number) {
  const res = await request.delete<ApiResult<unknown>>(
    '/content/tag/' + id, null
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除类别
 */
export async function removeTags(data: (number | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/content/tag/batch',
    {
      data
    }
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改状态
 */
export async function updateTagStatus(id?: number, status?: number) {
  const res = await request.put<ApiResult<unknown>>('/content/tag/status', {
    id,
    status
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
