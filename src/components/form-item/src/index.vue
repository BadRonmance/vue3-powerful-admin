<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-16 10:01:38
 * @LastEditTime: 2021-12-14 15:41:50
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\components\form-item\src\index.vue
-->
<template>
  <template
    v-if="
      itemData.formType === 'inputString' ||
      itemData.formType === 'inputTextarea'
    "
  >
    <el-input
      v-model.trim="formItemValue"
      :type="getInputType(itemData.formType)"
      :disabled="itemData.disabled || false"
      :size="size"
      autosize
      :show-word-limit="itemData.showWordLimit"
      @input="handleChange"
      :placeholder="itemData.placeholder"
      :clearable="itemData.clearable"
      :maxlength="itemData.maxlength || 50"
    >
      <template #suffix v-if="itemData.suffixIcon">
        <sx-icon :iconData="itemData.suffixIcon"></sx-icon>
      </template>
      <template #append v-if="itemData.appendIcon">
        <el-button class="pa_l">
          <sx-icon :iconData="itemData.appendIcon"></sx-icon>
        </el-button>
      </template>
    </el-input>
  </template>
  <template v-if="itemData.formType === 'text'">
    <el-tooltip
      v-if="itemData.toolTip && itemData.toolTip.show"
      :effect="itemData.toolTip.effect"
      :content="formItemValue"
      popper-class="form-item-popper"
      :placement="itemData.toolTip.placement"
    >
      <div :style="itemData.style ? itemData.style || {} : {}">
        {{ setLength(itemData.maxlength, formItemValue) }}
      </div>
    </el-tooltip>
    <div v-else :style="itemData.style ? itemData.style || {} : {}">
      {{ setLength(itemData.maxlength, formItemValue) }}
    </div>
  </template>
  <template v-if="itemData.formType === 'number'">
    <div class="rel">
      <el-input-number
        class="wid"
        type="number"
        v-model.number="formItemValue"
        :disabled="itemData.disabled"
        :clearable="itemData.clearable"
        :size="size"
        @change="handleChange"
        :max="itemData.max || 999999999"
        :min="itemData.min"
        :controls="itemData.controls || false"
        :precision="itemData.precision"
        :placeholder="itemData.placeholder"
      ></el-input-number>
      <!-- 仅作展示的icon -->
      <p class="ab suffixIcon" v-if="data.suffixIcon">
        <sx-icon :iconData="itemData.suffixIcon"></sx-icon>
      </p>
    </div>
  </template>
  <template v-if="itemData.formType === 'select'">
    <el-select
      class="form-item-child"
      v-model="formItemValue"
      :clearable="itemData.clearable"
      :size="size"
      :multiple="itemData.multiple"
      :disabled="itemData.disabled"
      :filterable="itemData.filterable"
      @change="handleChange"
      @clear="clear"
      :popper-append-to-body="true"
      :placeholder="itemData.placeholder"
    >
      <el-option
        v-for="item in itemData.selectData"
        :key="item.value"
        :disabled="item.disabled"
        :label="item.label"
        :value="item.value"
      >
        <span>{{ item.label }}</span>
        <span v-if="item.afterText" :style="{ color: item.afterText.color }">{{
          item.afterText.label
        }}</span>
      </el-option>
    </el-select>
  </template>
  <template v-if="itemData.formType === 'radio'">
    <el-radio-group
      :disabled="itemData.disabled"
      :size="size"
      v-model="formItemValue"
      @change="handleChange"
    >
      <template
        v-for="item in itemData.radioData"
        :key="`${item.label}-${item.value}`"
      >
        <el-radio
          :disabled="item.disabled || false"
          :label="item.value"
          v-show="true"
          >{{ item.label }}</el-radio
        >
      </template>
    </el-radio-group>
  </template>
  <template v-if="itemData.formType === 'timeSelect'">
    <el-time-select
      class="form-item-child"
      :disabled="itemData.disabled"
      :size="size === 'large' ? 'medium' : size"
      :clearable="data.clearable"
      v-model="formItemValue"
      @clear="clear"
      :start="itemData.start"
      :end="itemData.end"
      :min-time="itemData.minTime"
      :max-time="itemData.maxTime"
      :step="itemData.step"
      :placeholder="itemData.placeholder"
      @change="handleChange"
    ></el-time-select>
  </template>
  <template v-if="itemData.formType === 'timePicker'">
    <el-time-picker
      class="form-item-child"
      :disabled="itemData.disabled"
      :is-range="itemData.isRange"
      :size="size"
      :clearable="itemData.clearable"
      v-model="formItemValue"
      :range-separator="itemData.rangeSeparator"
      :start-placeholder="itemData.startPlaceholder"
      :end-placeholder="itemData.endPlaceholder"
      :placeholder="itemData.placeholder"
      @change="handleChange"
    ></el-time-picker>
  </template>
  <template v-if="itemData.formType === 'datePicker'">
    <el-date-picker
      class="form-item-child"
      :disabled="itemData.disabled"
      :clearable="itemData.clearable"
      :size="size"
      @change="handleChange"
      v-model="formItemValue"
      :range-separator="itemData.rangeSeparator"
      :start-placeholder="itemData.startPlaceholder"
      :end-placeholder="itemData.endPlaceholder"
      :type="itemData.dateType"
      :format="itemData.format"
      :placeholder="itemData.placeholder"
    ></el-date-picker>
  </template>

  <template v-if="itemData.formType === 'checkBox'">
    <!-- <template v-if="itemData.indeterminate">
      <el-checkbox
        :disabled="itemData.disabled"
        :indeterminate="indeterminate"
        v-model="itemData.checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
    </template>-->
    <el-checkbox-group
      :disabled="itemData.disabled"
      :indeterminate="true"
      v-model="formItemValue"
      @change="handleChange"
    >
      <el-checkbox
        v-for="item in itemData.checkBoxData || []"
        :key="item.value"
        :label="item.value"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
  </template>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import { setDefaultFormVal } from "../../../hooks/form";
