import request from "~/composables/request";
import type { ApiResult, PageResult } from "@/api";
import type {Comment, CommentDto, CommentParam} from "./model";
import requestAxios from '@/utils/request-axios';

/**
 * 分页查询类别
 */
export async function pageComments(params: CommentParam) {
  const res = await requestAxios.get<ApiResult<PageResult<CommentDto>>>(
      '/content/comment/page',
      { params }
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询类别列表
 */
export async function listComments(params?: CommentParam) {
  const res = await request.get<Comment[]>('/content/comment', params, {server: false});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询类别
 */
export async function getComment(id?: number) {
  const res = await request.get<Comment>('/content/comment/' + id, null, {server: false});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加类别
 */
export async function addComment(data: Comment) {
  const res = await requestAxios.post<ApiResult<unknown>>('/content/comment', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改类别
 */
export async function updateComment(data: Comment) {
  const res = await request.put<unknown>('/content/comment', data, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除类别
 */
export async function removeComment(id?: number) {
  const res = await request.delete<unknown>(
      '/content/comment/' + id, null, {server: false}
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除类别
 */
export async function removeComments(data: (number | undefined)[]) {
  const res = await request.delete<unknown>(
      '/content/comment/batch',
      data, {server: false}
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改状态
 */
export async function updateCommentStatus(id?: number, status?: number) {
  const res = await request.put<unknown>('/content/comment/status', {
    id,
    status
  }, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
