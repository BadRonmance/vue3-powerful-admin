/*
 * @Description: 函数节流
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-26 13:29:22
 * @LastEditTime: 2021-11-26 13:29:45
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\libs\directives\throttle.ts
 */

const throttle = {
    'inserted': function (el: { addEventListener: (arg0: string, arg1: () => void) => void; }, binding: { value: () => void; }) {
        let timmer = true;

        el.addEventListener('click', () => {
            if (timmer) {
                binding.value();
                timmer = false;
                setTimeout(() => {
                    timmer = true;
                }, 2000);
            }
        });
    }
};

export default throttle;
