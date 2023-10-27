<script setup lang="ts">
import {getHotPosts} from "~/api/content/article";
import type {Article} from "~/api/content/article/model";
import {ref} from "vue";

const articleList = ref<Article[]>([]);

await useAsyncData("read_hots", async () => getHotPosts()).then((res) => {
  articleList.value.push(...res.data.value);
})
</script>

<template>
  <el-card class="bomaos-card sticky-article">
    <template #header>
      <span>热门推荐</span>
    </template>
    <nuxt-link class="item" v-for="item in articleList" :key="item.id" :to="'/post/' + item.id" target="_blank">
      <div class="entry-title" style="font-size: 14px;">{{ item.title }}</div>
      <div class="entry-meta-box">
        <div class="entry-meta">{{ item.seeNumber }} 阅读</div>
        <div class="entry-meta">&nbsp;·&nbsp;</div>
        <div class="entry-meta">{{item.likes }} 点赞</div>
      </div>
    </nuxt-link>
  </el-card>
</template>

<style scoped lang="less">
.item {
  display: block;
  margin-bottom: 10px;
  color: #1c1c1e;

  &:last-child {
    margin-bottom: 0px;
  }

  &:hover {
    color: #409EFF;
  }

  .entry-title {
    line-height: 22px;
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .entry-meta-box {
    margin-top: 0px;
    display: flex;
    color: #666666;

    .entry-meta {
      display: flex;
      font-size: 12px;
      line-height: 22px;
      color: var(--juejin-font-3);
      font-weight: 400;
    }
  }
}
</style>