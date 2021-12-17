<!--
 * @Description: 自动校验宽度 进行隐藏显示
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-12-08 16:24:25
 * @LastEditTime: 2021-12-09 09:51:46
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\components\tooltip\src\index.vue
-->
<template>
  <slot v-if="!disabled"></slot>
  <el-tooltip
    v-else
    effect="dark"
    :content="val"
    :disabled="showTootop"
    placement="top"
  >
    <div v-resize="resize" ref="tooltipRef" class="hydlnr" :style="style">
      <slot></slot>
    </div>
  </el-tooltip>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
export default defineComponent({
  name: "Tooltip",
  props: {
    content: {
      type: [String, Number, Boolean, Object, Array],
      default: "",
    },
    line: {
      type: Number,
      default: 1,
    },
    resize: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const lineVal = ref(props.line),
      showTootop = ref<boolean>(true),
      tooltipRef: any = ref(null),
      style = ref<string>("");

    let val = ref<any>(props.content);

    function checkHeight() {
      nextTick(() => {
        let sHeight = tooltipRef.value.scrollHeight;

        if (sHeight > 23 * lineVal.value) {
          showTootop.value = false;
        } else {
          lineVal.value = 1;
          showTootop.value = true;
        }

        style.value = `-webkit-line-clamp: ${lineVal.value};`;
      });
    }
    props.disabled && checkHeight();
    const resize = () => {
      props.resize && checkHeight();
    };

    return {
      val,
      lineVal,
      tooltipRef,
      style,
      showTootop,
      resize,
    };
  },
});
</script>
