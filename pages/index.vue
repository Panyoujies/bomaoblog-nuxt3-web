<script setup lang="ts">
import {ref, reactive} from "vue";
import {pageArticles} from "~/api/content/article";
import type {Article, ArticleParam} from "~/api/content/article/model";

const { $isMobile, $isDesktop } = useNuxtApp();

const articleList = ref<Article[]>([]);
const tolal = ref<number>(0);
const loading = ref<boolean>(false);
const route = useRoute();

/**
 * 提交的附加内容
 */
const params = reactive<ArticleParam>({
  page: 1,
  limit: 8
});

const { page } = route.query;
params.page = Number(page) || 1;

const fetchData = async () => {
  try {
    await useAsyncData("read_index_article", async () => pageArticles(params)).then((res) => {
      articleList.value = res.data.value?.list || [];
      tolal.value = res.data.value?.count || 0;
      loading.value = false;
    });
  } catch (error) {
    loading.value = false;
  }
};

watch(() => route.query?.page, async (newPage, oldPage) => {
  if (newPage !== oldPage && newPage !== undefined) {
    params.page = Number(newPage);
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

useHead({
  title: '鱼七博客 - 致力于分享最全的编程教程',
  meta: [
    { name: 'Keywords', content: '鱼七博客,it,java,typescript,波猫' },
    { name: 'description', content: '致力于分享最全的编程教程' },
    { name: 'shenma-site-verification', content: '35386d3f574bc34e545cfdee962ded9d_1693873611'}
  ],
})
</script>

<template>
  <div class="container">
    <div class="yuqi-layout">
      <div style="min-height: calc(100vh - 168px);">
        <div style="margin-bottom: 15px">
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
              <el-card class="bomaos-card" :body-style="{ padding: '10px', height: $isMobile() ? '150px' : '220px' }">
                <carousel />
              </el-card>
            </el-col>
            <el-col v-if="$isDesktop()" :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
              <el-card class="bomaos-card" :body-style="{ padding: '10px', height: '220px' }">
                <van-image
                    width="100%"
                    :height="145"
                    round
                    fit="cover"
                    style="border-radius: 3px"
                    src="/assets/images/bomaos-banner.png"
                    :lazy-load="true"
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="40" />
                  </template>
                </van-image>
                <div class="bomaos-info">
                  <div class="item">
                    <div>文章</div>
                    <span>234</span>
                  </div>
                  <van-divider vertical style="height: 1.3em; margin: 0px; border-color: rgb(212 212 212)" :hairline="false"/>
                  <div class="item">
                    <div>评论</div>
                    <span>234</span>
                  </div>
                  <van-divider vertical style="height: 1.3em; margin: 0px; border-color: rgb(212 212 212)" :hairline="false"/>
                  <div class="item">
                    <div>用户</div>
                    <span>234</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
            <el-card class="bomaos-card" :body-style="{ padding: 0 }" style="overflow: inherit;">
              <div class="article-tem" v-loading="loading">
                <article-item v-for="item in articleList" :key="item.id" :article="item"/>
              </div>
              <div class="pagination">
                <el-pagination
                    background
                    small
                    v-model:current-page="params.page"
                    layout="prev, pager, next"
                    :total="tolal"
                    @current-change="switchPage"
                />
                <div class="tolal">Total {{ tolal }}</div>
              </div>
            </el-card>
          </el-col>
          <el-col v-if="$isDesktop()" :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
            <!-- 相关推荐 -->
            <common-hot-post />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.bomaos-info {
  margin-top: 7px;
  background-color: #f3f3f3;
  border: 1px solid #efefef;
  border-radius: 3px;
  padding: 10px;
  display: flex;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      margin-bottom: 3px;
    }

    span {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>