import type { FormItem } from "@/types/form";

export default defineComponent({
  emits: ["change"],
  props: {
    index: Number,
    data: {
      type: Object as PropType<FormItem>,
      default: () => {},
    },
    size: {
      type: String,
      default: "large",
    },
    value: {
      type: [Array, Object, Function, String, Number, Symbol, Boolean],
    },
  },
  setup(props, context) {
    let dateVal = ref(""),
    formItemValue = props.value,
      itemData: any = props.data;
    // 类型为text文本时，根据最大长度进行字符串截取
    const setLength = (maxlength: number, value: any) => {
        maxlength = maxlength || -1;
        value = value || "";
        value = value.toString();
        let overstep = maxlength > 0 && value.length > maxlength;

        value = overstep ? `${value.substr(0, maxlength)}...` : value;
        itemData.toolTip.show = Boolean(overstep);
        return value;
      },
      // 获取输入框类型  验证是否为文本框
      getInputType = (type: any) => {
        return type.indexOf("Textarea") !== -1 ? "textarea" : "text";
      },
      clear = () => {
        context.emit("change", {
          prop: itemData.prop,
          value: setDefaultFormVal(itemData),
        });
      };
    // 各个表单内容变更事件
    let handleChange = (e: any) => {
      context.emit("change", {
        prop: itemData.prop,
        value: e,
      });
    };

    return {
      formItemValue,
      dateVal,
      itemData,
      setLength,
      getInputType,
      handleChange,
      clear,
    };
  },
});
</script>
<style>
.word-break {
  word-break: break-all;
}

.suffixIcon {
  z-index: 1000;
  right: 0;
  top: 0;
}
.form-item-child {
  width: 100% !important;
}
.form-item-popper{
  max-width: 400px !important;
}
</style>
