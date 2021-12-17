<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-29 16:00:36
 * @LastEditTime: 2021-12-10 17:58:59
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\system\role\index.vue
-->
<template>
  <div class="background_f pa_l padding_top_20">
    <sx-form
      :formData="formData"
      :layout="{
        gutter: 20,
        size: ProjectSize,
      }"
    >
      <template v-slot:btnSlot>
        <el-button :size="ProjectSize" type="primary">查询</el-button>
        <el-button :size="ProjectSize" type="primary" plain>重置</el-button>
      </template>
    </sx-form>
  </div>
  <div class="background_f pa_20 margin_top_20">
    <el-button type="primary" :size="ProjectSize">新增角色</el-button>
    <sx-table
      :propData="table.propData"
      :tableData="table.tableData"
      :operation="table.operation"
    ></sx-table>
  </div>
</template>
<script lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import dictionary from '@/libs/dictionary/index';
import { getProjectSize } from '@/hooks/theme';
import type { RoleTable, RoleItem } from '../types';
export default {
    'name': 'roleSystem',
    setup() {
        const ProjectSize = getProjectSize();
        let formData = reactive([
                {
                    'prop': 'UserName',
                    'formType': 'inputString',
                    'span': 6,
                    'push': 0,
                    'label': '角色名称：',
                    'offset': 0,
                    'show': true,
                    'showWordLimit': false,
                    'clearable': false,
                    'maxlength': 20,
                    'placeholder': '请输入角色名称'
                },
                {
                    'prop': 'RoleStatus',
                    'formType': 'select',
                    'span': 6,
                    'push': 0,
                    'label': '角色状态：',
                    'offset': 0,
                    'show': true,
                    'selectData': [
                        {
                            'label': '全部',
                            'value': ''
                        },
                        {
                            'label': '启用',
                            'value': 1
                        },
                        {
                            'label': '禁用',
                            'value': 2
                        }
                    ],
                    'showWordLimit': false,
                    'clearable': false,
                    'maxlength': 20,
                    'placeholder': '请选择角色状态'
                },
                {
                    'prop': 'btnSlot',
                    'formType': 'slot',
                    'span': 6
                }
            ]),
            table = reactive<RoleTable>({
                'propData': [
                    {
                        'prop': 'roleName',
                        'label': '角色名称',
                        'width': '200'
                    },
                    {
                        'prop': 'roleVal',
                        'label': '角色值'
                    },
                    {
                        'prop': 'sort',
                        'label': '排序'
                    },
                    {
                        'prop': 'roleStatus',
                        'label': '状态'
                    },
                    {
                        'prop': 'creatTime',
                        'label': '创建时间'
                    },
                    {
                        'prop': 'remark',
                        'label': '角色备注'
                    }
                ],
                'tableData': [],
                'fixedAttr': {
                    'select': false,
                    'operation': 'right',
                    'operationWidth': '200',
                    'dynamicHeight': false
                },
                'operation': [
                    {
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

        axios.get('/api/getRoleList').then((res) => {
            res.data.data.map((item: RoleItem) => {
                item.roleStatus = dictionary.getVal('roleStatus', item.roleStatus);
            });
            table.tableData = res.data.data;
        });
        return {
            ProjectSize,
            formData,
            table
        };
    }
};
</script>
