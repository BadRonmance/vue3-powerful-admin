/*
 * @Description: 自定义正则过滤
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-26 13:14:07
 * @LastEditTime: 2021-11-26 13:14:41
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\libs\directives\regular.ts
 */

const regular = {
        'bind': function (el: { getElementsByTagName: (arg0: string) => any[]; }, binding: { value: { type: string; reg: any; }; }) {
            if (binding.value.type !== 'regular') {
                return;
            }
            const input = el.getElementsByTagName('input')[0];

            input.onblur = function () {
                input.value = input.value.replace(binding.value.reg, '');
            };
            trigger(input, 'input');
        }
    },

    trigger = (el: { dispatchEvent: (arg0: Event) => void; }, type: string) => {
        const e = document.createEvent('HTMLEvents');

        e.initEvent(type, true, true);
        el.dispatchEvent(e);
    };

export default regular;
