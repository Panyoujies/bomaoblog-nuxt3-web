<script setup lang="ts">
import {getHotPosts} from "~/api/content/article";
import type {Article} from "~/api/content/article/model";
import {ref} from "vue";

const articleList = ref<Article[]>([]);

await useAsyncData("read_hots", async () => getHotPosts()).then((res) => {
  articleList.value.push(...(res.data.value as Article[]));
})

/*const res = await useFetch("https://api.github.com/repos/panyoujies/bomaoblog-nuxt3-web", {
    headers: { "Accept": "application/vnd.github.v3+json" },
    server: true
  }
);*/
</script>

<template>
  <div class="sticky-article">
    <el-card class="bomaos-card">
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
    <div class="github">
      <a href="https://github.com/Panyoujies/bomaoblog-nuxt3-web" class="bomaos-github" target="_blank">
        <div class="title">
          <div class="icon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
              <path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z"></path>
            </svg>
          </div>
          <span>鱼七博客</span>
        </div>
        <div>
          <span style="font-weight: 400; color: #666">Star 4</span>
        </div>
      </a>
      <van-divider style="margin: 0;"/>
      <a href="https://github.com/Panyoujies/bomaos-shop" class="bomaos-github" target="_blank">
        <div class="title">
          <div class="icon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
              <path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z"></path>
            </svg>
          </div>
          <span>波猫商店</span>
        </div>
        <div>
          <span style="font-weight: 400; color: #666">Star 184</span>
        </div>
      </a>
    </div>

  </div>
</template>

<style scoped lang="less">
:deep(.el-card__header) {
  padding: 16px 20px !important;
}

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

.github {
  margin-top: 15px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 2px #627c991a;

  .bomaos-github {
    font-size: 18px;
    font-weight: bold;
    padding: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      display: flex;
      align-items: center;
      color: #4d4d4d;

      .icon {
        display: inherit;
        margin-right: 5px;
      }
    }

  }
}

</style>