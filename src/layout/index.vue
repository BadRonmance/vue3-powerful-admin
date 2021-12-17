<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-09 17:50:07
 * @LastEditTime: 2021-12-07 11:24:53
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\layout\index.vue
-->
<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import vContent from './content/content.vue';
import vLogo from './logo/index.vue';
import slideMenu from './slide-menu/slide-menu.vue';
export default {
    'name': 'layout',
    'components': {
        slideMenu,
        vContent,
        vLogo
    },
    setup() {
        const store = useStore(),
            isCollapse = computed(() => store.state.slideMenu.collapse),
            show = ref(false);

        return {
            isCollapse,
            show
        };
    }
};
</script>
<template>
  <div class="project">
    <aside
      class="hei slide-menu-box"
      :class="{
        'slide-menu-collapse-true': !isCollapse,
        'slide-menu-collapse-false': isCollapse,
      }"
    >
      <v-logo></v-logo>
      <slide-menu mode="vertical"></slide-menu>
    </aside>

    <div
      class="inside project-bg"
      :class="{
        'layout-inside-fix-with-sider': !isCollapse,
        'layout-inside-fix-with-sider-collapse': isCollapse,
      }"
    >
      <v-content></v-content>
    </div>
  </div>
</template>
<style>
.project {
  position: relative;
  height: 100%;
  width: 100%;
}
.slide-menu-box {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  box-sizing: border-box;
  transition: width 0.28s;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  background: #efeff9 !important;
}
.slide-menu-collapse-true {
  width: 200px !important;
}
.slide-menu-collapse-false {
  width: 60px !important;
}
.el-menu {
  border-right: none !important;
}
.inside {
  min-height: 100%;
  -webkit-transition: margin-left 0.28s;
  transition: margin-left 0.28s;
  position: relative;
}
.layout-inside-fix-with-sider {
  margin-left: 200px;
}
.layout-inside-fix-with-sider-collapse {
  margin-left: 60px;
}
</style>
