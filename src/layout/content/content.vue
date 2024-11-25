<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-10 09:52:58
 * @LastEditTime: 2022-02-24 13:36:13
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\layout\content\content.vue
-->
<template>
  <div class="layout-side rel">
    <div
      class="wid"
      :class="{
        'layout-header-fixed': FixedHeader,
        'layout-header-Collapse-true': FixedHeader ? isCollapse : false,
        'layout-header-Collapse-false': FixedHeader ? !isCollapse : false,
      }"
    >
      <v-header></v-header>
      <v-tabs></v-tabs>
    </div>
    <div
      class="layout-content"
      :class="{
        'layout-content-fixed-width-header': FixedHeader,
        'layout-content-default': !FixedHeader,
      }"
    >
      <v-level></v-level>
    </div>
  </div>
</template>
<script lang="ts">
import vTabs from "../tabs/tab.vue";
import vHeader from "../header/header.vue";
import vLevel from "./level.vue";
import { getThemeConfig } from "@/libs/utils/function";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "LayoutContent",
  components: {
    vHeader,
    vTabs,
    vLevel,
  },
  setup() {
    const store = useStore();
    let FixedHeader = computed(() =>
      getThemeConfig(store.state.themeConfig.navConfig, "FixedHeader")
    );

    const isCollapse = computed(() => store.state.slideMenu.collapse);

    return {
      isCollapse,
      FixedHeader,
    };
  },
};
</script>
<style>
.layout-side {
  min-height: 100vh;
  transition: all 0.2s ease-in-out;
}
.layout-header-fixed {
  position: fixed;
  top: 0;
  z-index: 100;
  transition: all 0.3s;
}
.layout-header-Collapse-true {
  left: 60px;
  width: calc(100% - 60px);
}
.layout-header-Collapse-false {
  left: 200px;
  width: calc(100% - 200px);
}
.layout-content {
  transition: all 0.3s ease-in-out;
  padding-left: 10px;
  padding-right: 10px;
}
.layout-content-default {
  padding-top: 10px;
  min-height: calc(100vh - 60px - 60px);
}
.layout-content-fixed-width-header {
  padding-top: calc(60px + 60px);
  min-height: 100vh;
}
</style>
