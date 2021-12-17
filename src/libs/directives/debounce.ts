/*
 * @Description: 函数防抖
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 16:34:46
 * @LastEditTime: 2021-11-26 13:12:57
 * @LastEditors: 天生不是宠儿
 */
const debounce = {
    'inserted': function (el: { addEventListener: (arg0: string, arg1: () => void) => void; }, binding: { value: () => void; }) {
        let timmer: NodeJS.Timeout;

        el.addEventListener('click', () => {
            if (timmer) {
                clearTimeout(timmer);
            }
            timmer = setTimeout(() => {
                binding.value();
            }, 2000);
        });
    }
};

export default debounce;
