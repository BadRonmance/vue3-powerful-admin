<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-10 09:12:07
 * @LastEditTime: 2021-12-10 11:49:23
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\layout\header\header.vue
-->
<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { ArrowRight } from '@element-plus/icons';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { permissionRoute } from '@/router/routes/index';
import { getThemeConfig } from '@/libs/utils/function';
import type { AppRouteRecordRaw } from '@/router/types';
import vTheme from '../theme/index.vue';
import axios from 'axios';
import Src from '~/components/table/src/index.vue';
import slideMenu from '@/layout/slide-menu/slide-menu.vue';

function getParentId(list: AppRouteRecordRaw, path: string) {
    for (let i in list) {
        if (list[i].path === path) {
            return [list[i]];
        }
        if (list[i].children) {
            let node: any = getParentId(list[i].children, path);

            if (node !== undefined) {
                return node.concat(list[i]);
            }
        }
    }
}
export default {
    'components': {
        ArrowRight,
        vTheme,
        Src,
        slideMenu
    },
    setup() {
        let MessageList: any = ref([]);

        axios.get('/api/getMessageList').then((res) => {
            MessageList.value = res.data.data;
        });

        const store = useStore();

    type PlatFormItem = {
      PlatFormName: string;
      PlatFormType: string;
      PlatFormUrl: string;
    };
    // 获取顶部导航栏配置
    let HeaderTopNavigator = computed(() =>
            getThemeConfig(store.state.themeConfig.navConfig, 'HeaderTopNavigator')
        ),
        // 是否显示面包屑
        ShowBreadcrumbNavgation = computed(() =>
            getThemeConfig(
                store.state.themeConfig.navConfig,
                'ShowBreadcrumbNavgation'
            )
        ),
        // 是否显示折叠按钮
        ShowCollapseButton = computed(() =>
            getThemeConfig(store.state.themeConfig.navConfig, 'ShowCollapseButton')
        ),
        // 是否显示组件大小设置按钮
        ShowComponentSize = computed(() =>
            getThemeConfig(store.state.themeConfig.navConfig, 'ShowComponentSize')
        ),
        // 是否显示通知栏按钮
        ShowNotice = computed(() =>
            getThemeConfig(store.state.themeConfig.navConfig, 'ShowNotice')
        );
    // 获取当前菜单展开值
    const collapse = computed(() => store.state.slideMenu.collapse),
        // 获取组件尺寸配置项
        ProjectCmpSize = computed(() => {
            return store.state.themeConfig.ProjectCmpSize;
        }),
        // 获取当前组件尺寸
        ProjectSize = computed(() => {
            return store.state.themeConfig.size;
        });
    // 获取当前路由对应的面包屑数据
    let matchedList: any = computed(() =>
        getParentId(permissionRoute, useRoute().path)
            .reverse()
            .filter((item: any) => item.name && item.path !== '/')
    );
    // 获取所有项目集合
    const PlatFormList: PlatFormItem[] = [
        {
            'PlatFormName': '综合管理平台',
            'PlatFormType': 'ManagementSystems',
            'PlatFormUrl': 'management'
        },
        {
            'PlatFormName': '客户管理平台',
            'PlatFormType': 'SXCRM',
            'PlatFormUrl': 'crm'
        },
        {
            'PlatFormName': '供应商平台',
            'PlatFormType': 'Supply',
            'PlatFormUrl': 'supply'
        },
        {
            'PlatFormName': '基础数据平台',
            'PlatFormType': 'BasicData',
            'PlatFormUrl': 'basicdata'
        }
    ],
        // 获取当前项目表示
        PlatFormUrl = 'supply';
    let CurrentPlatFormIndex: number = PlatFormList.findIndex(
        (val: { PlatFormUrl: string }): boolean => val.PlatFormUrl === PlatFormUrl
    );
    const userName = '张三',
        collapseChage = () => {
            store.commit('slideMenu/handleCollapse', !collapse.value);
        },
        handlerPlatformCommand = (e: string) => {
            window.location.href = `${import.meta.env.VITE_APP_URL}/${e}`;
        },
        handlerProjectSizeCommand = (e: string) => {
            store.commit('setProjectSize', e);
            ElMessage.success('设置成功');
        },
        showDrawer = ref(false);

    return {
        MessageList,
        showDrawer,
        collapse,
        collapseChage,
        PlatFormList,
        ProjectCmpSize,
        ProjectSize,
        CurrentPlatFormIndex,
        userName,
        handlerPlatformCommand,
        handlerProjectSizeCommand,
        matchedList,
        HeaderTopNavigator,
        ShowBreadcrumbNavgation,
        ShowCollapseButton,
        ShowComponentSize,
        ShowNotice
    };
    }
};
</script>

