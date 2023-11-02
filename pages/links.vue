<script setup lang="ts">
import {reactive, ref} from "vue";
import type {FriendLinks, FriendLinksParam} from "~/api/marketing/friend-links/model";
import {pageFriendLinkss} from "~/api/marketing/friend-links";

const { $isMobile, $isDesktop } = useNuxtApp();
const showVisible = ref<boolean>(false);

const openFriendLinksAdd = () => {
  showVisible.value = true;
}

const friendLinksList = ref<FriendLinks[]>([]);
const tolal = ref<number>(0);
const loading = ref<boolean>(false);
const route = useRoute();

/**
 * 提交的附加内容
 */
const params = reactive<FriendLinksParam>({
  page: 1,
  limit: 24
});

const { page } = route.query;
params.page = Number(page) || 1;

const fetchData = async () => {
  try {
    pageFriendLinkss(params).then((res) => {
      friendLinksList.value = res?.list || [];
      tolal.value = res?.count || 0;
      loading.value = false;
    })
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
  title: '友情链接 - 致力于分享最全的编程教程',
  meta: [
    { name: 'Keywords', content: '鱼七博客,it,java,typescript,博客模板,个人博客,开源博客,vue3,nuxt3' },
    { name: 'description', content: '致力于分享最全的编程教程' },
    { name: 'shenma-site-verification', content: '35386d3f574bc34e545cfdee962ded9d_1693873611'}
  ],
})
</script>

<template>
  <div>
    <div class="yuqi-layout">
      <div class="yuqi-layout-header">
        <div>大佬们的小窝</div>
        <el-button type="primary" plain @click="openFriendLinksAdd">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13 4v7h7v2h-7v7h-2v-7H4v-2h7V4h2Z"/>
            </svg>
          </template>
          申请友链
        </el-button>
      </div>
      <div class="yuqi-layout-body">
        <div class="yuqi-item" v-loading="loading" :style="{margin: $isMobile() ? '15px' : '15px 0 15px 15px'}">
          <el-row v-if="friendLinksList.length != 0" style="row-gap: 15px;" :gutter="15">
            <el-col v-for="item in friendLinksList" :key="item.id" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="friend-links-item">
                <a class="content" :href="item.url" target="_blank">
                  <div style="width: 45px; height: 45px">
                    <van-image
                        :width="45"
                        :height="45"
                        round
                        fit="cover"
                        style="border-radius: 3px"
                        :src="item?.iconUrl as string"
                        :lazy-load="true"
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </div>
                  <div class="right" style="display: flex; flex-direction: column; align-items: flex-start;">
                    <div class="title">{{ item.name }}</div>
                    <span class="description">{{ item.description ?? '暂无介绍' }}</span>
                  </div>
                </a>
              </div>
            </el-col>
          </el-row>
          <el-empty v-else :image-size="70" description="暂无友链"/>
        </div>
      </div>
      <div v-if="friendLinksList.length != 0" class="yuqi-layout-footer">
        <div class="pagination">
          <el-pagination
              background
              small
              v-model:current-page="params.page"
              layout="prev, pager, next"
              :default-page-size="8"
              :total="tolal"
              @current-change="switchPage"
          />
          <div class="tolal">Total {{ tolal }}</div>
        </div>
      </div>
    </div>
    <friend-links-add-dialog v-if="$isDesktop()" v-model:visible="showVisible" />
    <friend-links-add-drawer v-if="$isMobile()" v-model:visible="showVisible" />
  </div>
</template>

<style scoped lang="less">
.friend-links-item {
  background-color: #ffffff;
  border: 1px solid #efeff4;
  border-radius: 5px;
  width: auto;
  padding: 15px;

  &:hover {
    background-color: #f7f7f7;
  }

  .content {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: #1c1c1e;

    .right {
      margin-left: 15px;

      .description {
        font-size: 13px;
        font-weight: 500;
        color: #666;
        -webkit-line-clamp: 1;
        display: -webkit-inline-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
}

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

.yuqi-layout-body {

}

.yuqi-layout-footer {

}
</style>