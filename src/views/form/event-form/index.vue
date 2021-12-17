<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-25 09:35:59
 * @LastEditTime: 2021-11-25 11:24:46
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\form\event-form\index.vue
-->
<template>
  <section>
    <el-time-picker v-model="value" is-range clearable></el-time-picker>
  </section>
</template>
<script lang="ts">
export default {
    'name': 'eventForm',
    data() {
        return {
            'value': ''
        };
    }
};
</script>
