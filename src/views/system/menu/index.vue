<!--
 * @Description: 菜单权限管理
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-12-06 11:03:19
 * @LastEditTime: 2021-12-14 16:04:55
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\system\menu\index.vue
-->
<template>
  <section class="pa_20 background_f">
    <h3>菜单权限管理</h3>
    <p class="color_9 fon_14">页面数据为 Mock 示例数据，非真实数据。</p>
    <el-button type="primary" @click="record">日志记录</el-button>
  </section>
  <section class="flex margin_top_20">
    <section class="background_f pa_20 flex-grow-0 tree-list">
      <div class="flex-y-center">
        <el-button :size="projectSize" type="primary" plain>添加菜单</el-button>
        <el-button
          :size="projectSize"
          class="margin_left_20"
          type="danger"
          plain
          >删除菜单</el-button
        >
      </div>
      <el-divider></el-divider>
      <el-input
        v-model="filterVal"
        :size="projectSize"
        @input="filterInput"
        placeholder="输入菜单名搜索"
        :suffix-icon="Search"
      ></el-input>
      <el-tree
        ref="treeRef"
        class="margin_top_10"
        :size="projectSize"
        :key="expandAll"
        :data="permissionRoute"
        show-checkbox
        :default-expand-all="expandAll"
        check-strictly
        :expand-on-click-node="false"
        @node-click="nodeClick"
        @check-change="checkChange"
        :filter-node-method="filterNode"
      />
    </section>
    <section class="background_f margin_left_20 pa_20 flex-grow-1">
      <p class="fon_14">编辑菜单</p>
      <el-divider></el-divider>
      <sx-form :formValue="formValue" :layout="layout" :formData="formData">
        <template v-slot:menuBtn>
          <el-button :size="projectSize" type="primary">保存修改</el-button>
          <el-button :size="projectSize" type="primary" plain>重置</el-button>
        </template>
      </sx-form>
    </section>
  </section>
</template>
<script lang="ts">
import { formData } from './form';
import { Search } from '@element-plus/icons';
import { reactive, ref } from 'vue';
import { permissionRoute } from '@/router/routes/index';
import { getProjectSize } from '@/hooks/theme';
import {recordLog} from "@/libs/utils/log"
function setRoute(routes: any[]) {
    routes.map((item: { label: any; meta: { title: any }; children: any[] }) => {
        item.label = item.meta.title;
        item.children && item.children.length && setRoute(item.children);
    });
}
interface Menu {
  menuType?: string;
  menuTitle?: string;
  menuPath?: string;
  menuAuth?: string;
}
export default {
    'name': 'menuSystem',
    setup() {
        setRoute(permissionRoute);
        let expandAll = ref(true);
        const projectSize = getProjectSize(),
            layout = reactive({
                'labelWidth': '130px',
                'gutter': 10,
                'size': getProjectSize()
            });
        let formValue: Menu = reactive({
            'menuType': '侧边栏菜单'
        });
        const selectMenu = reactive({}),
            filterVal = ref(''),
            nodeClick = (checkedkey: any) => {
                formValue.menuTitle = checkedkey.label;
                formValue.menuPath = checkedkey.path;
                formValue.menuAuth = String(checkedkey.meta.auth);
            },
            checkChange = (checkedNodes: any, checkedKeys: any) => {
                console.log(checkedNodes);
            },
            treeRef: any = ref(null),
            filterInput = () => {
                treeRef.value.filter(filterVal.value);
            },
            filterNode = (value: any, data: { label: string | any[] }) => {
                if (!value) {
                    return true;
                }
                return data.label.indexOf(value) !== -1;
            },
            record=()=>{
              recordLog("主动日志记录")
            }

        return {
            selectMenu,
            expandAll,
            permissionRoute,
            projectSize,
            nodeClick,
            filterVal,
            checkChange,
            Search,
            filterNode,
            treeRef,
            filterInput,
            formData,
            layout,
            formValue,
            record
        };
    }
};
</script>
<style scoped>
.tree-list {
  width: 30vw;
}
</style>
