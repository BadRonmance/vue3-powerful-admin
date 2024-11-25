<!--
 * @Description: 基于element表格的二次封装
 * 1、支持两行显示隐藏
 * 2、支持selection和opeation 固定
 * 3、支持以数组形式传入数据
 * 4、支持自定义列
 * 5、支持自定义列数据点击
 * 6、支持表格流体高度
 * 7、支持固定行背景色显示
 * 8、自定义表格插槽
 * 9、支持表格行高亮，以主题色展示
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-29 09:59:31
 * @LastEditTime: 2022-02-24 14:53:20
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\components\table\src\index.vue
-->
<template>
  <el-table
    v-loading="loading"
    highlight-current-row
    :header-cell-style="headerCellStyle"
    :cell-style="setColumnStyle"
    :row-style="setRowStyle"
    class="margin_top_20"
    :size="projectSize"
    :data="tableData"
    border
    style="width: 100%"
    @select-all="handleSelectAll"
    @select="handleSelect"
  >
    <template v-for="(propItem, propIndex) in propData">
      <template v-if="propItem.type === 'selection'">
        <el-table-column
          :key="`prop-${propIndex}`"
          :fixed="fixedAttr.select"
          type="selection"
          width="55"
        />
      </template>
      <template v-else>
        <el-table-column
          :key="`prop-${propIndex}`"
          :show-overflow-tooltip="!propItem.slotName"
          :prop="propItem.prop"
          :label="propItem.label"
          :width="propItem.width"
        >
          <template v-if="propItem.slotName" v-slot="scope">
            <slot :name="propItem.slotName" :data="scope.row"></slot>
          </template>
          <template #default="scope" v-else>
            <sx-tooltip
              :content="scope.row[propItem.prop]"
              :resize="false"
              :disabled="propItem.line >= 1"
              :line="propItem.line"
            >
              <template #default>
                <div
                  :class="{
                    cursor: propItem.type === 'click',
                  }"
                  @click="handlerCellClick(scope.row, propItem)"
                  style="margin-left: 10px"
                  :style="{
                    color: propItem.color,
                  }"
                >
                  {{ scope.row[propItem.prop] }}
                </div>
              </template>
            </sx-tooltip>
          </template>
        </el-table-column>
      </template>
    </template>
    <el-table-column
      label="操作"
      :width="fixedAttr.operationWidth"
      :fixed="fixedAttr.operation"
    >
      <template #default="scope">
        <template v-if="hasPermission(scope.row.permission)">
          <el-button
            :type="btnItem.type"
            :size="btnItem.size"
            :plain="btnItem.plain"
            :round="btnItem.round"
            :circle="btnItem.circle"
            :loading="btnItem.loading"
            :disabled="btnItem.disabled"
            :auto-insert-space="btnItem.autoInsertSpace"
            v-for="(btnItem, btnIndex) in hasPermission(scope.row.permission)"
            :key="`${btnItem.text}-${btnIndex}`"
            >{{ btnItem.text }}</el-button
          >
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { getProjectSize } from "@/hooks/theme";
import { objToString } from "@/libs/utils/function";
import type { PropItem, FixedAttr, Operation } from "@/types/table";

export default defineComponent({
  name: "userSystem",
  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    propData: {
      type: Array as PropType<PropItem[]>,
      default: () => [],
    },
    tableData: {
      type: Array as PropType<unknown[]>,
      default: () => [],
    },
    operation: {
      type: Array as PropType<Operation[]>,
    },
    fixedAttr: {
      type: Object as PropType<FixedAttr>,
      default: () => {
        return {
          select: false,
          operation: false,
        };
      },
    },
    cellStyle: {
      type: Object as PropType<any>,
      default: () => {
        return {
          "text-align": "center",
        };
      },
    },
    rowStyle: {
      type: Object as PropType<any>,
      default: () => {},
    },
  },
  setup(props, context) {
    const projectSize = getProjectSize(),
      setColumnStyle = () => {
        return props.cellStyle;
      },
      setRowStyle = (e: { row: { customRowStyle: any } }) => {
        if (e.row.customRowStyle) {
          return e.row.customRowStyle;
        }
      },
      headerCellStyle = () => {
        let defaultStyle = {
          background: "#F5F7F9",
          cursor: "pointer",
          "text-align": "center",
        };

        return defaultStyle;
      },
      // 单个数据点击事件
      handlerCellClick = (data: any, prop: { type: string }) => {
        if (prop.type === "click") {
          context.emit("single-click", data);
        }
      },
      // 全选所有
      handleSelectAll = (data: any) => {
        context.emit("select-click", data);
      },
      // 单个checkbox选中
      handleSelect = (data: any) => {
        context.emit("select-click", data);
      },
      hasPermission = (permission: any) => {
        if (!props.operation) return [];
        if (!permission) return props.operation;
        let arr: Operation[] = [];
        props.operation.forEach((item) => {
          if (permission.includes(item.id)) {
            arr.push(item);
          }
        });
        return arr;
      };

    return {
      setRowStyle,
      projectSize,
      headerCellStyle,
      setColumnStyle,
      handlerCellClick,
      handleSelectAll,
      handleSelect,
      hasPermission,
    };
  },
});
</script>
<style>
/* .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: var(--el-color-primary-light-8) !important;
}
.el-table__body tr.current-row > td {
  background-color: var(--el-color-primary-light-8) !important;
} */
</style>
