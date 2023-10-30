<template>
  <el-drawer
      :model-value="props.visible"
      title="登录/注册"
      direction="btt"
      size="auto"
      :before-close="updateVisible"
  >
    <div class="login-wrapper">
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
  </el-drawer>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import {login, sendEmailCode} from '@/api/member/member';
import type {EmailParam, LoginParam} from "@/api/member/member/model";
import {useAuthStore} from "~/stores/authStore";
import {useMemberStore} from "~/stores/member";
import type {FormInstance, FormRules} from "element-plus";
const { $isMobile } = useNuxtApp();

const emit = defineEmits<{
  (e: 'done', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
}>();

const updateVisible = (done: () => void) => {
  emit('done', false);
}

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
    ElMessage.error('请输入邮箱号码');
    return;
  }
  emailParam.value.email = form.email;
  codeLoading.value = true;
  sendEmailCode(emailParam.value).then(() => {
    ElMessage.success('验证码发送成功!');
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
    ElMessage.error(error.message);
    codeLoading.value = false;
  })
};

onBeforeUnmount(() => {
  countdownTimer && clearInterval(countdownTimer);
});

const memberStore = useMemberStore();
const authStore = useAuthStore();

/* 跳转到首页 */
const goHome = () => {
  navigateTo(authStore.redirectTo)
  emit('done', false);
};

/* 提交 */
const submit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value?.validate().then(() => {
    loading.value = true;
    login(form)
        .then((msg) => {
          ElMessage.success(msg);
          memberStore.fetchMemberInfo();
          goHome();
        })
        .catch((e) => {
          ElMessage.error(e.message);
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

<style scoped lang="less">
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

.bomaos-text-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  div {
    font-size: 16px;
  }

  .login-oauth-icon {
    color: #fff;
    padding: 6px;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
}


</style>