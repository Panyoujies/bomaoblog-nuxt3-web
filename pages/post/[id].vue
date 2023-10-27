<script setup lang="ts">
import {getArticle} from "@/api/content/article";
import {useRoute} from "vue-router";
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import '~/assets/lib/style.less';
import 'katex/dist/katex.min.css';
import '~/assets/lib/tailwind.css';
import '~/assets/lib/highlight.less';
import '~/assets/lib/github-markdown.less';
import {copyToClip} from "@/utils/copy";
import {computed, onMounted, ref} from "vue";
// 1. 引入css
import '~/plugins/xgplayer/payTip/index.css'
import 'xgplayer/dist/index.min.css'
import 'xgplayer/es/plugins/danmu/index.css'
import PresetPlayer from "xgplayer";
import type {Article} from "~/api/content/article/model";
import type {CommentDto, CommentParam} from "~/api/content/comment/model";
import {pageComments} from "~/api/content/comment";

// 视频组件
let player: PresetPlayer | null = null;

const { params } = useRoute();
const article = ref<Article>({});
const loading = ref(false);
const textRef = ref<HTMLElement | null>(null);

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

const text = computed(() => {
  const value = article.value.content ?? ''
  return mdi.render(value)
})

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

function addCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.parentElement?.nextElementSibling?.textContent
        if (code) {
          copyToClip(code).then(() => {
            btn.textContent = '复制成功'
            setTimeout(() => {
              btn.textContent = '复制代码'
            }, 1000)
          })
        }
      })
    })
  }
}

function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.removeEventListener('click', () => {})
    })
  }
}

onMounted(() => {
  addCopyEvents()
})

onUpdated(() => {
  addCopyEvents()
})

onUnmounted(() => {
  removeCopyEvents()
})


/* 评论组件数据加载star */

/**
 * 提交的附加内容
 */
const commentParams = reactive<CommentParam>({
  page: 1,
  limit: 5
});

const commentList = ref<CommentDto[]>([]);
const commentLoading = ref(false);
const disabled = ref(false);
const page = ref<number>(0)

const handleInfiniteOnLoad = () => {
  page.value++;
  commentPage(commentParams.limit, page.value);
};

/**
 * 用户添加完成后刷新工单列表
 */
const reload = () => {
  commentList.value = [];
  page.value = 0;
  commentPage();
}

/**
 * 刷新工单数据
 */

const state = ref(true);
const commentPage = async (limit?: number, page?: number) => {
  commentLoading.value = true;
  await nextTick(() => {
    pageComments({limit, page, articleId: article.value.id}).then((res) => {
      if (res?.count === 0) {
        state.value = true;
        return;
      }
      state.value = false;
      commentLoading.value = false;
      commentList.value.push(...(res?.list as CommentDto[]));
      if (commentList.value.length >= (res?.count as number)) {
        disabled.value = true;
      }
    })
  })
}

/* 初始化数据 */
onMounted(() => {
  page.value = 0;
  handleInfiniteOnLoad();
})

/* 评论组件数据加载end*/

/**
 * 获取文章内容
 * @param id
 */
await useAsyncData("read_article", async () => getArticle(params.id as unknown as number)).then((res) => {
  article.value = res.data.value as Article;
})

onMounted(async () => {
  const [Player, Mp4Plugin, Danmu] = await Promise.all([
    import('xgplayer'),
    import("xgplayer-mp4"),
    import('xgplayer/es/plugins/danmu')
  ])
  if (article.value.isVideo === 1) {
    player = new Player.default({
      id: 'video',
      controls: {
        autoHide: true
      },
      fluid: true,
      autoplay: false,
      volume: 0.3,
      url: article.value?.videoUrl,
      poster: article.value.videoCover,
      playsinline: true,
      height: '100%',
      width: '100%',
      plugins: [Danmu.default],
      danmu: {
        comments: [
          {
            duration: 15000,
            id: '1',
            start: 3000,
            txt: '好看，精彩！！！',
            //弹幕自定义样式
            style: {
              color: '#ff9500',
              fontSize: '20px',
              border: 'solid 1px #ff9500',
              borderRadius: '50px',
              padding: '5px 11px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }
        ],
        area: {
          start: 0,
          end: 1
        }
      }
    })
  }
})

definePageMeta({
  key: route => route.fullPath
})

useHead({
  title: computed(() => {
    if (article.value.id && article.value.title) {
      return article.value.title
    } else {
      return '404'
    }
  }),
  titleTemplate: (title) => `${title} - 鱼七博客`,
  meta: [
    { name: 'Keywords', content: computed(() => {
        if (article.value.id && article.value.title) {
          return '鱼七博客,' + article.value.title + ',教程'
        } else {
          return '404'
        }
      })},
    { name: 'description', content: computed(() => {
        if (article.value.id) {
          return article.value.summary ?? '致力于分享前后端教程'
        } else {
          return '404'
        }
      })
    },
    {
      name: 'referrer', content: 'no-referrer'
    }
  ],
})
</script>

<template>
  <div class="container">
    <div class="yuqi-layout">
      <div style="min-height: calc(100vh - 168px);">
        <el-row style="row-gap: 15px;" :gutter="15">
          <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
            <el-card
                v-if="article.isVideo == 1"
                class="bomaos-card"
                style="margin-bottom: 15px; min-height: auto"
            >
              <div style="min-height: 312px; background-color: #eaeaea">
                <div id="video"></div>
              </div>
            </el-card>
            <el-card class="bomaos-card" :body-style="{ padding: '20px' }">
              <div class="header">
                <span class="title">{{ article.title }}</span>
                <div style="margin-top: 5px; color: #666; font-size: 15px">
                  <el-space wrap>
                    <div>{{ article.createTime }}</div>
                    <van-divider vertical style="margin: 0" :hairline="false"/>
                    <div style="display: flex; align-items: center;">
                      <Icon name="octicon:eye" style="font-size: 15px"/>
                      <span style="margin-left: 5px">{{ article.seeNumber }}</span>
                    </div>
                  </el-space>
                </div>
              </div>
              <div ref="textRef">
                <div class="markdown-body" v-html="text"></div>
              </div>
            </el-card>
            <div class="comment">
              <el-card class="bomaos-card" :body-style="{ padding: '5px 20px 20px 20px' }">
                <template #header>
                  <div style="display: flex; align-items: flex-end; margin-bottom: 20px">
                    <h2 style="line-height: 1.1; margin-right: 10px">评论</h2>
                    <span style="color: #666666">Comment</span>
                  </div>
                  <!-- 评论组件 -->
                  <comment-submit :article-id="article.id" @done="reload"/>
                </template>
                <div>
                  <el-empty v-if="state" description="暂无评论" :image-size="70"/>
                  <div v-else>
                    <comment-item v-for="item in commentList" :key="item.commentId" :comment="item"/>
                    <div v-if="!state" style="padding-top: 20px; display: flex; justify-content: center;">
                      <el-button link :loading="commentLoading" :disabled="disabled" @click="handleInfiniteOnLoad">{{ disabled ? '加载完成' : '加载更多' }}</el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
            <!-- 相关推荐 -->
            <common-hot-post />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
:deep(.el-card__header) {
  padding: 20px;
}

:deep(.xgplayer .xgplayer-poster) {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50%;
}

.comment {
  margin-top: 15px;
}

.bomaos-card {

  .header {
    margin-bottom: 30px;

    .title {
      font-size: 25px;
      font-weight: bold;
    }

  }
}
</style>