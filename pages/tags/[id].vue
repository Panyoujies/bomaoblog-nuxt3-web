<script setup lang="ts">
import {useRoute} from "vue-router";
import {getTag} from "~/api/content/tag";
import type {Tag} from "~/api/content/tag/model";

const { params } = useRoute();
const tag = ref<Tag>({});

/**
 * 获取标签内容
 * @param id
 */
await useAsyncData("read_tag", async () => getTag(params.id as unknown as number)).then((res) => {
  tag.value = res.data.value as Tag;
})
</script>

<template>
  <div>
    <div class="yuqi-layout">
      <div class="yuqi-layout-header">
        <div># <span style="color: #3f9eff">{{ tag.tagName }}</span> 查询结果</div>
      </div>
      <div class="yuqi-layout-body">
        云标签功能开发中
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