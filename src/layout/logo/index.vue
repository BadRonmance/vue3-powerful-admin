<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-12-07 10:35:53
 * @LastEditTime: 2021-12-07 11:21:25
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\layout\logo\index.vue
-->
<template>
  <div
    class="t_c wid"
    :style="{ background: slideMenu.background }"
    style="height: 60px"
  >
    <el-image class="projectLogo" :src="logo.default" fit="cover"></el-image>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore(),
            logo = import.meta.globEager('../../assets/*')['../../assets/logo.png'],
            slideMenu = store.state.slideMenu.slideMenuConfig;

        return {
            logo,
            slideMenu
        };
    }
};
</script>
<style>
.projectLogo {
  width: 40px;
  height: 40px;
  margin-top: 10px;
}
</style>
