<!--
 * @Description: 表单设计器入口
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-16 10:00:13
 * @LastEditTime: 2021-12-14 15:43:53
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\components\form\src\index.vue
-->
<template>
  <el-form
    ref="uploadFormRef"
    :model="ruleForm"
    :rules="uploadFormRules"
    :label-width="layout.labelWidth"
  >
    <el-row type="flex" :gutter="layout.gutter">
      <el-col
        :span="col.span || layout.span"
        :push="col.push || 0"
        :offset="col.offset || 0"
        v-show="setColStatus(col)"
        v-for="(col, colIndex) in formData"
        :key="`col-${colIndex}-${col.prop}`"
      >
        <template v-if="col.formType === 'slot'">
          <!-- 整段表单为插槽注入 -->
          <slot :name="col.prop" :data="col"></slot>
        </template>
        <el-form-item :label="col.label" :prop="col.prop" v-else>
          <template v-if="col.formType === 'formItemSlot'">
            <!-- 表单内容为插槽注入 -->
            <slot :name="col.prop" :data="col"></slot>
          </template>
          <template v-else>
            <!-- 正常表单内容 -->
            <sx-form-item
              :size="layout.size"
              :value="ruleForm[col.prop]"
              :data="col"
              @change="handleChangeFormItem"
            ></sx-form-item>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { ref, PropType,defineComponent, reactive } from "vue";
import { initDate } from "../../../libs/utils/date";
import { dataType } from "../../../libs/utils/function";
import { setDefaultFormVal } from "../../../hooks/form";
import type { FormItem,Layout,Rule } from "@/types/form";
import { reactify } from "@vueuse/core";

/**
 * 表单设计器介绍
 * 1、表单栅格化布局
 * 2、支持表单校验、数据重置、数据提交
 * 3、支持手动从外部变更表单数据
 * 4、支持插槽注入
 * 5、支持常用表单组件
 * 6、支持表单联动（已删除）
 * 7、支持数据控制（待实现）
 */
export default defineComponent({
  props: {
    formData: {
      type: Array as PropType<FormItem[]>,
      required: true,
    },
    layout: {
      type: Object as PropType<Layout>,
      default: () => ({}),
    },
    formValue: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object as PropType<Rule>,
      default: () => {},
    },
  },
  setup(props) {
    const uploadFormRef = ref(),
      uploadFormRules = ref(props.rules);
    let ruleForm: any = reactive(props.formValue),
      formData: any = ref(props.formData);
    // 设置表单数据的显隐
    const setColStatus = (e: any) => {
        return e.show === undefined ? true : e.show;
      },
      /**
       * @description: 表单初始化，将存在联动的数据分离并进行二次处理
       * @version: 1.0.0
       * @author: 天生不是宠儿
       * @Date: 2021-11-24 17:22:13
       */
      init = () => {
        formData.value.map((item: any) => {
          // 如果formValue 值不存在 则创建对应的值
          if (ruleForm[item.prop] === undefined) {
            ruleForm[item.prop] = setDefaultFormVal(item);
          }
        });
      };

    init();
    /**
     * @description: 表单外侧ICON点击事件
     * @version: 1.0.0
     * @author: 天生不是宠儿
     * @Date: 2021-11-24 17:22:20
     */
    const handlerOutSideIcon = (data: object, index: number) => {},
      /**
       * @description: 表单内容变更事件
       * @version: 1.0.0
       * @author: 天生不是宠儿
       * @Date: 2021-11-24 17:22:04
       */
      handleChangeFormItem = (e: any) => {
        ruleForm[e.prop] = e.value;
        
      },
      /**
       * @description: 手动变更表单内容
       * @version: 1.0.0
       * @author: 天生不是宠儿
       * @Date: 2021-11-24 17:21:56
       */
      changeRuleFormVal = (e: { prop: string; value: any }) => {
        ruleForm[e.prop] = e.value;
      },
      // 数据转换
      handleChangeTime = (formType: string, event: any) => {
        if (
          ["timeSelect", "timePicker", "datePicker"].includes(formType) &&
          dataType(event) === "Array"
        ) {
          event[0] = initDate(event[0], "YYYY-MM-DD HH:MM:SS");
          event[1] = initDate(event[1], "YYYY-MM-DD") + " 23:59:59";
        }
        return event;
      },
      /**
       * @description: 手动变更表单源数据
       * @version: 1.0.0
       * @author: 天生不是宠儿
       * @Date: 2021-11-24 17:21:45
       */
      changeFormDataItem = (e: { key: string; value: any; prop: string }) => {
        let index = formData.value.findIndex(
          (item: any) => item.prop === e.prop
        );

        if (index === -1) {
          console.error(`${e.prop}不存在`);
          return;
        }
        formData.value[index][e.key] = e.value;
      },
      /**
       * @description: 动态控制表单数据的显示与否
       * @version: 1.0.0
       * @author: 天生不是宠儿
       * @Date: 2021-11-24 17:22:28
       */
      dynamicControlFormData = () => {},
      /**
       * @description: 表单联动
       * @version: 1.0.0
       * @author: 天生不是宠儿
       * @Date: 2021-11-24 17:23:29
       */
      contoralData = () => {},
      // 重置表单
      resetForm = () => {},
      // 表单提交
      submitForm = () => {
        uploadFormRef.value.validate((valid: any) => {
          if (valid) {
          } else {
            return false;
          }
        });
      };

    return {
      submitForm,
      ruleForm,
      formData,
      setColStatus,
      resetForm,
      contoralData,
      handlerOutSideIcon,
      handleChangeFormItem,
      changeRuleFormVal,
      uploadFormRules,
      uploadFormRef,
    };
  },
});
</script>
