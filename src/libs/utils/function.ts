/**
 * @description: 判断数据类型
 * @version: 1.0.0
 * @param {*} data 源数据
 * @return {*} String
 * @author: 张泽锋
 * @Date: 2021-05-20 11:37:21
 */
export const dataType = (data: any) => {
    return Object.prototype.toString
        .call(data)
        .replace(/\[|]/g, '')
        .split(' ')[1];
};
export const objToString = (data: any) => {
    let strList = [];

    for (let i in data) {
        strList.push(`${i}:${data[i]}`);
    }
    return strList.join(';');
};
/**
 * @description: 深拷贝
 * @version: 1.0.0
 * @param {*} target
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-04-09 16:20:55
 */
export const deepcopy = (target: any) => {
    // 定义一个变量
    let result: any;
    // 如果当前需要深拷贝的是一个对象的话

    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepcopy(target[i]));
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target instanceof Date) {
            result = new Date(target);
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepcopy(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
};
/**
 * @description: 文本复制
 * @version: 1.0.0
 * @param {*} value
 * @return {*}
 * @author: 张泽锋
 * @Date: 2021-05-20 09:36:11
 */
export const copy = (value: string) => {
    var copyLabel = document.createElement('input'); // !创建一个隐藏input

    copyLabel.value = value; // !赋值
    document.body.appendChild(copyLabel);
    copyLabel.select(); // !选择对象
    document.execCommand('Copy'); // !执行浏览器复制命令
    document.body.removeChild(copyLabel); // !标签删除
};
import { ConfigItem } from '@/store/types';
export const getThemeConfig = (data: ConfigItem[], name: string) => {
    let configVal = data.find((val: ConfigItem) => val.name === name);

    return configVal ? configVal.val : false;
};
/**
 * @description: 十六进制颜色转RGB颜色
 * @version: 1.0.0
 * @param {string} e
 * @return {*}
 * @author: 天生不是宠儿
 * @Date: 2021-12-08 15:40:53
 */
export const colorHex = (e: string) => {
    if (!e) {
        return;
    }
    var sColor = e.toLowerCase(),
        //十六进制颜色值的正则表达式
        reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色

    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#';

            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];

        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
        }
        return sColorChange.join(',');
    }
    return sColor;
};