<script setup lang="ts">
import {ref} from "vue";
import type {Category} from "~/api/content/category/model";
import {listCategorys} from "~/api/content/category";

const authStore = useAuthStore();
const showModal = computed(() => authStore.showModal);
const { $isMobile, $isDesktop } = useNuxtApp();
const categoryList = ref<Category[]>([]);

/**
 * 获取模特信息
 * @param id
 */
await listCategorys().then((d) => {
  categoryList.value.push(...d)
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <n-layout position="absolute">
      <n-layout-header bordered>
        <common-header />
      </n-layout-header>
      <n-layout
          has-sider
          position="absolute"
          class="container"
          style="top: 67px; bottom: 70px"
      >
        <n-layout-sider
            has-sider
            bordered
            show-trigger
            collapse-mode="transform"
            :collapsed-width="0"
            :default-collapsed="$isMobile()"
            :collapsed-trigger-style="{right: '-15px'}"
            :content-style="{ padding: $isMobile() ? '15px' : '15px 15px 15px 0', display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }"
            :width="220"
            :native-scrollbar="false"
        >
<!--          <div class="sider-header">
            <n-input v-model:value="value" type="text" placeholder="搜索文章..." />
          </div>-->
          <div class="sider-body" style="">
            <div class="sider-list">
              <div class="sider-item">
                <nuxt-link to="/" class="sider-item--inner" active-class="sider-item--inner__active">
                  <div class="sider-list-title">
                    <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                      <path d="M698.581333 895.786667a42.666667 42.666667 0 0 1-37.376-76.714667A341.333333 341.333333 0 1 0 512 853.333333a42.666667 42.666667 0 0 1 0 85.333334C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667a426.666667 426.666667 0 0 1-240.085334 383.786667z m-389.973333-452.608a42.666667 42.666667 0 0 1-19.925333-82.986667c151.722667-36.48 303.701333-20.010667 454.4 49.024a42.666667 42.666667 0 1 1-35.498667 77.568c-133.674667-61.184-266.154667-75.52-398.933333-43.605333z m43.52 125.44a42.666667 42.666667 0 1 1-21.546667-82.56c123.989333-32.341333 248.277333-17.706667 371.029334 43.178666a42.666667 42.666667 0 1 1-37.888 76.458667c-104.746667-51.925333-208-64.085333-311.637334-37.077333z m21.546667 124.373333a42.666667 42.666667 0 1 1-22.016-82.432c95.744-25.6 191.872-13.994667 286.336 34.090667a42.666667 42.666667 0 1 1-38.656 76.032c-76.16-38.698667-150.698667-47.701333-225.664-27.690667z" fill="currentColor"></path>
                    </svg>
                    <div>
                      首页推荐
                    </div>
                  </div>
                  <div>
                  </div>
                </nuxt-link>
              </div>
              <div class="sider-item" v-for="item in categoryList" :key="item.id">
                <nuxt-link :to="'/' + item.alias" class="sider-item--inner" active-class="sider-item--inner__active">
                  <div class="sider-list-title">
                    <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                      <path d="M698.581333 895.786667a42.666667 42.666667 0 0 1-37.376-76.714667A341.333333 341.333333 0 1 0 512 853.333333a42.666667 42.666667 0 0 1 0 85.333334C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667a426.666667 426.666667 0 0 1-240.085334 383.786667z m-389.973333-452.608a42.666667 42.666667 0 0 1-19.925333-82.986667c151.722667-36.48 303.701333-20.010667 454.4 49.024a42.666667 42.666667 0 1 1-35.498667 77.568c-133.674667-61.184-266.154667-75.52-398.933333-43.605333z m43.52 125.44a42.666667 42.666667 0 1 1-21.546667-82.56c123.989333-32.341333 248.277333-17.706667 371.029334 43.178666a42.666667 42.666667 0 1 1-37.888 76.458667c-104.746667-51.925333-208-64.085333-311.637334-37.077333z m21.546667 124.373333a42.666667 42.666667 0 1 1-22.016-82.432c95.744-25.6 191.872-13.994667 286.336 34.090667a42.666667 42.666667 0 1 1-38.656 76.032c-76.16-38.698667-150.698667-47.701333-225.664-27.690667z" fill="currentColor"></path>
                    </svg>
                    <div>
                      {{ item.name }}
                    </div>
                  </div>
                  <div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="sider-fotter">
            <n-alert type="info" bordered :show-icon="false">
              本博客专注于前后端开发与电商平台建设教程，旨在为开发者和商家提供全面的指导和解决方案。
            </n-alert>
          </div>
        </n-layout-sider>
        <n-layout :native-scrollbar="false">
          <div class="layout">
            <nuxt-page/>
          </div>
        </n-layout>
      </n-layout>
      <n-layout-footer
          bordered
          position="absolute"
          style="height: 70px;"
      >
        <common-footer/>
      </n-layout-footer>
    </n-layout>
    <login-modal v-if="$isDesktop()" v-model:visible="showModal" @done="authStore.closeModal"/>
    <login-drawer v-if="$isMobile()" v-model:visible="showModal" @done="authStore.closeModal"/>
  </div>
</template>

<style scoped lang="scss">
.sider-header {
  display: flex;
  flex: 0;
  align-items: center;
  font-size: 16px;
  line-height: 1.5;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}

.sider-body {
  flex: 1;
}

.sider-list {
  display: flex;
  flex-direction: column;

  .sider-item {

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    .sider-item--inner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border-radius: 0.375rem;
      border: 1px solid #e5e7eb;
      cursor: pointer;
      background: white;
      color: #3b3b3b;
      font-size: 15px;

      .sider-list-title {
        display: flex;
        align-items: center;
        svg {
          margin-right: 7px;
        }
      }
    }
    .sider-item--inner__active {
      color: #3f9eff;
      border-color: #3f9eff;
    }
  }
}
</style>