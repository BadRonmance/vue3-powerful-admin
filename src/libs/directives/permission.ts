/*
 * @Description: 权限节点验证
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-29 14:38:40
 * @LastEditTime: 2021-12-10 17:20:45
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\libs\directives\permission.ts
 */

const permission = {
    mounted(el: any, binding: any) {
        let jurisdiction = [
            {
                FunctionId: 1,
                FunctionName: "添加用户",
                ViewType: "Add"
            }
        ],
            btnValue = binding.value;
        if (jurisdiction) {
            let hasBtn =
                jurisdiction.findIndex((val) => val.FunctionId == btnValue) != -1;

            if (!hasBtn) {
                el.parentNode.removeChild(el);
            }
        }
        // el.addEventListener("click", () => {
        //     el.parentNode.removeChild(el);
        // });
    }
};

export default permission;