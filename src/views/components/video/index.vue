<!--
 * @Description: 视频播放
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2022-02-24 10:09:57
 * @LastEditTime: 2022-02-24 13:41:13
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\views\components\video\index.vue
-->
<template>
  <div class="transform_center">
    <vue3VideoPlay v-bind="options" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const options = reactive({
  width: "800px", //播放器高度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  title: "钢铁侠视频", //视频名称
  poster:
    "https://pic1.zhimg.com/v2-eb8c6a0bf79f36fbca502d424f690eb4.jpg?source=382ee89a",
  src: "https://vdn1.vzuu.com/HD/2cd79dfa-551b-11ec-b788-da4304e29de6-v4_t10000111-vmfzgDFOAU.mp4?disable_local_cache=1&auth_key=1645683971-0-0-e7cccfdb7343da91968afe4591d28444&f=mp4&bu=http-com&expiration=1645683971&v=hw", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0, //默认音量大小
  control: true, //是否显示控制器
});
</script>
