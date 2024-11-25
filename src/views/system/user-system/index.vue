<!--
 * @Description: 用户管理
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-17 11:32:46
 * @LastEditTime: 2022-02-23 15:41:28
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\views\system\user-system\index.vue
-->

<template>
  <div class="pa_20 background_f" ref="userSytemRef">
    <div>
      <el-button v-permission="1" type="primary" plain :size="ProjectSize">
        <el-icon class="margin_right_10">
          <plus></plus> </el-icon>添加用户
      </el-button>
    </div>
    <sx-table
      :tableData="table.tableData"
      :propData="table.propData"
      :fixedAttr="table.fixedAttr"
      :operation="table.operation"
      :cellStyle="cellStyle"
      @single-click="handlerCellClick"
    >
      <template #avatar="{ data }">
        <el-image
          class="cursor"
          :preview-src-list="[data.avatar]"
          :initial-index="1"
          :src="data.avatar"
          fit="cover"
        ></el-image>
      </template>
    </sx-table>
  </div>
</template>

<script lang="ts">
import { computed, reactive, defineComponent, ref } from 'vue';
import { Plus } from '@element-plus/icons';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { getUserList } from '@/API/system/index';
import dictionary from '@/libs/dictionary/index';
import type { UserTable, UserItem } from '../types';
export default defineComponent({
    'name': 'userSystem',
    'components': {
        Plus
    },
    setup() {
        const store = useStore(),
            router = useRouter(),
            route = useRoute(),
            userSytemRef = ref(null),
            ProjectSize = computed(() => {
                return store.state.themeConfig.size;
            });
        let table = reactive<UserTable>({
            'propData': [
                {
                    'type': 'selection',
                    'width': ''
                },
                {
                    'prop': 'userName',
                    'label': '用户名'
                },
                {
                    'prop': 'account',
                    'type': 'click',
                    'label': '登录账号',
                    'line': 1,
                    'color': '#f66925',
                    'width': '120'
                },
                {
                    'prop': 'avatar',
                    'label': '自定义表格插槽',
                    'slotName': 'avatar'
                },
                {
                    'prop': 'phone',
                    'label': '手机号',
                    'width': '200'
                },
                {
                    'prop': 'email',
                    'label': '邮箱',
                    'line': 2,
                    'width': '200'
                },
                {
                    'prop': 'strSex',
                    'label': '性别'
                },
                {
                    'prop': 'strStatus',
                    'label': '状态'
                },
                {
                    'prop': 'creatTime',
                    'label': '创建时间',
                    'width': '200'
                },
                {
                    'prop': 'updateTime',
                    'label': '更新时间',
                    'width': '200'
                }
            ],
            'tableData': [],
            'fixedAttr': {
                'select': 'left',
                'operation': 'right',
                'operationWidth': '200',
                'dynamicHeight': false
            },
            'operation': [
                {
                    'id':1,
                    'type': 'text',
                    'size': 'mini',
                    'plain': false,
                    'circle': false,
                    'round': false,
                    'loading': false,
                    'disabled': false,
                    'autoInsertSpace': true,
                    'text': '编辑'
                },
                {
                    'id':2,
                    'type': 'danger',
                    'size': 'mini',
                    'plain': false,
                    'circle': false,
                    'round': false,
                    'loading': false,
                    'disabled': false,
                    'autoInsertSpace': true,
                    'text': '删除'
                }
            ]
        });
        const getData = async () => {
            const userList = await getUserList();

            userList.data.data.map((item: UserItem) => {
                item.strSex = dictionary.getVal('sex', item.sex);
                item.strStatus = dictionary.getVal('userStatus', item.status);
            });
            table.tableData = userList.data.data;
        };

        getData();
        let cellStyle = reactive({
            'text-align': 'center'
        });
        /**
         * @description: 清除本页缓存并关闭对应的tab
         * @version: 1.0.0
         * @param {*}
         * @return {*}
         * @author: 天生不是宠儿
         * @Date: 2021-12-10 17:56:13
         */
        const clearPageCache = () => {
            store.commit('tab/deleteTab', route.path);
            store.commit('cache/deleteCache', 'userSystem');
            router.go(-1);
        };
        const handlerCellClick = (e: UserItem) => {
            console.log(e);

            clearPageCache();
        };

        return {
            cellStyle,
            ProjectSize,
            table,
            handlerCellClick,
            userSytemRef
        };
    }
});
</script>
