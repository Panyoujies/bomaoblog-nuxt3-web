import request from "~/composables/request";
import type {FriendLinks, FriendLinksParam} from "./model";
import {PageResult} from "~/api";


/**
 * 分页查询类别
 */
export async function pageFriendLinkss(params: FriendLinksParam) {
  const res = await request.get<PageResult<FriendLinks>>(
      '/marketing/friend-links/page',
      { ...params }, { server: true }
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加类别
 */
export async function addFriendLinks(data: FriendLinks) {
  const res = await request.post<unknown>('/marketing/friend-links', { ...data }, {server: false});
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
