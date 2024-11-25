<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2022-02-24 13:56:51
 * @LastEditTime: 2022-02-24 16:54:44
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\views\components\map\index.vue
-->
<template>
  <div id="map"></div>
</template>
<script>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { shallowRef } from "@vue/reactivity";
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  setup() {
    let map = shallowRef(null);
    let drive = shallowRef(null);

    onMounted(() => initMap());
    function initMap() {
      AMapLoader.load({
        key: "4ab3bc90c3882cc4ab4424b4d6a10aff", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.LngLat", "AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          //设置地图容器id
          // viewMode: "3D", //是否为3D地图模式
          // zoom: 4 || 19, //初始化地图级别
          // center: [108.886976, 34.247447], //初始化地图中心点位置
          map = new AMap.Map("map", {
            viewMode: "3D", //是否为3D地图模式
            zoom: 19, //初始化地图级别
            center: [108.886976, 34.247447], //初始化地图中心点位置
          });
        })
        .catch((e) => {
          console.log("catch", e);
        });
    }
    return {
      map,
    };
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  min-height: calc(100vh - 60px - 60px);
}
</style>
