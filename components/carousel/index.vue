<script setup lang="ts">
import {ref} from "vue";
import {listCarousels} from "~/api/content/carousel";
import type {Carousel} from "~/api/content/carousel/model";

const { $isMobile, $isDesktop } = useNuxtApp();
const dayjs = useDayjs();
const spinning = ref<boolean>(true);
const carouselList = ref<Carousel[]>([]);

onMounted(async () => {
  spinning.value = true;
  await nextTick(() => {
    listCarousels().then((res) => {
      carouselList.value.push(...res);
      spinning.value = false;
    }).catch(() => {
      spinning.value = false;
    })
  })
})
</script>

<template>
  <el-skeleton style="width: 100%" :loading="spinning" animated>
    <template #template>
      <el-skeleton-item variant="image" :style="{width: '100%', height: $isMobile() ? '150px' : '220px'}" />
    </template>
    <template #default>
      <el-carousel trigger="click" :height="$isMobile() ? '150px' : '220px'" style="border-radius: 3px;">
        <el-carousel-item v-for="item in carouselList" :key="item.id">
          <div class="slider-info b2-radius" :style="{ height: $isMobile() ? '150px' : '220px' }" style="width: 100%; border-radius: 2px">
            <nuxt-link class="link-block" v-if="item.externalLink && item.isExternalLink === 0" :to="item.externalLink as string"/>
            <a class="link-block" v-if="item.externalLink && item.isExternalLink === 1" :href="item.externalLink" target="_blank"></a>
            <picture class="picture">
              <img class="slider-img b2-radius lazy loaded" :src="item.cover as string">
            </picture>
          </div>
        </el-carousel-item>
      </el-carousel>
    </template>
  </el-skeleton>
</template>

<style scoped lang="less">
.el-carousel__item {
  border-radius: 3px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 220px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.slider-info {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.b2-radius {
  border-radius: 0;
}

.slider-info {
  width: 100%;
  text-align: center;
  overflow: hidden;
  background-color: #fff;

  .link-block {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0;
    left: 0;
  }

  .slider-img {
    width: 100%;
    height: 100%!important;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  .slider-info-box {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    text-align: left;
    box-sizing: border-box;
    justify-content: center;
    display: flex;
    flex-flow: column;
    padding: 20px;
    align-items: center;

    .slider-cat {
      span {
        font-size: 12px;
        display: inline-block;
        line-height: 1;
        color: #fff;
        padding-left: 10px;
        position: relative;

        b {
          width: 4px;
          height: 12px;
          display: inline-block;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }

    h2 {
      font-size: 25px;
      color: #fff;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      white-space: normal;
      position: relative;
      z-index: 2;
      overflow: hidden;
      margin-bottom: 5px;
      text-shadow: 2px 2px 4px rgba(0,0,0,.3);
    }

    h4 {
      font-size: 17px;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0,0,0,.3);
    }

    .slider-user {
      display: flex;
      color: #fff;
      align-items: center;
      font-size: 14px;
      position: relative;
      z-index: 2;

      span {
        margin-left: 6px;
        font-size: 12px;
      }

      img {
        width: 24px;
        height: 24px;
        border-radius: 100%;
        display: block;
      }
    }
  }

  .slider-info-box {
    border-radius: 0;
  }

}
</style>