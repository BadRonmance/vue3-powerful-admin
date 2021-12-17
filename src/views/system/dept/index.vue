<!--
 * @Description: 部门管理
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-29 17:10:35
 * @LastEditTime: 2021-11-29 19:13:09
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\system\dept\index.vue
-->
<template>
  <div>部门管理{{ projectSize }}</div>
</template>
<script lang="ts">
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore(),
            projectSize = () => {
                return store.state.projectSize;
            };

        return {
            projectSize
        };
    }
};
</script>
