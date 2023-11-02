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
          <div class="sider-body" style="">
            <div class="sider-list">
              <div class="sider-item">
                <nuxt-link to="/" class="sider-item--inner" active-class="sider-item--inner__active">
                  <div class="sider-list-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m11.996 1.658l10.416 9.259l-1.329 1.495L20 11.449v10.55H4V11.455l-1.094.957l-1.317-1.505l4.41-3.86V3H8v2.254l3.996-3.596ZM6 9.704V20h3v-6h6v6h3V9.67l-5.996-5.33L7.66 8.252L6 9.704ZM13 20v-4h-2v4h2Z"></path>
                    </svg>
                    <div>
                      首页推荐
                    </div>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/>
                    </svg>
                  </div>
                </nuxt-link>
              </div>
              <div class="sider-item" v-for="item in categoryList" :key="item.id">
                <nuxt-link :to="'/' + item.alias" class="sider-item--inner" active-class="sider-item--inner__active">
                  <div class="sider-list-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M2 2h9v9H2V2Zm2 2v5h5V4H4Zm13.5 0a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5ZM13 6.5a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0ZM2 13h9v9H2v-9Zm2 2v5h5v-5H4Zm9-2h9v9h-9v-9Zm2 2v5h5v-5h-5Z"/>
                    </svg>
                    <div>
                      {{ item.name }}
                    </div>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/>
                    </svg>
                  </div>
                </nuxt-link>
              </div>
              <div class="sider-item">
                <nuxt-link to="/tags" class="sider-item--inner" active-class="sider-item--inner__active">
                  <div class="sider-list-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10.604 2.117L10.006 7.5h4.988l.623-5.604l1.987.22l-.598 5.384H22v2h-5.216l-.556 5H22v2h-5.994l-.623 5.604l-1.987-.22l.598-5.384H9.006l-.623 5.604l-1.987-.22l.598-5.384H2v-2h5.216l.556-5H2v-2h5.994l.623-5.604l1.987.22ZM9.784 9.5l-.556 5h4.988l.556-5H9.784Z"/>
                    </svg>
                    <div>
                      云标签
                    </div>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/>
                    </svg>
                  </div>
                </nuxt-link>
              </div>
              <div class="sider-item">
                <nuxt-link to="/links" class="sider-item--inner" active-class="sider-item--inner__active">
                  <div class="sider-list-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19.778 4.929a3.5 3.5 0 0 0-4.95 0L12.707 7.05l-1.415-1.414l2.122-2.121a5.5 5.5 0 0 1 7.778 7.778l-3.182 3.182a5.5 5.5 0 0 1-7.778 0l-1.533-1.533l1.415-1.414l1.532 1.533a3.5 3.5 0 0 0 4.95 0l3.182-3.182a3.5 3.5 0 0 0 0-4.95Zm-7.425 6.01a3.5 3.5 0 0 0-4.95 0l-3.182 3.182a3.5 3.5 0 0 0 4.95 4.95l2.122-2.121l1.414 1.414l-2.122 2.121a5.5 5.5 0 0 1-7.778-7.778L5.99 9.525a5.5 5.5 0 0 1 7.778 0l1.296 1.296l-1.414 1.414l-1.296-1.296Z"/>
                    </svg>
                    <div>
                      友情链接
                    </div>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914L8.086 17.5Z"/>
                    </svg>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="sider-footer">
            <n-alert type="info" bordered :show-icon="false">
              本博客专注于前后端开发与波猫商店建设教程，旨在为开发者和商家提供全面的指导和解决方案。
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

.sider-footer {
  margin-top: 15px;
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
        font-weight: 500;

        svg {
          margin-right: 7px;
        }
      }
    }
    .sider-item--inner__active {
      color: #3f9eff;
      border-color: #3f9eff;
      background-color: #ecf5ff;
    }
  }
}
</style>