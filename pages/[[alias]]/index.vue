<script setup lang="ts">
import {ref, reactive} from "vue";
import {Star} from "@element-plus/icons-vue";
import {pageArticles} from "~/api/content/article";
import {getCategoryByAlias} from "~/api/content/category";
import type {Article, ArticleParam} from "~/api/content/article/model";
import type {Category} from "~/api/content/category/model";
import NumberFormatter from "../../utils/NumberFormatter";

const { $isMobile, $isDesktop } = useNuxtApp();
const category = ref<Category>({});
const articleList = ref<Article[]>([]);
const loading = ref<boolean>(false);
const tolal = ref<number>(0);
const route = useRoute();

await useAsyncData("read_category", async () => getCategoryByAlias(route.params.alias as unknown as string)).then((res) => {
  category.value = res.data.value as Category;
})

/**
 * 提交的附加内容
 */
const params = reactive<ArticleParam>({
  categoryId: category.value.id as unknown as number,
  page: 1,
  limit: 8
});

const { page } = route.query;
params.page = Number(page) || 1;

const fetchData = async () => {
  try {
    await useAsyncData("read_alias_article", async () => pageArticles(params)).then((res) => {
      tolal.value = res.data.value?.count || 0;
      articleList.value = res.data.value?.list || [];
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

const switchPage = (value: number) => {
  navigateTo({query: {page: value}});
  loading.value = true;
}

onUnmounted(() => {
  loading.value = false;
})

useHead({
  title: computed(() => {
    if (category.value.id && category.value.name) {
      return category.value.name
    } else {
      return '404'
    }
  }),
  titleTemplate: (title) => `${title} - 鱼七博客`,
  meta: [
    { name: 'Keywords', content: computed(() => {
        if (category.value.id) {
          return category.value.name + ',鱼七博客,it,java,typescript,波猫,博客模板,个人博客,开源博客,vue3,nuxt3'
        } else {
          return '404'
        }
      })},
    { name: 'description', content: computed(() => {
        if (category.value.id) {
          return category.value.name ?? '致力于分享最全的编程教程'
        } else {
          return '404'
        }
      })
    }
  ],
})
</script>

<template>
  <div>
    <nav v-if="!$isMobile()">
      <div class="navBox">
        <el-row style="row-gap: 15px;" :gutter="15">
          <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
            <!--用户-->
            <div class="nav-userBox">
              <div class="btn-img">
                <div class="van-circle" style="width: 120px; height: 120px;">
                  <svg viewBox="0 0 1015 1015">
                    <defs>
                      <linearGradient id="van-circle-1" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#8fdae4"></stop>
                        <stop offset="100%" stop-color="#fa7399"></stop>
                      </linearGradient>
                    </defs>
                    <path class="van-circle__layer" d="M 507.5 507.5 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000" style="fill: none; stroke-width: 17px;"></path>
                    <path d="M 507.5 507.5 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000" class="van-circle__hover" stroke="url(#van-circle-1)" style="stroke: url(&quot;#van-circle-1&quot;); stroke-width: 18px; stroke-dasharray: 3140px, 3140px;"></path>
                  </svg>
                  <div class="btn-img-border">
                    <van-image
                        round
                        width="110px"
                        height="110px"
                        fit="cover"
                        :src="category.cover as string"
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="50" />
                      </template>
                    </van-image>
                  </div>
                </div>
              </div>
              <div class="user-wrap">
                <div class="username">{{ category.name }}</div>
                <ul class="user-data">
                  <li>
                    <span>{{ NumberFormatter.formatNumber(category.seeNumber) }}</span>
                    <div>访问</div>
                  </li>
                  <el-divider direction="vertical" style="margin: 0 15px; height: 15px"/>
                  <li>
                    <span>{{ category.articleNumber }}</span>
                    <div>文章</div>
                  </li>
                  <el-divider direction="vertical" style="margin: 0 15px; height: 15px"/>
                  <li>
                    <span>0</span>
                    <div>收藏</div>
                  </li>
                </ul>
                <p class="user-txt" id="us-remark">
                  <span>{{ category.summary }}</span>
                </p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
            <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%;">
              <el-button
                  type="primary"
                  size="large"
                  round
                  style="width: 100%;"
              >
                <template #icon>
                  <el-icon><Star /></el-icon>
                </template>
                收藏
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </nav>
    <header v-else>
      <div class="user-name-wrap">
        <div class="user-img">
          <div class="van-circle" style="width: 90px; height: 90px;">
            <svg viewBox="0 0 1025 1025">
              <defs>
                <linearGradient id="van-circle-1" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="#8fdae4"></stop>
                  <stop offset="100%" stop-color="#fa7399"></stop>
                </linearGradient>
              </defs>
              <path class="van-circle__layer" d="M 512.5 512.5 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000" style="fill: none; stroke-width: 25px;"></path>
              <path d="M 512.5 512.5 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000" class="van-circle__hover" stroke="url(#van-circle-1)" style="stroke: url(&quot;#van-circle-1&quot;); stroke-width: 26px; stroke-dasharray: 3140px, 3140px;"></path>
            </svg>
            <div class="mobile-img-border">
              <van-image
                  round
                  width="80px"
                  height="80px"
                  fit="cover"
                  :src="category.cover as string"
                  :lazy-load="true"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="50" />
                </template>
              </van-image>
            </div>
          </div>
        </div>
        <div class="username">{{ category.name ?? '数据获取中...' }}</div>
        <n-ellipsis expand-trigger="click" line-clamp="1" :tooltip="false">
          <span>{{ category.summary ?? '数据获取中...' }}</span>
        </n-ellipsis>
        <ul class="user-data">
          <li>
            <span>{{ NumberFormatter.formatNumber(category.seeNumber) }}</span>
            <div>访问</div>
          </li>
          <el-divider direction="vertical" style="margin: 0 15px;"/>
          <li>
            <span>{{ category.articleNumber ?? 0 }}</span>
            <div>文章</div>
          </li>
          <el-divider direction="vertical" style="margin: 0 15px;"/>
          <li>
            <span>0</span>
            <div>收藏</div>
          </li>
        </ul>
      </div>
    </header>
    <div class="yuqi-layout">
      <div>
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
              :default-page-size="8"
              @current-change="switchPage"
          />
          <div class="tolal">Total {{ tolal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
nav {
  .navBox {
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    width: 100%;
    color: #FFFFFF;
    position: relative;
    box-sizing: border-box;
    padding: 20px 0;

    .nav-userBox {
      text-align: center;
      display: flex;
      align-items: flex-start;
      color: #333;
      margin-left: 15px;
    }

    .user-wrap {
      display: flex;
      flex-direction: column;

      .username {
        font-size: 32px;
        display: flex;
        align-items: center;
        text-align: left;
        margin-bottom: 10px;
      }

      .user-data {
        position: relative;
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #333;

        li {
          display: flex;
          align-items: center;

          span {
            font-size: 20px;
            margin-right: 6px;
          }
          div {
            display: inline-block;
            font-size: 16px;
            color: #999;
          }
        }
      }

      .user-txt {
        font-size: 16px;
        text-align: left;
        margin-top: 15px;
      }
    }
  }
}

.btn-img {
  position: relative;
  margin-right: 30px;
  width: 120px;
  height: auto;
}

.btn-img-border {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-size: cover;

  .user-img {
    width: 110px;
    height: 110px;
  }

  .user-img {
    border-radius: 50%;
  }
}

.van-circle {
  display: inline-block;
  height: 100px;
  position: relative;
  text-align: center;
  width: 100px;
  svg {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

.van-circle__layer {
  stroke: #fff;
}

.van-circle__hover {
  fill: none;
  stroke: #1989fa;
  stroke-linecap: round;
}

header {
  .user-name-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    background-color: white;
    border-bottom: 1px solid #f0f0f0;

    .user-img {
      margin-bottom: 10px;
    }

    .username {
      font-size: 20px;
      text-align: center;
      margin-bottom: 5px;
    }

    .user-data {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #333;
      margin-top: 10px;

      li {
        display: flex;
        align-items: center;

        span {
          font-size: 20px;
          margin-right: 6px;
        }

        div {
          display: inline-block;
          font-size: 16px;
          color: #999;
        }

        &:nth-child(3) {
          div {
            margin-right: 0;
          }
        }
      }
    }
    .user-data {
      justify-content: center;
    }
  }
}

.mobile-img-border {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-size: cover;

  .user-img {
    width: 176px;
    height: 176px;
  }

  .user-img {
    border-radius: 50%;
  }
}
</style>