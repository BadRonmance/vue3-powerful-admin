/*
 * @Description: 文本复制
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-05-20 16:34:46
 * @LastEditTime: 2021-11-29 14:53:23
 * @LastEditors: 天生不是宠儿
 */
const copy = {
    beforeMount(el: any, binding: any) {
        el.$value = binding.value;
        el.handler = () => {
            if (!el.$value) {
                console.log('无复制内容');
                return;
            }
            const textarea = document.createElement('textarea');

            textarea.readOnly = true;
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            textarea.value = el.$value;
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            const result = document.execCommand('Copy');

            if (result) {
                console.log('复制成功');
            }
            document.body.removeChild(textarea);
        };
        el.addEventListener('click', el.handler);
    },
    componentUpdated(el: { $value: any; }, { value }: any) {
        el.$value = value;
    },
    unbind(el: { removeEventListener: (arg0: string, arg1: any) => void; handler: any; }) {
        el.removeEventListener('click', el.handler);
    }
};

export default copy;
