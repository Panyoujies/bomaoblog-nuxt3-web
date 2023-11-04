<script setup lang="ts">
import {useRoute} from "vue-router";
import {getTag} from "~/api/content/tag";
import type {Tag} from "~/api/content/tag/model";
import {reactive, ref} from "vue";
import type {Article, ArticleParam} from "~/api/content/article/model";
import {pageArticlesByTagId} from "~/api/content/article";

const { params } = useRoute();
const tag = ref<Tag>({});

/**
 * 获取标签内容
 * @param id
 */
await useAsyncData("read_tag", async () => getTag(params.id as unknown as number)).then((res) => {
  tag.value = res.data.value as Tag;
})

const articleList = ref<Article[]>([]);
const tolal = ref<number>(0);
const loading = ref<boolean>(false);
const route = useRoute();

/**
 * 提交的附加内容
 */
const articleParams = reactive<ArticleParam>({
  page: 1,
  limit: 8
});

const { page } = route.query;
articleParams.page = Number(page) || 1;

const fetchData = async () => {
  try {
    pageArticlesByTagId(articleParams, tag.value.tagId as number).then((res) => {
      articleList.value = res?.list || [];
      tolal.value = res?.count || 0;
      loading.value = false;
    })
  } catch (error) {
    loading.value = false;
  }
};

watch(() => route.query?.page, async (newPage, oldPage) => {
  if (newPage !== oldPage && newPage !== undefined) {
    articleParams.page = Number(newPage);
    await fetchData();
    // 获取容器元素。请根据您的实际 DOM 结构来选择合适的选择器。
    const container = document.querySelector('.layout');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

fetchData();

const switchPage = async (value: number) => {
  navigateTo({query: {page: value}});
  loading.value = true;
}

onUnmounted(() => {
  loading.value = false;
})

</script>

<template>
  <div>
    <div class="yuqi-layout">
      <div class="yuqi-layout-header">
        <div># <span style="color: #3f9eff">{{ tag.tagName }}</span> 查询结果</div>
      </div>
      <div class="yuqi-layout-body">
        <div class="article-item" v-loading="loading">
          <article-item v-for="item in articleList" :key="item.id" :article="item"/>
        </div>
        <div class="pagination">
          <el-pagination
              background
              small
              v-model:current-page="articleParams.page"
              layout="prev, pager, next"
              :default-page-size="8"
              :total="tolal"
              @current-change="switchPage"
          />
          <div class="tolal">Total {{ tolal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.yuqi-layout-header {
  padding: 15px;
  border-bottom: solid 1px rgb(239, 239, 245);
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>