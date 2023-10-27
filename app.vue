<script setup lang="ts">
const authStore = useAuthStore();
const showModal = computed(() => authStore.showModal);

</script>

<template>
  <div class="bomaos-layout bomaos-layout--absolute-positioned">
    <NuxtLoadingIndicator />
    <div class="bomaos-layout-scroll-container">
      <div class="bomaos-layout-header bomaos-layout-header--absolute-positioned bomaos-layout-header--bordered">
        <common-header />
      </div>
      <div class="bomaos-layout bomaos-layout--absolute-positioned" style="top: 67px; bottom: 0px; background-color: #f5f5f5 !important;">
        <div role="none" class="bomaos-scrollbar">
          <div role="none" class="bomaos-scrollbar-container">
            <div role="none" class="bomaos-scrollbar-content">
              <nuxt-page/>
              <common-footer />
            </div>
          </div>
        </div>
      </div>
    </div>
    <login-modal v-model:visible="showModal" @done="authStore.closeModal"/>
  </div>
</template>

<style scoped lang="scss">
.bomaos-layout {
  color: rgb(51, 54, 57);
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  z-index: auto;
  flex: auto;
  overflow: hidden;
  transition: box-shadow .3s cubic-bezier(.4, 0, .2, 1), background-color .3s cubic-bezier(.4, 0, .2, 1), color .3s cubic-bezier(.4, 0, .2, 1);

  .bomaos-scrollbar {
    overflow: hidden;
    position: relative;
    z-index: auto;
    height: 100%;
    width: 100%;

    > .bomaos-scrollbar-container {
      width: 100%;
      overflow: scroll;
      height: 100%;
      max-height: inherit;
      scrollbar-width: none;

      > .bomaos-scrollbar-content {
        box-sizing: border-box;
        min-width: 100%;
      }

      &::-webkit-scrollbar-thumb {
        width: 0;
        height: 0;
        display: none;
      }

      &::-webkit-scrollbar-track-piece {
        width: 0;
        height: 0;
        display: none;
      }

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }

    }
  }

  &.bomaos-layout--absolute-positioned {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .bomaos-layout-scroll-container {
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;

    .bommaos-layout-header {
      transition: color .3s cubic-bezier(.4, 0, .2, 1), background-color .3s cubic-bezier(.4, 0, .2, 1), box-shadow .3s cubic-bezier(.4, 0, .2, 1), border-color .3s cubic-bezier(.4, 0, .2, 1);
      box-sizing: border-box;
      width: 100%;
      background-color: #fff;
      color: rgb(51, 54, 57);
    }
    .bomaos-layout-header--absolute-positioned {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
    }

    .bomaos-layout-header--bordered {
      border-bottom: solid 1px rgb(239, 239, 245);
    }
  }
}
</style>