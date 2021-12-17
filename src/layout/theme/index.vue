<!--
 * @Description: 主题风格设置
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-12-03 13:15:26
 * @LastEditTime: 2021-12-08 15:46:04
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\layout\theme\index.vue
-->
<template>
  <section class="pa_l fon_14 color_3">
    <section>
      <el-divider>主题色设置</el-divider>
      <div
        class="flex"
        v-for="(item, key) of themeConfig.colorConfig"
        :key="item"
      >
        <p class="flex-grow-1 flex-y-center">{{ key }}</p>
        <div class="flex-grow-0">
          <el-color-picker
            @change="handlerChangeColor($event, key)"
            v-model="themeConfig.colorConfig[key]"
          ></el-color-picker>
        </div>
      </div>
    </section>
    <section>
      <el-divider>导航设置</el-divider>
      <div class="flex" v-for="(item, key) in themeConfig.navConfig" :key="key">
        <p class="flex-grow-1 flex-y-center">{{ item.title }}</p>
        <div class="flex-grow-0 flex-y-center">
          <el-switch
            :key="themeConfig.colorConfig.primaryColor"
            v-model="item.val"
            :active-color="themeConfig.colorConfig.primaryColor"
          ></el-switch>
        </div>
      </div>
    </section>
    <section>
      <el-divider>其他设置</el-divider>
      <div class="flex" v-for="(item, key) in themeConfig.tabConfig" :key="key">
        <p class="flex-grow-1 flex-y-center">{{ item.title }}</p>
        <div class="flex-grow-0 flex-y-center">
          <el-switch
            :key="themeConfig.colorConfig.primaryColor"
            v-model="item.val"
            :active-color="themeConfig.colorConfig.primaryColor"
          ></el-switch>
        </div>
      </div>
    </section>
  </section>
</template>
<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    'props': {
        'value': {
            'type': Boolean as () => boolean,
            'default': false
        }
    },
    setup() {
        const store = useStore(),
            themeConfig = computed(() => store.state.themeConfig),
            handlerChangeColor = (val: string, key: string | number) => {
                store.commit('setThemeConfig', {
                    key,
                    val
                });
            },
            drawer = ref(true);

        return {
            drawer,
            themeConfig,
            handlerChangeColor
        };
    }
};
</script>
