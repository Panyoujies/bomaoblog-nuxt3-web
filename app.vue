<script setup lang="ts">
const authStore = useAuthStore();
const showModal = computed(() => authStore.showModal);

</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <common-header />
    <div class="layout">
      <nuxt-page/>
    </div>
    <common-footer />

    <login-modal v-model:visible="showModal" @done="authStore.closeModal"/>
  </div>
</template>

<style scoped lang="scss">
</style>