<template>
  <div class="header flex-y-center pa_l">
    <img
      class="collapse cursor margin_right_20"
      v-if="ShowCollapseButton"
      :class="{
        filp: collapse,
      }"
      @click="collapseChage"
      src="@/assets/icon/collapse.png"
    />
    <div class="flex-grow-1">
      <template v-if="!HeaderTopNavigator && ShowBreadcrumbNavgation">
        <el-breadcrumb separator="/" :size="ProjectSize">
          <el-breadcrumb-item
            v-for="(item, index) in matchedList"
            :key="index"
            >{{ item.meta.title }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </template>
      <template v-if="HeaderTopNavigator">
        <slide-menu mode="horizontal"></slide-menu>
      </template>
    </div>
    <div class="flex-grow-0 flex-y-center">
      <!-- 项目尺寸大小 -->
      <el-dropdown
        v-if="ShowComponentSize"
        :size="ProjectSize"
        class="margin_left_20"
        trigger="click"
        @command="handlerProjectSizeCommand"
      >
        <i class="iconfont icon-yuanshidaxiao margin_right_20 cursor"></i>
        <template #dropdown>
          <el-dropdown-menu :size="ProjectSize">
            <el-dropdown-item
              v-for="(sizeItem, sizeIndex) in ProjectCmpSize"
              :key="`ProjectCmpSize-${sizeIndex}`"
              :disabled="ProjectSize === sizeItem.size"
              :command="sizeItem.size"
              >{{ sizeItem.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 通知栏 -->
      <el-popover
        v-if="ShowNotice"
        placement="bottom"
        :width="350"
        trigger="click"
      >
        <template #reference>
          <i class="iconfont icon-lingdang margin_right_20 cursor fon_18"></i>
        </template>
        <div class="notice">
          <div
            class="notice-item"
            v-for="(msg, msgIndex) in MessageList"
            :key="msgIndex"
          >
            <el-link
              :underline="false"
              type="primary"
              href="https://element.eleme.io"
              target="_blank"
              >{{ msg.src_info.name }}</el-link
            >
            <span class="inline-flex">回复了你在文章</span>
            <el-link
              :underline="false"
              :href="msg.parent_info.url"
              type="primary"
              target="_blank"
              >《{{ msg.parent_info.name }}》</el-link
            >
            <span class="inline-flex">下的评论</span>
          </div>
        </div>
      </el-popover>
      <!-- 项目列表 -->
      <el-dropdown
        :size="ProjectSize"
        trigger="click"
        @command="handlerPlatformCommand"
      >
        <div class="el-dropdown-link cursor flex">
          <span class="flex-y-center margin_right_10">{{
            PlatFormList[CurrentPlatFormIndex].PlatFormName
          }}</span>
          <el-icon class="flex-y-center">
            <arrow-right />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu :size="ProjectSize">
            <el-dropdown-item
              v-for="(plat, platIndex) in PlatFormList"
              :key="`PlatFormIndex-${platIndex}`"
              :disabled="CurrentPlatFormIndex === platIndex"
              :command="plat.PlatFormUrl"
              >{{ plat.PlatFormName }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 账号操作 -->
      <el-dropdown
        :size="ProjectSize"
        class="margin_left_20"
        trigger="click"
        @command="handlerPlatformCommand"
      >
        <div class="el-dropdown-link cursor fon_14">{{ userName }}</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="signOut">退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 主题配置 -->
      <el-popover
        placement="bottom-start"
        title="主题配置"
        :width="200"
        trigger="hover"
        content="在这里你可以配置项目主题色、导航设置、菜单栏设置等"
      >
        <template #reference>
          <i
            class="iconfont icon-zhuti margin_left_20 cursor color_primary fon_16"
            @click="showDrawer = true"
          ></i>
        </template>
      </el-popover>

      <el-drawer v-model="showDrawer" direction="rtl">
        <v-theme></v-theme>
      </el-drawer>
    </div>
  </div>
</template>
<style lang="scss">
.header {
  height: 60px;
  background: #fff;
  box-sizing: border-box;
}
.header .collapse {
  transition: all 0.4s;
  width: 16px;
}
.header .filp {
  transform: rotateY(180deg);
}
.header .user-tab {
  color: var(--el-text-color-regular);
}
.notice .notice-item {
  padding: 10px 0;
  border-bottom: 1px solid var(--el-color-info-light);
}

.notice .notice-item .el-popover .el-popper {
  max-width: 100px !important;
  background: red !important;
}
</style>
