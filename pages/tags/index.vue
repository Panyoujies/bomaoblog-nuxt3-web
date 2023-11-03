<script setup lang="ts">
import {reactive, ref} from "vue";
import type {Tag, TagParam} from "~/api/content/tag/model";
import {listTags} from "~/api/content/tag";

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
    listTags().then((res) => {
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
      </div>
      <div class="yuqi-layout-body">
        <div class="yuqi-item" v-loading="loading" :style="{margin: $isMobile() ? '15px' : '15px 0 15px 15px'}">
          <el-space wrap>
            <bomaos-tag v-for="tag in tagList" :key="tag.tagId" :url="'/tags/' + tag.tagId">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10.604 2.117L10.006 7.5h4.988l.623-5.604l1.987.22l-.598 5.384H22v2h-5.216l-.556 5H22v2h-5.994l-.623 5.604l-1.987-.22l.598-5.384H9.006l-.623 5.604l-1.987-.22l.598-5.384H2v-2h5.216l.556-5H2v-2h5.994l.623-5.604l1.987.22ZM9.784 9.5l-.556 5h4.988l.556-5H9.784Z"/>
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