<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from "~/stores/authStore";
import type {FormInstance, FormRules} from "element-plus";
import type {EmailParam, LoginParam} from "~/api/member/member/model";
import {login, sendEmailCode} from "~/api/member/member";
import {useMemberStore} from "~/stores/member";

const emit = defineEmits<{
  (e: 'done', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
}>();

const hide = ref(false);

/* 更新visible */
const updateVisible = (value: boolean) => {
  if (!value) {
    hide.value = true;
  }
  emit('done', value);
};

//
const formRef = ref<FormInstance | null>(null);

// 加载状态
const loading = ref<boolean>(false);

// 表单数据
const {form, resetFields} = useFormData<LoginParam>({
  email: '',
  code: '',
  remember: true
});

// 表单验证规则
const rules = reactive<FormRules<LoginParam>>({
  email: [
    {
      required: true,
      message: '请输入邮箱号码',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
});

// 发送验证码按钮loading
const codeLoading = ref(false);

// 验证码倒计时时间
const countdownTime = ref(0);

// 验证码倒计时定时器
let countdownTimer: number | null = null;

const emailParam = ref<EmailParam>({
  sendType: 'login',
  email: undefined
})

/* 发送短信验证码 */
const sendCode = () => {
  if (!form.email) {
    ElMessage.error('请输入邮箱号码')
    return;
  }
  emailParam.value.email = form.email;
  codeLoading.value = true;
  sendEmailCode(emailParam.value).then(() => {
    ElMessage.success('验证码发送成功、请注意查收!')
    countdownTime.value = 30;
    // 开始对按钮进行倒计时
    countdownTimer = window.setInterval(() => {
      if (countdownTime.value <= 1) {
        countdownTimer && clearInterval(countdownTimer);
        countdownTimer = null;
        codeLoading.value = false;
      }
      countdownTime.value--;
    }, 1000);
  }).catch((error) => {
    ElMessage.error(error.message)
    codeLoading.value = false;
  })
};

onBeforeUnmount(() => {
  countdownTimer && clearInterval(countdownTimer);
});

const authStore = useAuthStore();

/* 跳转到首页 */
const goHome = () => {
  navigateTo(authStore.redirectTo)
  emit('done', false);
};

const memberStore = useMemberStore();
/* 提交 */
const submit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value?.validate().then(() => {
    loading.value = true;
    login(form)
        .then((msg) => {
          ElMessage.success(msg)
          loading.value = false;
          memberStore.fetchMemberInfo();
          goHome();
        })
        .catch((e) => {
          ElMessage.error(e.message)
          loading.value = false;
        });
  });
};

watch(() => props.visible, (visible) => {
  if (!visible) {
    resetFields();
  }
})
</script>

<template>
  <transition name="fade-login-y" mode="out-in">
    <div v-if="visible" class="bomaos-login">
      <div class="loginContent">
        <div class="m-left">
          <div class="image">
            <el-image style="width: 100%; height: 100%;" src="/assets/images/login_banner.jpg" fit="cover" />
          </div>
        </div>
        <div class="m-right">
          <div class="logo">
            <div class="bomaos-logo" style="letter-spacing: 0.2px;">
              <span>鱼七博客</span>
            </div>
          </div>
          <el-divider>快捷登录</el-divider>
          <div class="loginForm">
            <el-form
                label-position="top"
                size="large"
                ref="formRef"
                :model="form"
                :rules="rules"
                class="login-form bomao-bg-white"
            >
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱号码">
                  <template #prefix>
                    <Icon name="ic:round-mail-outline"/>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <div class="login-input-group">
                  <el-input v-model="form.code" placeholder="请输入验证码">
                    <template #prefix>
                      <Icon name="mingcute:safety-certificate-line"/>
                    </template>
                  </el-input>
                  <el-button
                      class="login-captcha"
                      :loading="codeLoading"
                      :disabled="codeLoading"
                      @click="sendCode"
                  >
                    <span v-if="!countdownTime">发送验证码</span>
                    <span v-else>已发送 {{ countdownTime }} s</span>
                  </el-button>
                </div>
              </el-form-item>
              <el-button
                  size="large"
                  type="primary"
                  :loading="loading"
                  @click="submit"
                  style="background: #333d49; border-color: #333d49; width: 100%"
              >
                登录
              </el-button>
            </el-form>
          </div>
        </div>
        <div class="out" @click="updateVisible(false)">
          <svg class="iconfont icon-guanbi5" viewBox="0 0 1032 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
            <path d="M510.952547 0c-282.190917 0-510.952547 228.761631-510.952547 510.952547 0 282.19296 228.761631 510.952547 510.952547 510.952547 282.19296 0 510.952547-228.759587 510.952547-510.952547C1021.905095 228.761631 793.143464 0 510.952547 0zM730.067394 663.829549c18.292101 18.292101 18.292101 47.947787 0 66.239888-18.292101 18.292101-47.947787 18.292101-66.239888 0l-152.877002-152.877002-152.877002 152.877002c-18.292101 18.292101-47.947787 18.292101-66.239888 0-18.292101-18.292101-18.292101-47.947787 0-66.239888l152.877002-152.877002-152.877002-152.877002c-18.292101-18.292101-18.292101-47.947787 0-66.239888 18.292101-18.292101 47.947787-18.292101 66.239888 0l152.877002 152.877002 152.877002-152.877002c18.292101-18.292101 47.947787-18.292101 66.239888 0 18.292101 18.292101 18.292101 47.947787 0 66.239888l-152.877002 152.877002L730.067394 663.829549z" fill="#272635"></path>
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
.bomaos-login {
  align-items: center;
  animation: show .3s ease-in-out;
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  background-color: #0009;
  display: flex;
  font-size: 30px;
  height: 100vh;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;

  .loginContent {
    animation: loginContentshow .3s ease-in-out;
    border-radius: 10px;
    box-shadow: 0 0 20px #0000002e;
    display: flex;
    height: 380px;
    position: relative;

    .m-left {
      border-radius: 10px 0 0 10px;
      height: 100%;
      width: 370px;

      .image {
        border-radius: 10px 0 0 10px;
        height: 100%;
        overflow: hidden;
        width: 100%;
      }
    }

    .m-right {
      -webkit-backdrop-filter: blur(30px);
      backdrop-filter: blur(30px);
      background-color: #fff;
      background: #fff;
      border-radius: 0 10px 10px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      padding: 25px 30px;
      width: 270px;

      .logo {
        align-items: center;
        display: flex;
        height: 50px;
        justify-content: center;
        position: relative;
        width: 100%;

        .bomaos-logo {
          position: relative;
          font-weight:700;
          line-height:39px;
          overflow:hidden;
          margin:0;
        }

        .bomaos-logo {
          height: 100%;
          font-size: 25px;
          font-weight: bold;
          color: #131313;
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

          span, img {
            vertical-align: middle;
          }
        }
      }

      .title {
        align-items: center;
        display: flex;
        height: 50px;
        justify-content: center;
        width: 100%;

        p {
          color: #c3c3c3;
          font-size: 26px;
          transform: scale(.6);
        }
      }

      .loginForm {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;

        .Form {
          align-items: center;
          display: flex;
          height: 50px;
          justify-content: center;
          margin-bottom: 20px;
          position: relative;
          width: 100%;

          input {
            border: 1px solid #eee;
            border-radius: 8px;
            color: #666;
            font-size: 18px;
            height: 100%;
            outline: none;
            padding: 15px 10px 10px;
            transition: all .3s ease-in-out;
            width: 100%;
          }

          .name {
            background-color: #fff;
            border-radius: 8px;
            color: #999;
            font-size: 15px;
            left: 20px;
            padding: 2px 7px;
            position: absolute;
            top: -12px;
            transition: all .3s ease-in-out;
          }

          .el-button {
            background-color: #333d49;
            border: none;
            border: 0 solid #3f51b5;
            border-radius: 8px;
            color: #666;
            color: #fff;
            font-size: 18px;
            height: 100%;
            outline: none;
            padding: 10px;
            transition: all .3s ease-in-out;
            width: 100%;
          }
        }

        .Yanzhengma {
          align-items: center;
          display: flex;
          height: 50px;
          justify-content: center;
          margin-bottom: 20px;
          position: relative;
          width: 100%;

          input {
            margin-right: 20px;
            width: 70% !important;
          }
        }

        .btn {
          margin-bottom: 10px;
        }


        .text {
          align-items: center;
          display: flex;
          height: 20px;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 0 2px;
          width: 100%;

          .right {
            color: #999;
            cursor: pointer;
            font-size: 13px;

            span {
              color: #3f51b5;
            }
          }
        }
      }
    }

    .out {
      align-items: center;
      background-color: #ebebeb;
      border: 2px solid #fff;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      height: 30px;
      justify-content: center;
      position: absolute;
      right: -8px;
      top: -8px;
      width: 30px;

      .iconfont {
        color: #4a4a4a;
        font-size: 26px;
        padding: 0 0 1px 1px;
        pointer-events: none;
        transition: all .2s;
      }
    }

  }
}

/* fade-slide */
.fade-login-y-enter-active {
  transition: all 0.2s ease;
}

.fade-login-y-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-login-y-enter-from,
.fade-login-y-leave-to {
  opacity: 0;
}

@keyframes loginContentshow {
  0% {
    opacity: 0;
    transform: translateY(-10%)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
}

@keyframes show {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes hide {
  0% {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

@keyframes searchLights {
  0% { left: -90px; top: 0; }
  to { left: 90px; top: 0; }
}

/* 验证码 */
.login-input-group {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  flex-direction: row;

  :deep(.ant-input-affix-wrapper) {
    flex: 1;
  }

  .login-captcha {
    height: 40px;
    padding: 0 10px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>