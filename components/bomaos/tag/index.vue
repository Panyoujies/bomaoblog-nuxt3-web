<script setup lang="ts">
const props = defineProps<{
  // 弹窗是否打开
  url?: string;
}>();
</script>

<template>
  <nuxt-link class="bomaos-tag" :to="url ?? ''">
    <div class="icon">
      <slot name="icon"/>
    </div>
    <div class="content">
      <slot/>
    </div>
  </nuxt-link>
</template>

<style scoped lang="less">
.bomaos-tag {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  color: #1c1c1e;

  .icon {
    display: flex;
    align-items: center;
    width: 13px;
    height: 13px;
  }

  .content {
    margin-left: 3px;
    font-size: 12px;
  }
}
</style>