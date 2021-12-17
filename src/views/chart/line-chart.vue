<!--
 * @Description: 当折线图
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-15 10:44:07
 * @LastEditTime: 2021-12-03 10:40:04
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\chart\line-chart.vue
-->
<template>
  <div :id="timeStemp"></div>
</template>

<script lang="ts">
import { nextTick } from 'vue';
export default {
    'props': {
        'timeStemp': {
            'type': String,
            'default': 'line-chart'
        },
        'VisitsData': {
            'type': Array,
            'default': () => {
                return [];
            }
        }
    },
    setup(props, context) {
        const funName = async () => {
            await nextTick();
            var chart = new G2.Chart({
                'container': props.timeStemp,
                'forceFit': true
            });

            chart.source(props.VisitsData);
            chart.scale('value', {
                'min': 0
            });
            chart.scale('year', {
                'range': [0, 1]
            });
            chart.tooltip({
                'crosshairs': {
                    'type': 'line'
                }
            });
            chart.line().position('year*value');
            chart.point().position('year*value').size(4).shape('circle').style({
                'stroke': '#fff',
                'lineWidth': 1
            });
            chart.render();
        };

        funName();
    }
};
</script>
