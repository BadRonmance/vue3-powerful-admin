<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-11 19:44:36
 * @LastEditTime: 2022-12-08
 * @LastEditors: 张泽锋
 * @FilePath: \vue3-powerful-admin\src\views\home\home.vue
-->
<template>
  <div class="grid fon_14">
    <div class="span-col-2 background_f pa_20">
      <span>访问量</span>
      <p class="fon_24">
        <sx-count-to prefix :startVal="1" :endVal="6000" />
      </p>
      <el-divider></el-divider>
    </div>
    <div class="span-col-2 background_f pa_20">
      <span>销售额</span>
      <p class="fon_24">
        <sx-count-to prefix="¥" :startVal="1" :endVal="126500" />
      </p>
      <el-divider></el-divider>
    </div>
    <div class="span-col-2 background_f pa_20">
      <span>订单量</span>
      <p class="fon_24">
        <sx-count-to prefix :startVal="1" :endVal="900" />
      </p>
      <el-divider></el-divider>
    </div>
    <div class="span-col-2 background_f pa_20">
      <span>新增用户</span>
      <p class="fon_24">
        <sx-count-to prefix :startVal="1" :endVal="50" />
      </p>
      <el-divider></el-divider>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/user.png" class="home-icon" />
      <p>用户</p>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/statistics.png" class="home-icon" />
      <p>分析</p>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/good.png" class="home-icon" />
      <p>商品</p>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/order.png" class="home-icon" />
      <p>订单</p>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/coupon.png" class="home-icon" />
      <p>票据</p>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/news.png" class="home-icon" />
      <p>消息</p>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/label.png" class="home-icon" />
      <p>标签</p>
    </div>
    <div class="background_f t_c padding_bottom_top_20 cursor">
      <img src="/icon/system.png" class="home-icon" />
      <p>配置</p>
    </div>
    <div class="span-col-5 background_f pa_20">
      <span>今日访问量</span>
      <el-divider></el-divider>
      <template v-if="userAccessList.length">
        <sx-line-chart
          :timeStemp="`${timeStemp}1`"
          :VisitsData="userAccessList"
        ></sx-line-chart>
      </template>
    </div>
    <div class="span-col-3 background_f pa_20">
      <span>用户渠道来源</span>
      <el-divider></el-divider>
      <template v-if="userDonutChart.length">
        <sx-donut-chart
          :timeStemp="`${timeStemp}2`"
          :VisitsData="userDonutChart"
        ></sx-donut-chart>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "vue";
import lineChart from "../chart/line-chart.vue";
import polygonalLineChart from "../chart/polygonal-line-chart.vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: "home",
  components: { lineChart, polygonalLineChart },
  setup() {
    const store = useStore();
    let timeStemp = ref(`lineChart-${new Date().getTime()}`),
      userAccessList = ref<[]>([]),
      userDonutChart = ref<[]>([]);
    const primaryColor = computed(() => {
      timeStemp.value = `lineChart-${new Date().getTime()}`;
      return store.state.themeConfig.colorConfig.primaryColor;
    });

    axios.get("/api/getUserAccessList").then((res) => {
      userAccessList.value = res.data.data;
    });
    axios.get("/api/donutChart").then((res) => {
      userDonutChart.value = res.data.data;
    });
    return {
      userDonutChart,
      userAccessList,
      primaryColor,
      timeStemp,
    };
  },
};
</script>
<style>
.content-body {
  background: none !important;
}
.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 10px;
}
.span-col-2 {
  grid-column: span 2 / auto;
}

.span-col-3 {
  grid-column: span 3 / auto;
}
.span-col-5 {
  grid-column: span 5 / auto;
}

.span-col-4 {
  grid-column: span 4 / auto;
}
.home-icon {
  width: 32px;
}
</style>
