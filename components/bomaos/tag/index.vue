<script setup lang="ts">
const props = defineProps<{
  // 弹窗是否打开
  url?: string;
  amount?: number;
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
    <div class="right" v-if="!!$slots.suffix">
      (<slot name="suffix"/>)
    </div>
    <div class="right" v-if="props.amount">
      <n-badge :value="props.amount as number" color="#3f9eff"/>
    </div>
  </nuxt-link>
</template>

<style scoped lang="less">
.bomaos-tag {
  background-color: #f0f0f0;
  padding: 5px 7px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  color: #1c1c1e;
  font-weight: bold;

  &:hover {
    color: #3f9eff;
  }

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

  .right {
    display: flex;
    font-weight: 500;
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>