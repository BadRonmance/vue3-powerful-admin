<!--
 * @Description: 单折线图
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-15 10:44:07
 * @LastEditTime: 2021-12-09 18:30:03
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\components\line-chart\src\index.vue
-->
<template>
  <div :id="timeStemp"></div>
</template>

<script lang="ts">
import { ref, nextTick, computed, watch } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    timeStemp: {
      type: String,
      default: "line-chart",
    },
    VisitsData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    theme: {
      type: String,
      default: "default",
    },
  },
  setup(props: any) {
    const store = useStore(),
      primaryColor = computed(
        () => store.state.themeConfig.colorConfig.primary
      );

    class chartClass {
      [x: string]: any;
      constructor(e: any) {
        this.timeStemp = e.timeStemp;
        this.theme = e.theme;
        this.chart = this.init();
      }
      init() {
        let chart = new G2.Chart({
          container: props.timeStemp,
          forceFit: true,
          theme: props.theme,
        });

        return chart;
      }
      render(repaint = false) {
        this.chart.source(props.VisitsData);
        this.chart.scale("value", {
          min: 0,
        });
        this.chart.scale("label", {
          range: [0, 1],
        });
        this.chart.tooltip({
          crosshairs: {
            type: "line",
          },
        });
        this.chart.line().position("label*value").color(primaryColor.value);
        this.chart
          .point()
          .position("label*value")
          .size(4)
          .color(primaryColor.value)
          .shape("circle")
          .style({
            stroke: "#fff",
            lineWidth: 1,
          });

        repaint ? this.chart.repaint() : this.chart.render();
      }
      clear() {
        this.chart.clear();
      }
      repaint() {
        this.clear();
        setTimeout(() => {
          this.render(true);
        }, 0);
      }
      destroy() {}
    }
    watch(
      () => primaryColor.value,
      () => {
        chart.value.repaint();
      }
    );
    let chart: any = ref(null);
    const funName = async (clear = false) => {
      await nextTick();
      chart.value = new chartClass(props);
      console.log("初次渲染", chart.value);

      chart.value.render();
      // setTimeout(() => {
      //   chart.value.repaint();
      // }, 2000);
    };

    funName();
    return {
      primaryColor,
    };
  },
};
</script>
