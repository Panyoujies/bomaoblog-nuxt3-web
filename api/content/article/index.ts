import request from "~/composables/request";
import type {ApiResult, PageResult} from "@/api";
import type {Article, ArticleParam} from "./model";
import requestAxios from '@/utils/request-axios';
import { WatchSource } from "vue";

/**
 * 分页查询文章
 */
export async function pageArticles(params: ArticleParam) {
  const res = await request.get<PageResult<Article>>('/content/article/page', {...params},
      {
        server: true
      }
  );
  if (res.code === 0) {
    return res.data && res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 分页查询文章
 */
export async function pageArticlesByTagId(params: ArticleParam, tagId: number) {
  const res = await request.get<PageResult<Article>>('/content/article/pageArticlesByTagId/' + tagId, {...params},
      {server: true}
  );
  if (res.code === 0) {
    return res.data && res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询热门推荐
 */
export async function getHotPosts(params?: ArticleParam) {
  const res = await request.get<Article[]>('/content/article/getHotPosts', params, { server: true });
  if (res.code === 0) {
    return res.data && res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询文章
 */
export async function getArticle(id?: number) {
  const res = await request.get<Article>('/content/article/' + id, null, {server: true});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加文章
 */
export async function addArticle(data: Article) {
  const res = await request.post<unknown>('/content/article', data, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改文章
 */
export async function updateArticle(data: Article) {
  const res = await request.put<unknown>('/content/article', data, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除文章
 */
export async function removeArticle(id?: number) {
  const res = await request.delete<unknown>(
    '/content/article/' + id, null, {server: false}
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除文章
 */
export async function removeArticles(data: (number | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/content/article/batch', data, {server: false}

  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改状态
 */
export async function updateArticleEnabled(id?: number, enabled?: number) {
  const res = await request.put<ApiResult<unknown>>('/content/article/enabled', {
    id,
    enabled
  }, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
