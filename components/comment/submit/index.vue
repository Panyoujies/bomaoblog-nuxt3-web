<script setup lang="ts">
import type {CommentParam} from "~/api/content/comment/model";
import {ref} from "vue";
import {addComment} from "~/api/content/comment";

const authStore = useAuthStore();
const token = useCookie('token');

// 加载状态
const loading = ref<boolean>(false);

const emit = defineEmits<{
  (e: 'done'): void;
}>();

const props = defineProps<{
  /**
   * 评论类型
   * commentType: 'comment', 'reply'
   */
  commentType: 'comment' | 'reply';
  /**
   * 需要回复的文章ID
   */
  articleId?: number;
  /**
   * 父级评论ID
   */
  parentCommentId?: number;
}>();

/**
 * 提交评论表单
 */
const {form, resetFields} = useFormData<CommentParam>({
  articleId: props.articleId,
  content: '',
  parentCommentId: props.commentType === 'comment' ? 0 : props.parentCommentId,
  commentType: props.commentType === 'comment' ? 0 : 1
})

/**
 * 提交评论
 */
const submitComment = async () => {
  if (!form.content) {
    ElMessage.warning('评论内容不能为空！')
    return;
  }
  loading.value = true;
  addComment(form).then((res) => {
    ElMessage.success(res);
    loading.value = false;
    resetFields()
    emit('done');
  }).catch((error) => {
    ElMessage.error(error.message);
    loading.value = false;
  })
}
</script>

<template>
  <div class="bomaos-comment">
    <div class="box">
      <el-input
          v-model="form.content"
          type="textarea"
          class="textarea"
          :placeholder="commentType === 'comment' ? '请输入评论内容...' : '请输入回复内容...'"
          :rows="commentType === 'comment' ? 4 : 3"
          show-word-limit
          maxlength="1000"
      />
      <el-button
          type="primary"
          size="default"
          :loading="loading"
          @click="submitComment"
          style="margin-top: 10px"
      >
        {{ commentType === 'comment' ? '提交评论' : '提交回复' }}
      </el-button>
    </div>
    <div v-if="!token" class="noLogin">
      <div class="btn">
        <el-button type="primary" plain @click="authStore.showModal = true">登录 / 注册</el-button>
        <div class="title">请登录后进行{{ commentType === 'comment' ? '评论' : '回复' }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
  .textarea {
    background: rgb(247, 247, 247);
    border: none;
    width: 100%;
    box-sizing: border-box;
  }
}

.bomaos-comment {
  position: relative;

  .noLogin {
    border-radius: 3px;
    width: 100%;
  }

  .noLogin {
    align-items: center;
    background-color: #f2f3f5;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    z-index: 5;

    .btn {
      display: flex;
      flex-direction: row;
      align-items: center;

      .title {
        color: #666;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
</style>