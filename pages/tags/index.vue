<script setup lang="ts">
import {reactive, ref} from "vue";
import type {Tag, TagParam} from "~/api/content/tag/model";
import {listTags, listTagWithArticleCount} from "~/api/content/tag";

const { $isMobile, $isDesktop } = useNuxtApp();
const tagList = ref<Tag[]>([]);
const loading = ref<boolean>(false);
const route = useRoute();

/**
 * 提交的附加内容
 */
const params = reactive<TagParam>({
  page: 1,
  limit: 24
});

const { page } = route.query;
params.page = Number(page) || 1;

const fetchData = async () => {
  try {
    listTagWithArticleCount().then((res) => {
      tagList.value = res || [];
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
</script>

<template>
  <div>
    <div class="yuqi-layout">
      <div class="yuqi-layout-header">
        <div># 全部云标签</div>
        <div>共 {{ tagList.length }} 个</div>
      </div>
      <div class="yuqi-layout-body">
        <div class="yuqi-item" v-loading="loading" :style="{margin: $isMobile() ? '15px' : '15px 0 15px 15px'}">
          <el-space wrap>
            <bomaos-tag
                v-for="tag in tagList"
                :key="tag.tagId"
                :url="'/tags/' + tag.tagId"
                :count="tag.articleCount"
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24">
                  <g fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/>
                    <path fill="currentColor" d="M9.686 2.511a1.5 1.5 0 0 1 1.303 1.675L10.637 7h3.976l.399-3.186a1.5 1.5 0 0 1 2.977.372L17.637 7H20a1.5 1.5 0 0 1 0 3h-2.738l-.5 4H19.5a1.5 1.5 0 0 1 0 3h-3.113l-.398 3.186a1.5 1.5 0 0 1-2.977-.372L13.363 17H9.387l-.398 3.186a1.5 1.5 0 1 1-2.977-.372L6.363 17H4.5a1.5 1.5 0 1 1 0-3h2.238l.5-4H5a1.5 1.5 0 1 1 0-3h2.613l.399-3.186A1.5 1.5 0 0 1 9.686 2.51ZM13.74 14l.5-4h-3.977l-.5 4h3.976Z"/>
                  </g>
                </svg>
              </template>
              {{ tag.tagName }}
            </bomaos-tag>
          </el-space>
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