<script lang="ts" setup>
import type {CommentDto} from "~/api/content/comment/model";
const dayjs = useDayjs();

const props = defineProps<{
  comment?: CommentDto;
}>();

function isQQEmail(email: string): boolean {
  return email.endsWith("@qq.com");
}

const qqAvatar = 'http://q2.qlogo.cn/headimg_dl?dst_uin=' + (props.comment?.member?.email as string).split("@")[0] + '&spec=100';
</script>

<template>
  <div class="comment-item">
    <div class="comment-card default">
      <div class="comment-avatar">
        <div class="popover-box user-popover">
          <nuxt-link to="/user/536217406158941" target="_blank">
            <div class="avatar jj-avatar avatar">
              <img
                  :alt="comment?.member?.nickName"
                  class="lazy avatar-img"
                  :src="comment?.member?.avatar ?? isQQEmail(props.comment?.member?.email as string) ? qqAvatar : '/assets/images/avatar.png'"
              >
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="comment-wrapper">
        <div class="comment-header">
          <div class="popover-box user-popover">
            <nuxt-link class="username" to="/user/KG21Area" target="_blank">
              <span class="name" style="max-width: 300px;">{{ comment.member.nickName }}</span>
            </nuxt-link>
          </div>
          <div class="author-intro" v-if="comment?.member?.introduction">
            {{ comment.member.introduction }}
          </div>
