/*
 * @Description: 关于form表单 设置默认值的自定义hooks
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-25 16:25:22
 * @LastEditTime: 2021-12-10 11:39:56
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\hooks\form.ts
 */

import { reactive } from 'vue';
interface FormItem {
    prop: string;
    span: number;
    label: string;
    formType: string;
    push: number;
    offset: number;
    show: boolean;
    disabled: boolean;
    regular: string;
    directives: string;
    showWord: boolean;
    placeholder: string;
    clearable: boolean;
    maxlength: number;
    max: number;
    controls: boolean;
    precision: number;
    min: number;
    multiple: boolean;
    suffixIcon: {
        icon: string;
        type: string;
        iconColor: string;
        text: string;
        textColor: string;
    };
    appendIcon: {
        icon: string;
        type: string;
        iconColor: string;
        text: string;
        textColor: string;
    };
    container: {
        style: {
            width: string;
            height: string;
        };
    };
}
// 设置每种表单内容的默认值
let defaultPropVal = reactive({
    'select': '',
    'selectArray': [],
    'inputString': '',
    'inputTextarea': '',
    'number': 0,
    'radio': '',
    'timePicker': [],
    'timeSelect': '',
    'datePicker': '',
    'checkBox': []
});

export const setDefaultFormVal = (formItem: FormItem) => {
    let defaultFormVal = formItem.formType === 'select' ?
        defaultPropVal[
            formItem.multiple ? `${formItem.formType}Array` : formItem.formType
        ] :
        defaultPropVal[formItem.formType];

    return defaultFormVal;
};