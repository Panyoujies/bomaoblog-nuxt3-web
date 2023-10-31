<script setup lang="ts">
import type {Article} from "~/api/content/article/model";

const { $isMobile, $isDesktop } = useNuxtApp();
const dayjs = useDayjs();
const router = useRouter();

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  article?: Article;
}>();

/**
 * 新建标签页打开文章
 */
const navigateToArticle = async () => {
  await navigateTo(`/post/${props.article?.id}`)
};

const navigateToCategory = async () => {
  await navigateTo(`/${props.article?.categoryAlias}`)
};
</script>

<template>
  <div
      class="van-cell clickable"
      :style="{padding: '15px'}"
      @click="navigateToArticle"
  >
    <div v-if="$isDesktop()" style="margin-right: 15px; display: inherit;">
      <van-image
          width="130px"
          :height="100"
          round
          fit="cover"
          style="border-radius: 3px"
          :src="article?.cover as string"
          :lazy-load="true"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="40" />
        </template>
        <template #default v-if="article?.isVideo">
          <div class="play-icon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor">
              <path d="M512 1.28C229.930667 1.28 1.28 229.930667 1.28 512 1.28 794.069333 229.930667 1022.72 512 1022.72c282.069333 0 510.72-228.650667 510.72-510.72C1022.72 229.930667 794.069333 1.28 512 1.28z m249.450667 520.746667c-25.898667 15.146667-329.386667 192.298667-344.554667 201.066666-18.965333 10.944-38.122667-2.986667-38.122667-21.717333v-402.986667c0-20.629333 21.184-30.656 37.333334-21.568 22.08 12.373333 326.698667 190.421333 345.344 201.536a25.173333 25.173333 0 0 1 0 43.648z"></path>
            </svg>
          </div>
        </template>
      </van-image>
    </div>
    <div class="van-cell__title">
      <div class="title">
        <div style="display: flex;     align-items: center;">
          <div v-if="article?.isPinned" class="pinned">
            置顶
          </div>
          <div class="bomaos-ellipsis">
            <span :style="{ fontSize: '18px'}">{{ article.title as string }}</span>
          </div>
        </div>
        <div class="bomaos-ellipsis">
          <div style="margin-top: 2px; color: #555;">{{ article.summary }}</div>
        </div>
      </div>
      <div class="van-cell__label" style="margin-top: 5px">
        <el-space wrap>
          <div @click.stop="navigateToCategory" style="font-size: 12px; color: #409EFF">{{ article.categoryName }}</div>
          <van-divider vertical style="margin: 0" :hairline="false"/>
          <div style="font-size: 12px; display: flex; align-items: center;">
            <span>{{ dayjs(article.createTime).fromNow() }}</span>
          </div>
          <van-divider vertical style="margin: 0" :hairline="false"/>
          <div style="font-size: 12px; display: flex; align-items: center;">
            <Icon name="octicon:eye" style="font-size: 14px"/>
            <span style="margin-left: 5px">{{ article.seeNumber }}</span>
          </div>
        </el-space>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  color: #000000;
  font-size: 14px;
  line-height: 24px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  .pinned {
    line-height: 1.6;
    font-size: 12px;
    color: #fff;
    padding: 0 8px;
    background: linear-gradient(90deg,#409EFF 0, rgba(64, 158, 255, 0.76));
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 3px;
    margin-right: 5px;
  }

  &:nth-last-child(1) {
    border-bottom: 0px solid transparent;
  }

  &:hover {
    background-color: rgba(245, 245, 245, 0.51);
  }
}

.van-cell--clickable {
  cursor: pointer;
}

.van-cell__title, .van-cell__value {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    display: flex;
    flex-direction: column;

    .bomaos-ellipsis {
      span{
        font-weight: 600;
        font-size: 18px;
      }
    }
  }
}

.van-cell__label {
  margin-top: 0px;
  color: #707070;
  font-size: 12px;
  line-height: 18px;
}

.van-cell__value {
  position: relative;
  overflow: hidden;
  color: #707070;
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}

.van-icon {
  position: relative;
  display: inline-block;
  font: 14px/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.van-cell__left-icon, .van-cell__right-icon {
  height: 24px;
  font-size: 16px;
  line-height: 24px;
}

.van-cell__right-icon {
  margin-left: 4px;
  color: #969799;
}

.play-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  color: #ffffffc4;
}


</style>