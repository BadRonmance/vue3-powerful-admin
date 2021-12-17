<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-11 18:51:06
 * @LastEditTime: 2021-12-10 11:49:35
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\layout\tabs\tab.vue
-->
<template>
  <div class="tabs padding_left_right_10 padding_top_10 project-bg">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-click="handleTabsClick"
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { toRaw } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

interface tabItem {
  name: string;
  title: string;
  cmpName?: string;
}
function getCmpName(data: tabItem[], e: string) {
    let tabInfoIndex: number = data.findIndex(
        (val: { name: string }) => val.name === e
    );

    return tabInfoIndex === -1 ? '' : data[tabInfoIndex].cmpName;
}

export default {
    setup() {
        const store = useStore(),
            router = useRouter(),
            route = useRoute(),
            editableTabs = computed(() => {
                let data = store.state.tab.openTab;

                return data;
            });
        let editableTabsValue = ref<string>('');

        onMounted(() => {
            editableTabsValue.value = route.path;
            store.commit('tab/setTabValue', route.path);
            store.commit('tab/addTab', route);
        });
        watch(
            () => route.path,
            () => {
                editableTabsValue.value = route.path;
                store.commit('tab/setTabValue', route.path);
                store.commit('tab/addTab', route);
            }
        );
        // TODO 点击关闭时获取不到对应的CNPNAME
        const handleTabsEdit = async (e: string) => {
                await store.commit(
                    'cache/deleteCache',
                    getCmpName(store.state.tab.openTab, e)
                );
                await store.commit('tab/deleteTab', e);

                router.push(store.getters['tab/getActiveValue']);
            },
            handleTabsClick = (targetName: any) => {
                const path = toRaw(targetName.props).name;

                path !== route.path && router.push(path);
            };

        return {
            handleTabsClick,
            editableTabs,
            handleTabsEdit,
            editableTabsValue
        };
    }
};
</script>
<style>
/* 40px */
.el-tabs__header {
  margin: 0 !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  background: #fff;
  box-sizing: border-box;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-bottom: 1px solid var(--el-border-color-light) !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom: 1px solid var(--el-border-color-light) !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-top: none;
}
/* .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-top: 0;
} */
.el-tabs--card > .el-tabs__header {
  border-bottom: 0 !important;
}
</style>
