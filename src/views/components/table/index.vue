<!--
 * @Description: 表格基本展示
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-17 10:53:30
 * @LastEditTime: 2022-02-24 15:13:44
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\views\components\table\index.vue
-->
<template>
  <div>
    <sx-table
      :loading="false"
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
<script>
import { computed, reactive, defineComponent, ref } from "vue";
export default {
  name: "ComponentsTable",
  setup() {
    let table = reactive({
      propData: [
        {
          prop: "userName",
          label: "用户名",
        },
        {
          prop: "account",
          type: "click",
          label: "登录账号",
          line: 1,
          color: "#f66925",
          width: "120",
        },
        {
          prop: "phone",
          label: "手机号",
          width: "200",
        },
        {
          prop: "email",
          label: "邮箱",
          line: 2,
          width: "200",
        },
        {
          prop: "strSex",
          label: "性别",
        },
        {
          prop: "strStatus",
          label: "状态",
        },
        {
          prop: "creatTime",
          label: "创建时间",
          width: "200",
        },
        {
          prop: "updateTime",
          label: "更新时间",
          width: "200",
        },
      ],
      tableData: [],
      fixedAttr: {
        select: "left",
        operation: "right",
        operationWidth: "200",
        dynamicHeight: false,
      },
      operation: [
        {
          id: 1,
          type: "text",
          size: "mini",
          plain: false,
          circle: false,
          round: false,
          loading: false,
          disabled: false,
          autoInsertSpace: true,
          text: "编辑",
        },
        {
          id: 2,
          type: "danger",
          size: "mini",
          plain: false,
          circle: false,
          round: false,
          loading: false,
          disabled: false,
          autoInsertSpace: true,
          text: "删除",
        },
      ],
    });
    return {
      table,
    };
  },
};
</script>
