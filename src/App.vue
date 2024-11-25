<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-10-13 10:46:57
 * @LastEditTime: 2022-02-24 13:24:21
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\App.vue
-->
<template>
  <router-view />
</template>
<script lang="ts">
import { computed, nextTick, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { setTheme } from "@/hooks/theme";
export default {
  data() {
    return {};
  },
  setup() {
    const store = useStore(),
      route = useRoute(),
      colorConfig = computed(() => {
        return store.state.themeConfig.colorConfig;
      });

    watch(
      () => route.meta.cmpName,
      (cmpName) => {
        nextTick(() => {
          setTimeout(() => {
            document.documentElement.scrollTop =
              store.state.cache.cacheListEnums[cmpName as string].scrollTop;
          }, 0);
        });
      }
    );
    watch(
      () => colorConfig.value,
      (val) => {
        setTheme(val);
      },
      {
        deep: true, // 深度监听的参数
      }
    );
    setTheme(colorConfig.value);
  },
};
</script>
