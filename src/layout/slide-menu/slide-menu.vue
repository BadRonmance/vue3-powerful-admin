<!--
 * @Description: 菜单栏
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-09 17:49:55
 * @LastEditTime: 2021-12-10 10:35:21
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\layout\slide-menu\slide-menu.vue
-->
<template>
  <el-menu
    :background-color="mode === 'vertical' ? slideMenu.background : ''"
    :text-color="slideMenu.textColor"
    :active-text-color="slideMenu.activeTextColor"
    :default-active="path"
    router
    :mode="mode"
    :class="{
      'el-menu-vertical': mode === 'vertical',
      'el-menu-horizontal': mode === 'horizontal',
    }"
    class="el-menu-vertical-demo wid"
    :collapse="mode === 'vertical' ? isCollapse : false"
    :unique-opened="SlideMenuUniqueOpened"
  >
    <template
      v-for="(menu, menuIndex) in permissionRoute"
      :key="`menu-${menuIndex}`"
    >
      <!-- 一级菜单 -->
      <el-menu-item
        :index="`${menu.path}`"
        v-if="menu.children && menu.children.length === 0"
      >
        <el-icon class="iconfont" :class="menu.meta.icon"></el-icon>
        <template #title>{{ menu.meta.title }}</template>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu
        :index="`${menu.path}`"
        v-if="menu.children && menu.children.length > 0"
      >
        <template #title>
          <el-icon class="iconfont" :class="menu.meta.icon"></el-icon>
          <span>{{ menu.meta.title }}</span>
        </template>
        <el-menu-item-group
          v-for="(childMenu, childMenuIndex) in menu.children"
          :key="`childMenu-${childMenuIndex}`"
        >
          <!-- 三级菜单 -->
          <el-sub-menu
            :index="`${childMenu.path}`"
            v-if="childMenu.children && childMenu.children.length > 0"
          >
            <template #title>
              <el-icon
                class="iconfont"
                v-if="childMenu.meta.icon"
                :class="childMenu.meta.icon"
              ></el-icon>
              <span>{{ childMenu.meta.title }}</span>
            </template>
            <el-menu-item-group
              v-for="(lastMenu, lastMenuIndex) in childMenu.children"
              :key="`lastMenu-${lastMenuIndex}`"
            >
              <el-menu-item :index="`${lastMenu.path}`">{{
                lastMenu.meta.title
              }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <template v-else>
            <el-menu-item :index="`${childMenu.path}`">{{
              childMenu.meta.title
            }}</el-menu-item>
          </template>
        </el-menu-item-group>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { computed, PropType } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { permissionRoute } from '@/router/routes/index';
import { getThemeConfig } from '@/libs/utils/function';
import {
    Location,
    Document,
    Menu as IconMenu,
    Setting
} from '@element-plus/icons';
export default {
    'components': {
        Location,
        Document,
        Setting,
        IconMenu
    },
    'props': {
        'mode': {
            'type': String as PropType<'vertical' | 'horizontal'>,
            'default': 'vertical'
        }
    },
    setup() {
        const store = useStore();
        let SlideMenuUniqueOpened = computed(() =>
            getThemeConfig(store.state.themeConfig.navConfig, 'SlideMenuUniqueOpened')
        );
        const slideMenu = store.state.slideMenu.slideMenuConfig,
            currentRoute: { value: { path: string } } = useRouter().currentRoute,
            path = computed(() => currentRoute.value.path),
            isCollapse = computed(() => store.state.slideMenu.collapse);

        return {
            isCollapse,
            path,
            slideMenu,
            permissionRoute,
            SlideMenuUniqueOpened
        };
    }
};
</script>

<style>
.el-menu-vertical {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-menu::-webkit-scrollbar {
  display: none !important; /* Chrome Safari */
}
.el-menu-vertical .el-menu-item:hover {
  background: #fff !important;
  color: var(--el-color-primary);
}
.el-menu-vertical .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 400px; */
}
</style>
