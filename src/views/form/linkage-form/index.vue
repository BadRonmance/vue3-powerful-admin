<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-25 09:36:13
 * @LastEditTime: 2021-12-03 11:41:09
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\form\linkage-form\index.vue
-->
<template>
  <section>
    <section class="pa_20 background_f">
      <h3>表单操作</h3>
      <p class="color_9 fon_14">
        在场景过于复杂时，可提供对应的方法进行表单的操作
      </p>
    </section>
    <section class="pa_20 background_f margin_top_20 flex">
      <div class="form flex-grow-0">
        <sx-form
          :layout="layout"
          ref="formRef"
          :formValue="formValue"
          :rules="ruleData"
          :formData="formData"
        >
          <template v-slot:cabin>
            <div class="fon_14">
              <p>整段插槽注入</p>
              <p class="color_6">
                可以在表单内插入自定义组件或者文本,根据业务自行处理,以达到形成一个完整表单的目的
              </p>
              <p class="color_6">注：插槽和表单的交互请看下一节《表单联动》</p>
            </div>
          </template>
          <template v-slot:formItemSlot
            >局部插槽注入（使用json配置label部分，内容区域为自定义）</template
          >
        </sx-form>
        <el-button type="primary" size="small" @click="submit"
          >表单校验</el-button
        >
        <el-button type="primary" size="small" @click="setFormVal"
          >表单赋值</el-button
        >
        <el-button type="primary" size="small" @click="editFormData"
          >表单数据修改</el-button
        >
        <el-button type="primary" size="small" @click="controlFormData"
          >数据显隐</el-button
        >
        <el-button type="primary" size="small" plain>表单联动</el-button>
      </div>
      <div class="flex-grow-1 padding_left_20">
        <section>
          <h5>操作</h5>
          <el-button type="primary" size="small">查看JSON</el-button>
        </section>
        <section>
          <h5>修改表单数据</h5>
          <el-button type="primary" size="small">修改Data</el-button>
        </section>
        <section>
          <h5>表单赋值</h5>
          <el-button type="primary" size="small">查看JSON</el-button>
        </section>
        <section>
          <h5>其余操作</h5>
          <el-button type="primary" size="small">表单提交</el-button>
          <el-button type="primary" size="small">表单重置</el-button>
        </section>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { deepcopy } from '../../../libs/utils/function';
import config from '../config';
export default {
    'name': 'linkageForm',
    data() {
        return {};
    },
    setup() {
        const layout = reactive(config.layout),
            formRef = ref<any>(null);
        let formData = reactive(deepcopy(config.formData)),
            ruleData = reactive(deepcopy(config.ruleData)),
            formValue: any = reactive(deepcopy(config.formValue)),
            changeFormVal = reactive(deepcopy(config.changeFormVal));
        const submit = () => {
                formRef.value.submitForm();
            },
            setFormVal = () => {
                for (let i in changeFormVal) {
                    formValue[i] = changeFormVal[i];
                }
            },
            editFormData = () => {},
            controlFormData = () => {};

        return {
            layout,
            formValue,
            formData,
            ruleData,
            formRef,
            submit,
            setFormVal,
            editFormData,
            controlFormData
        };
    }
};
</script>
<style>
.form {
  width: 500px;
  margin: 0 auto;
}
</style>
