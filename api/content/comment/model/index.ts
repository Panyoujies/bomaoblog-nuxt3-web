import {PageParam} from "@/api";
import type {Member} from "~/api/member/member/model";

export interface Comment {
  // 自增id")
  commentId?: number;

  // 文章id")
  articleId?: number;

  // 会员id")
  memberId?: number;

  content?: string;

  // 父评论ID")
  parentCommentId?: number;

  // 租户id")
  tenantId?: number;

  // 添加时间")
  createTime?: string;

  // 修改时间")
  updateTime?: string;
}

export interface CommentDto {
  // 自增id")
  commentId?: number;

  // 文章id")
  articleId?: number;

  // 会员id")
  memberId?: number;

  // 内容
  content?: string;

  // 父评论ID")
  parentCommentId?: number;

  // 添加时间")
  createTime?: string;

  // 修改时间")
  updateTime?: string;

  // 会员信息
  member?: Member;
}

/**
 * 文章搜索条件
 */
export interface CommentParam extends PageParam {
  // 自增id")
  commentId?: number;

  // 文章id")
  articleId?: number;

  // 会员id")
  memberId?: number;

  // 评论内容
  content?: string;

  // 父评论ID")
  parentCommentId?: number;

}
