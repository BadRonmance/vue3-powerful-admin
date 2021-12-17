<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-23 13:27:22
 * @LastEditTime: 2021-12-10 18:20:00
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\components\icon\src\index.vue
-->
<template>
  <template v-if="iconData && iconData.icon">
    <i
      class="padding_right_7"
      :style="{ color: iconData.icon.iconColor }"
      :class="iconData.icon.label"
    ></i>
  </template>
  <template v-if="iconData && iconData.text">
    <span class="padding_right_7" :style="{ color: iconData.text.textColor }">{{
      iconData.text.label
    }}</span>
  </template>
</template>
<script lang="ts">
import { PropType,defineComponent } from "vue";
import type { FormItemIcon } from "@/types/form";
export default defineComponent({
  props: {
    iconData: {
      type: Object as PropType<FormItemIcon>,
    },
  },
});
</script>
