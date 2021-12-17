<!--
 * @Description: 单折线图
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-15 10:44:07
 * @LastEditTime: 2021-12-03 10:38:03
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\components\donut-chart\src\index.vue
-->
<template>
  <div :id="timeStemp"></div>
</template>

<script lang="ts">
import { ref, nextTick } from "vue";
export default {
  props: {
    timeStemp: {
      type: String,
      default: "dount-chart",
    },
    VisitsData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    auxiliaryText: {
      type: Object,
      default: () => {
        return {
          title: "用户数量",
          quantity: 500,
          company: "人",
        };
      },
    },
  },
  setup(props, context) {
    const funName = async () => {
      await nextTick();
      var chart = new G2.Chart({
        container: props.timeStemp,
        forceFit: true,
        animate: false,
      });

      chart.source(props.VisitsData, {
        percent: {
          formatter: function formatter(val: any) {
            val = val * 100 + "%";
            return val;
          },
        },
      });
      chart.coord("theta", {
        radius: 0.75,
        innerRadius: 0.6,
      });
      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
      });
      // 辅助文本
      chart.guide().html({
        position: ["50%", "50%"],
        html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">${props.auxiliaryText.title}<br><span style="color:#8c8c8c;font-size:20px">${props.auxiliaryText.quantity}</span>${props.auxiliaryText.company}</div>`,
        alignX: "middle",
        alignY: "middle",
      });
      var interval = chart
        .intervalStack()
        .position("percent")
        .color("item")
        .label("percent", {
          formatter: function formatter(val: any, item: any) {
            return item.point.item + ": " + val;
          },
        })
        .tooltip("item*percent", function (item: any, percent: any) {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent,
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff",
        });

      chart.render();
      // interval.setSelected(props.VisitsData[0]);
    };

    funName();
  },
};
</script>
