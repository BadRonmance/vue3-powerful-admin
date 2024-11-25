<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-12 17:00:50
 * @LastEditTime: 2022-02-23 15:45:47
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\layout\content\level.vue
-->

<template>
  <RouterView>
    <template #default="{ Component }">
      <keep-alive :include="CachedViews">
        <component :is="Component" />
      </keep-alive>
    </template>
  </RouterView>
</template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    'name': 'LayoutLevel',
    setup() {
        const store = useStore(),
            CachedViews = computed(() => store.state.cache.cacheList);

        return {
            CachedViews
        };
    }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.75s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 100%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(1);
}
</style>
