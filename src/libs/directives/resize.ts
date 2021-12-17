/*
 * @Description: 监听元素宽度大小变化
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-21 10:31:40
 * @LastEditTime: 2021-12-08 17:04:04
 * @LastEditors: 天生不是宠儿
 */

const resize = {
    'beforeMount': function (el: any, binding: any) {
        let width = '', height = '';

        function get() {
            const style = document.defaultView.getComputedStyle(el);

            if (width !== style.width || height !== style.height) {
                binding.value({ width, height });
            }
            width = style.width;
            height = style.height;
        }

        el.__vueReize__ = setInterval(get, 200);
    },
    beforeUnmount(el: { __vueReize__: NodeJS.Timeout; }) {
        clearInterval(el.__vueReize__);
    }
};

export default resize;
