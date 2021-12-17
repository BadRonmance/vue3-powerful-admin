<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-25 09:36:13
 * @LastEditTime: 2021-11-29 09:10:29
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\form\advanced-form\index.vue
-->
<template>
  <section>
    <section class="pa_20 background_f">
      <h3>高级表单</h3>
      <p class="color_9 fon_14">
        当一次性提交大量数据时且数据类型过于复杂时，可使用高级表单。
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
        <el-button type="primary" size="small" @click="submit">提交</el-button>
        <el-button type="primary" size="small" plain>取消</el-button>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { deepcopy } from '../../../libs/utils/function';
import config from '../config';
export default {
    'name': 'advancedForm',
    data() {
        return {};
    },
    setup() {
        const layout = reactive(config.layout),
            formRef = ref<any>(null);
        let formData = reactive(deepcopy(config.formData)),
            ruleData = reactive(deepcopy(config.ruleData)),
            formValue: any = reactive(deepcopy(config.formValue));
        const submit = () => {
            formRef.value.submitForm();
        };

        return {
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
