<!--
 * @Description: 富文本编辑器
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2022-02-24 10:09:57
 * @LastEditTime: 2022-02-24 17:10:25
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\views\components\editor\index.vue
-->
<template>
  <div ref="editor" class="editor"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import WangEditor from "wangeditor";
export default {
  name: "ComponentEditor",
  setup() {
    const editor = ref();
    const content = reactive({
      html: "",
      text: "",
    });
    let instance;
    onMounted(() => {
      instance = new WangEditor(editor.value);
      instance.config.height = 500;
      instance.config.zIndex = 200;
      instance.config.focus = false;
      Object.assign(instance.config, {
        onchange() {
          console.log("change");
        },
      });
      instance.create();
    });
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });
    const syncHTML = () => {
      content.html = instance.txt.html();
    };
    return {
      syncHTML,
      editor,
      content,
    };
  },
};
</script>
<style scoped>
.editor {
  width: 100%;
  min-height: calc(100vh - 60px - 60px);
}
</style>
