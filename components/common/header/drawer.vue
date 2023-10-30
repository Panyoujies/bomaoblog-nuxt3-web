<template>
  <el-drawer
      :model-value="props.visible"
      title="鱼七博客"
      direction="rtl"
      size="80%"
      :before-close="done"
      class="bomaos-safe-area-bottom"
  >
    <div class="sider-list">
      <div class="sider-item">
        <nuxt-link to="/" @click.native="done" class="sider-item--inner" active-class="sider-item--inner__active">
          <div class="sider-list-title">
            <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M698.581333 895.786667a42.666667 42.666667 0 0 1-37.376-76.714667A341.333333 341.333333 0 1 0 512 853.333333a42.666667 42.666667 0 0 1 0 85.333334C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667a426.666667 426.666667 0 0 1-240.085334 383.786667z m-389.973333-452.608a42.666667 42.666667 0 0 1-19.925333-82.986667c151.722667-36.48 303.701333-20.010667 454.4 49.024a42.666667 42.666667 0 1 1-35.498667 77.568c-133.674667-61.184-266.154667-75.52-398.933333-43.605333z m43.52 125.44a42.666667 42.666667 0 1 1-21.546667-82.56c123.989333-32.341333 248.277333-17.706667 371.029334 43.178666a42.666667 42.666667 0 1 1-37.888 76.458667c-104.746667-51.925333-208-64.085333-311.637334-37.077333z m21.546667 124.373333a42.666667 42.666667 0 1 1-22.016-82.432c95.744-25.6 191.872-13.994667 286.336 34.090667a42.666667 42.666667 0 1 1-38.656 76.032c-76.16-38.698667-150.698667-47.701333-225.664-27.690667z" fill="currentColor"></path>
            </svg>
            <div>
              首页推荐
            </div>
          </div>
          <div>
<!--            <a-tag color="#31c27c" style="margin-inline-end: 0px;">New</a-tag>-->
          </div>
        </nuxt-link>
      </div>
      <div class="sider-item" v-for="item in categoryList" :key="item.id">
        <nuxt-link :to="'/' + item.alias" @click.native="done" class="sider-item--inner" active-class="sider-item--inner__active">
          <div class="sider-list-title">
            <svg  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path d="M698.581333 895.786667a42.666667 42.666667 0 0 1-37.376-76.714667A341.333333 341.333333 0 1 0 512 853.333333a42.666667 42.666667 0 0 1 0 85.333334C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667a426.666667 426.666667 0 0 1-240.085334 383.786667z m-389.973333-452.608a42.666667 42.666667 0 0 1-19.925333-82.986667c151.722667-36.48 303.701333-20.010667 454.4 49.024a42.666667 42.666667 0 1 1-35.498667 77.568c-133.674667-61.184-266.154667-75.52-398.933333-43.605333z m43.52 125.44a42.666667 42.666667 0 1 1-21.546667-82.56c123.989333-32.341333 248.277333-17.706667 371.029334 43.178666a42.666667 42.666667 0 1 1-37.888 76.458667c-104.746667-51.925333-208-64.085333-311.637334-37.077333z m21.546667 124.373333a42.666667 42.666667 0 1 1-22.016-82.432c95.744-25.6 191.872-13.994667 286.336 34.090667a42.666667 42.666667 0 1 1-38.656 76.032c-76.16-38.698667-150.698667-47.701333-225.664-27.690667z" fill="currentColor"></path>
            </svg>
            <div>
              {{ item.name }}
            </div>
          </div>
          <div>
            <!--            <a-tag color="#31c27c" style="margin-inline-end: 0px;">New</a-tag>-->
          </div>
        </nuxt-link>
      </div>

    </div>
<!--    <template #footer>
      <div class="bomaos-footer">
        <a-alert message="提供一站式Spotify帮助与服务、支持注册、修改密码、解锁14天、下载、会员订阅等专业的解决方案" type="info"/>
        <a-divider style="margin: 15px 0"/>
        <router-link to="/user" @click.native="updateVisible" class="avatar">
          <a-avatar size="large" :src="info?.avatar ? info?.avatar : '/assets/user-avatar.jpg'">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <div>
            <b>{{ info?.nickName ?? '未登录' }}</b>
            <span>{{ info?.nickName ? '已登录可使用全部功能' : '您还未登录、请登录后使用' }}</span>
          </div>
        </router-link>
      </div>
    </template>-->
  </el-drawer>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {Category} from "~/api/content/category/model";
import {listCategorys} from "~/api/content/category";

const { info } = storeToRefs(useMemberStore())

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible?: boolean;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const done = (done: () => void) => {
  updateVisible(false)
}

const categoryList = ref<Category[]>([]);

/**
 * 获取模特信息
 * @param id
 */
await listCategorys().then((d) => {
  categoryList.value.push(...d)
})
</script>

<style scoped lang="less">
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
      color: #31c27c;
      border-color: #31c27c;
    }
  }
}

.bomaos-footer {
  width: 100%;
  padding: 7px 0;
  .avatar {
    display: flex;
    div {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      color: #131313;
      b {
        line-height: 1.2;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
</style>