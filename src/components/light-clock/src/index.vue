<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-23 13:27:22
 * @LastEditTime: 2022-02-23 14:28:00
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vue3-powerful-admin\src\components\light-clock\src\index.vue
-->
<template>
  <div class="clock">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, setup, ref } from "vue";
import type { FormItemIcon } from "@/types/form";

export default defineComponent({
  props: {
    iconData: {
      type: Object as PropType<FormItemIcon>,
    },
  },
  setup() {
    var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let time = ref(""),
      date = ref("");
    var timerID = setInterval(updateTime, 1000);
    function updateTime() {
      var cd = new Date();
      time.value =
        zeroPadding(cd.getHours(), 2) +
        ":" +
        zeroPadding(cd.getMinutes(), 2) +
        ":" +
        zeroPadding(cd.getSeconds(), 2);
      date.value =
        zeroPadding(cd.getFullYear(), 4) +
        "-" +
        zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    }

    function zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
    updateTime();
    return {
      time,
      date,
    };
  },
});
</script>
<style lang="scss">
.clock {
  font-family: "Share Tech Mono", monospace;
  color: #1e92e0;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .time {
    letter-spacing: 0.05em;
    font-size: 80px;
    padding: 5px 0;
  }
  .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
  .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }
}
</style>
