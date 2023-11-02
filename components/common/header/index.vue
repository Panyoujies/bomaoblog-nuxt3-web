<script setup lang="ts">
import {ref} from "vue";
import {listCategorys} from "~/api/content/category";
import type {Category} from "~/api/content/category/model";

const { $isMobile } = useNuxtApp();
const { info } = storeToRefs(useMemberStore())

const categoryList = ref<Category[]>([]);

/**
 * 获取模特信息
 * @param id
 */
await listCategorys().then((d) => {
  categoryList.value.push(...d)
})

/* 抽屉 */
const visible = ref<boolean>(false);
const showDrawer = () => {
  visible.value = true;
};
</script>

<template>
  <div class="container bomaos" :style="{padding: $isMobile() ? '0 15px' : ''}">
    <div class="bomaos-header">
      <nuxt-link class="bomaos-logo" to="/" style="letter-spacing: 0.2px;">
        <img class="icon" width="35" height="35" src="~/assets/images/logo.svg">
        <span>鱼七博客</span>
      </nuxt-link>
    </div>
    <div class="bomaos-header">

      <div class="bomaos-avatar" v-if="!$isMobile()">
        <div>
          <nuxt-link style="display: flex; align-items: center;">
            <el-avatar :size="35" src="/assets/images/avatar.png"/>
          </nuxt-link>
        </div>
      </div>
      <div v-if="$isMobile()" style="line-height: 66px; display: flex; align-items: center;">
        <div class="author" @click="showDrawer">
          <el-avatar :size="35" :src="info?.avatar ? info.avatar : '/assets/images/avatar.png'"/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.bomaos {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .bomaos-header {
    display: flex;
    height: 66px;
    align-items: center;

    .bomaos-logo {
      position: relative;
      font-weight: 700;
      line-height: 39px;
      overflow:hidden;
      margin:0;
    }

    .bomaos-logo {
      float: left;
      height: 100%;
      font-size: 22px;
      font-weight: bold;
      color: #131313;
      margin-right: 10px;
      display: flex;
      align-items: center;

      &::before {
        content: "";
        position: absolute;
        width: 150px;
        height: 10px;
        background-color: rgba(255,255,255,.5);
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        -webkit-animation: searchLights 1s ease-in 1s infinite;
        animation: searchLights 1s ease-in 1s infinite;
      }

      span {
        margin-left: 10px;
      }

      span, img {
        vertical-align: middle;
      }
    }

    .bomaos-nav {
      color: #fff;
      border-radius: 2px;
      font-size: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0;
      background-color: transparent;

      .bomaos-nav-item {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        line-height: 60px;

        :deep(.icon) {
          fill: #404040;
        }

        &>.bomaos-this {
          color: #409EFF;
          font-weight: bold;

          &:after {
            width: 15px;
          }
        }

        a {
          height: 60px;
          line-height: 60px;
          color: #414141;
          font-size: 17px;
          font-weight: bold;
          padding: 0 5px;
          position: relative;
          cursor: pointer;
          display: block;
          transition: all .3s;
          -webkit-transition: all .3s;

          &:hover, &>.bomaos-this {
            color: #409EFF;

            &:after {
              width: 15px;
            }
          }

          &:after {
            content: '';
            position: absolute;
            bottom: 9px;
            left: 0;
            right: 0;
            width: 0;
            margin: 0 auto;
            height: 4px;
            background-color: #409EFF;
            border-radius: 2px;
            transition: width .2s ease-out;
          }

          .bomaos-this {
            &:after {
              width: 20%;
            }
          }
        }
      }
    }

    .bomaos-avatar {
      margin-left: 20px;
    }

    .author {
      display: flex;
      align-items: center;
    }
  }
}
.b2small {
  position: absolute;
  display: block;
  right: 15px;
  top: 20px;
  font-size: 10px;
  font-weight: 400;
  padding: 0 7px;
  line-height: 17px;
  color: #fff;
  background: #188ef4;
  background: linear-gradient(to right, #409EFF 0%, rgba(74, 137, 255, 0.87) 100%);
  border-radius: 4px 4px 4px 0;
  transform: translate(50%,-75%);
  height: 18px;
}

.top-style .b2small, .top-style-bottom .b2small {
  right: 10px;
  top: 15px;
}

.b2small.shop-tips {
  background: linear-gradient(to right, rgba(255, 51, 86, 0.88) 0%, rgba(255, 103, 128, 0.88) 100%)
}

@keyframes searchLights {
  0% { left: -90px; top: 0; }
  to { left: 90px; top: 0; }
}
</style>