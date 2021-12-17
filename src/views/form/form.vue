<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-09 10:03:01
 * @LastEditTime: 2021-11-24 17:58:01
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\form\form.vue
-->
<template>
  <section class="pa_20 background_f">
    <sx-form
      :layout="layout"
      ref="formRef"
      :formValue="formValue"
      :rules="ruleData"
      :formData="formData"
    >
      <template v-slot:cabin="{ data }">{{ data.prop }}</template>
    </sx-form>
    <el-button type="primary" @click="submit">测试提交</el-button>
  </section>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import config from './config';
export default {
    data() {
        return {
            'tableData': [
                {
                    'date': '2016-05-03',
                    'name': 'Tom',
                    'address': 'No. 189, Grove St, Los Angeles'
                },
                {
                    'date': '2016-05-02',
                    'name': 'Tom',
                    'address': 'No. 189, Grove St, Los Angeles'
                },
                {
                    'date': '2016-05-04',
                    'name': 'Tom',
                    'address': 'No. 189, Grove St, Los Angeles'
                },
                {
                    'date': '2016-05-01',
                    'name': 'Tom',
                    'address': 'No. 189, Grove St, Los Angeles'
                }
            ]
        };
    },
    setup() {
        const layout = reactive({
            'labelWidth': '120px',
            'gutter': 10,
            'size': 'large'
        });
        let value1 = ref(''),
            formData = reactive(config.formData),
            ruleData = reactive(config.ruleData),
            formValue = reactive({
                'appendIcon': '',
                'suffixIcon': '',
                'text': '测试测试测试',
                'number': 222,
                'timePicker': [],
                'timeSelect': ''
            });
        const formRef = ref<any>(null),
            submit = () => {
                formRef.value.changeRuleFormVal({
                    'prop': 'UserName',
                    'value': '变更'
                });
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
