<!--
 * @Description: 基础表单
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-25 09:35:59
 * @LastEditTime: 2021-12-03 11:40:48
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\form\basic-form\index.vue
-->
<template>
  <section>
    <section class="pa_20 background_f">
      <h3>基础表单</h3>
      <p class="color_9 fon_14">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
      </p>
    </section>
    <section class="pa_20 background_f margin_top_20">
      <div class="form">
        <sx-form
          :layout="layout"
          ref="formRef"
          :formValue="formValue"
          :rules="ruleData"
          :formData="formData"
        ></sx-form>
        <div class="t_c">
          <el-button type="primary" size="small" @click="submit"
            >提交</el-button
          >
          <el-button type="primary" size="small" plain>取消</el-button>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import config from '../config';
export default {
    'name': 'basicForm',
    data() {
        return {};
    },
    setup() {
        const layout = reactive({
            'labelWidth': '130px',
            'gutter': 10,
            'size': 'large'
        });
        let value1 = ref(''),
            formData = reactive(config.basicFormData),
            ruleData = reactive(config.ruleData),
            formValue = reactive({
                'appendIcon': '',
                'suffixIcon': '',
                'text': '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。',
                'number': 0,
                'timePicker': [],
                'timeSelect': ''
            });
        const formRef = ref<any>(null),
            submit = () => {
                //   formRef.value.changeRuleFormVal({
                //     prop: "UserName",
                //     value: "变更",
                //   });
                formRef.value.submitForm();
            };

        return {
            value1,
            layout,
            formValue,
            formData,
            ruleData,
            formRef,
            submit
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
