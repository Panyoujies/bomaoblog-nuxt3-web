import {reactive} from "vue";

/**
 * 表单数据 hook
 * @param initValue 默认值
 */
export default function <T extends object>(initValue?: T) {
  const form = reactive<T>({ ...initValue } as T);

  const resetFields = () => {
    Object.keys(form).forEach((key) => {
      // @ts-ignore
      form[key] = initValue ? initValue[key] : void 0;
    });
  };

  const assignFields = (data: object) => {
    Object.keys(form).forEach((key) => {
      // @ts-ignore
      form[key] = data[key];
    });
  };

  return {
    form,
    // 重置为初始值
    resetFields,
    // 赋值不改变字段
    assignFields
  };
}