<!--          <div style="flex: 1 1 0%;"></div>
          <div style="display: flex; flex-shrink: 0; flex-grow: 0;">
            <img class="lazy hot-icon" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51b98a0c69a34689b8ca2c10dd66156d~tplv-k3u1fbpfcp-image.image#?w=43&amp;h=20&amp;s=6724&amp;e=svg&amp;a=1&amp;b=f36937">
          </div>-->
        </div>
        <div class="comment-content">
          <div class="content">
            <van-text-ellipsis
                rows="4"
                :content="comment?.content as string"
                expand-text="展开"
                collapse-text="收起"
            />
          </div>
        </div>
        <div class="comment-action">
          <time class="action-time" datetime="1680764523000" :title="comment?.createTime">
            {{ dayjs(comment.createTime).fromNow() }}
          </time>
          <div class="action-digg">
            <svg class="icon" fill="none" height="14" viewBox="0 0 16 16" width="14" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M8.56162 2.16952C8.66569 2.09661 8.78195 2.06124 8.88247 2.0912C8.97653 2.11923 9.23851 2.25916 9.50988 2.96799C9.64419 3.31881 9.9356 4.2424 9.42155 6.05431C9.29751 6.49152 9.61394 6.95303 10.0926 6.95971L13.492 7.00716L13.492 7.00721H13.4991C13.6049 7.00721 13.7228 7.01986 13.8134 7.05898C13.8544 7.07671 13.8815 7.09639 13.8999 7.116C13.9166 7.13375 13.9368 7.16247 13.9515 7.21636C13.9848 7.33784 14.0228 7.74712 13.9473 8.42262C13.874 9.07857 13.698 9.94479 13.341 10.9598C13.0424 11.8088 12.6601 12.5292 12.0684 13.4879C12.0558 13.5052 12.0462 13.5197 12.0418 13.5265L12.0404 13.5285C12.0292 13.5454 12.0242 13.5531 12.018 13.5618C12.0076 13.5764 12.0018 13.582 11.9983 13.585C11.996 13.587 11.9908 13.5912 11.9777 13.5959C11.9638 13.6009 11.9311 13.61 11.8706 13.61H5.56278L5.56373 6.58489C5.87126 6.41901 6.19881 6.20128 6.54112 5.84059C6.93883 5.42152 7.33789 4.8294 7.76254 3.94183C7.84974 3.75957 7.91745 3.55962 7.97574 3.37762C7.99264 3.32486 8.0087 3.27379 8.02438 3.22393L8.02439 3.22389C8.066 3.09158 8.10495 2.96776 8.14985 2.84312C8.2758 2.49352 8.40247 2.28101 8.56162 2.16952ZM10.452 2.60729C10.1323 1.77209 9.70208 1.28277 9.17063 1.12437C8.64564 0.967902 8.20308 1.18891 7.98278 1.34325C7.55169 1.64525 7.33837 2.11908 7.20071 2.5012C7.14817 2.64705 7.10002 2.80016 7.05661 2.93824C7.0422 2.98405 7.02832 3.02821 7.01496 3.0699C6.95791 3.24804 6.90763 3.39115 6.85248 3.50643C6.45683 4.3334 6.1121 4.8271 5.80935 5.14611C5.51322 5.45815 5.23983 5.6219 4.9473 5.76821C4.71095 5.88641 4.55494 6.12906 4.55491 6.40159L4.55388 13.9125C4.55383 14.3026 4.87002 14.6188 5.26008 14.6188H11.8706C12.2097 14.6188 12.4663 14.5113 12.6519 14.3535C12.7387 14.2797 12.7988 14.2043 12.8387 14.1484C12.8556 14.1248 12.8704 14.1025 12.8786 14.09L12.8813 14.0859L12.8826 14.0839L12.8955 14.0685L12.9142 14.0382C13.5304 13.0414 13.9578 12.247 14.2927 11.2945C14.6745 10.209 14.8679 9.26811 14.9499 8.5347C15.0297 7.82084 15.009 7.25845 14.9246 6.95014C14.805 6.51285 14.5104 6.26112 14.2134 6.13284C13.9385 6.01407 13.661 5.99859 13.5028 5.99836L10.4907 5.95631C10.9296 4.15791 10.648 3.11902 10.452 2.60729ZM1.0008 6.46783C0.981809 6.0652 1.30313 5.72836 1.70621 5.72836H2.75264C3.14266 5.72836 3.45883 6.04454 3.45883 6.43456V13.9442C3.45883 14.3342 3.14266 14.6504 2.75264 14.6504H2.06044C1.68335 14.6504 1.37279 14.3541 1.35502 13.9775L1.0008 6.46783Z" fill-rule="evenodd"></path>
            </svg>
            0
          </div>
          <div class="action-reply">
            <svg class="icon" fill="none" height="14" viewBox="0 0 16 16" width="14" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M2.30136 10.1142L2.30019 3.45191C2.30024 2.6778 2.92779 2.05019 3.70191 2.05019H12.3989C13.1731 2.05019 13.8006 2.67785 13.8006 3.452L13.8018 10.1144C13.8017 10.8885 13.1742 11.516 12.4001 11.516H10.1322C9.97329 11.516 9.81862 11.5675 9.69142 11.6629L6.65162 13.9406C6.62173 13.9598 6.58148 13.9444 6.57209 13.91L6.15416 12.0869C6.07758 11.7528 5.78033 11.516 5.43761 11.516H3.70308C2.92893 11.516 2.30136 10.8884 2.30136 10.1142ZM3.70191 1C2.34776 1 1.25 2.09776 1.25 3.45191L1.25117 10.1144C1.25122 11.4685 2.34896 12.5662 3.70308 12.5662H5.18661L5.54953 14.1495L5.55107 14.1558C5.73515 14.9153 6.62879 15.248 7.26458 14.7937L10.2372 12.5662H12.4001C13.7542 12.5662 14.852 11.4684 14.852 10.1142L14.8508 3.45182C14.8508 2.09771 13.753 1 12.3989 1H3.70191ZM4.78612 7.91404C5.35027 7.91404 5.8076 7.45671 5.8076 6.89257C5.8076 6.32842 5.35027 5.87109 4.78612 5.87109C4.22198 5.87109 3.76465 6.32842 3.76465 6.89257C3.76465 7.45671 4.22198 7.91404 4.78612 7.91404ZM8.98631 6.89257C8.98631 7.45671 8.52898 7.91404 7.96483 7.91404C7.40069 7.91404 6.94336 7.45671 6.94336 6.89257C6.94336 6.32842 7.40069 5.87109 7.96483 5.87109C8.52898 5.87109 8.98631 6.32842 8.98631 6.89257ZM11.1484 7.91404C11.7126 7.91404 12.1699 7.45671 12.1699 6.89257C12.1699 6.32842 11.7126 5.87109 11.1484 5.87109C10.5843 5.87109 10.127 6.32842 10.127 6.89257C10.127 7.45671 10.5843 7.91404 11.1484 7.91404Z" fill-rule="evenodd"></path>
            </svg>
            0
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.comment-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  .comment-card {
    display: flex;
    min-width: 0;
    box-sizing: border-box;
    font-style: normal;
    position: relative;

    * {
      box-sizing: border-box;
    }

    &:before {
      content: " ";
      position: absolute;
      pointer-events: none;
      background: transparent;
      top: 0;
      left: -10px;
      right: -10px;
      transition: all .3s;
    }

    .comment-avatar {
      position: relative;
      width: 36px;
      flex-shrink: 0;
      flex-grow: 0;
      margin-right: 16px;

      .avatar {
        width: 36px;
        height: 36px;
      }
    }

    .comment-wrapper {
      position: relative;
      flex: 1;
      min-width: 0;

      .comment-header {
        display: flex;
        align-items: center;
        padding: 1px 0;

        .username {
          color: #515767;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;

          .name[data-v-1800aadb] {
            display: inline-block;
            vertical-align: top;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .author-intro {
          color: #8a919f;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          margin-left: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }

        .hot-icon {
          width: 43px;
          height: 20px;
        }
      }

      .comment-content {
        margin-top: 4px;

        .content {
          color: #252933;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
        }
      }

      .comment-action {
        margin-top: 8px;
        display: flex;
        align-items: center;
        color: #8a919f;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;

        .action-time {
          margin-right: 10px;
          display: flex;
          align-items: center;
        }

        .action-digg, .action-reply {
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all .2s;
          padding: 0 10px;

          .icon {
            margin-right: 4px;
          }

          svg {
            path {
              transition: all .2s;
              fill: currentColor;
            }
          }
        }
        
      }
    }
  }
}

.popover-box {
  display: flex;
  align-items: center;
}

.jj-avatar {
  display: inline-flex;
  position: relative;

  .avatar-img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background-color: #f7f8fa;
  }
}

</style>