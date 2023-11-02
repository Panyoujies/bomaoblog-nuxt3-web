<script setup lang="ts">
import type {FormInstance, FormRules} from "element-plus";
import type {FriendLinks} from "~/api/marketing/friend-links/model";
import {addFriendLinks} from "~/api/marketing/friend-links";

const ruleFormRef = ref<FormInstance>()
const loading = ref(false);

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const handleClose = (done: () => void) => {
  ruleFormRef.value?.resetFields()
  updateVisible(false);
}

const { form, resetFields } = useFormData<FriendLinks>({
  name: '',
  url: '',
  iconUrl: '',
  qq: '',
  description: '',
})

const rules = reactive<FormRules<FriendLinks>>({
  name: [
    {
      required: true,
      message: '请输入网站名称。',
      type: 'string',
      trigger: 'blur'
    }
  ],
  url: [
    {
      required: true,
      message: '请输入网站链接。',
      type: 'string',
      trigger: 'blur'
    }
  ],
  iconUrl: [
    {
      required: true,
      message: '请输入图标链接。',
      type: 'string',
      trigger: 'blur'
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      addFriendLinks(form).then((res) => {
        ElMessage.success(res);
        loading.value = false;
        formEl.resetFields()
        updateVisible(false);
      }).catch((error) => {
        ElMessage.error(error.message);
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-dialog
      :model-value="props.visible"
      title="提交友链"
      width="320px"
      :before-close="handleClose"
  >
    <el-form
        ref="ruleFormRef"
        :model="form"
        status-icon
        :rules="rules"
        label-position="top"
    >
      <el-form-item label="网站名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入网站名称" autocomplete="off" />
      </el-form-item>
      <el-form-item label="网站链接" prop="url">
        <el-input v-model="form.url" placeholder="请输入网站链接" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图标链接" prop="iconUrl">
        <el-input v-model="form.iconUrl" placeholder="请输入图标链接" autocomplete="off" />
      </el-form-item>
      <el-form-item label="站长QQ" prop="qq">
        <el-input v-model="form.qq" placeholder="请输入站长QQ" autocomplete="off" />
      </el-form-item>
      <el-form-item label="网站介绍" prop="description" style="margin-bottom: 0px;">
        <el-input v-model="form.description" type="textarea" :rows="3" placeholder="友情链接介绍" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateVisible(false)">取消</el-button>
        <el-button :loading="loading" type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">

</style>