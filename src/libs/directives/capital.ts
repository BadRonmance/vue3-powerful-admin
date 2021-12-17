/*
 * @Description: 自定义大写字母指令
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-21 10:31:40
 * @LastEditTime: 2021-12-10 11:50:19
 * @LastEditors: 天生不是宠儿
 */

const capital = {
    'beforeMount': function (el: any, binding: any) {
        if (binding.value !== 'capital') {
            return;
        }
        const input = el.getElementsByTagName('input')[0];

        input.onblur = function () {
            input.value = input.value.toUpperCase().replace(/[^A-Za-z]/g, '');
        };
        trigger(input, 'input');
    }
}

const trigger = (el: any, type: any) => {
    const e = document.createEvent('HTMLEvents');

    e.initEvent(type, true, true);
    el.dispatchEvent(e);
};

export default capital;
