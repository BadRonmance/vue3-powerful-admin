/*
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 张泽锋
 * @Date: 2021-06-03 09:09:32
 * @LastEditTime: 2021-12-10 11:32:39
 * @LastEditors: 天生不是宠儿
 */

/**
 * @description: 单一数组去重
 * @version: 1.0.0
 * @param {*} arr 数据源
 * @return {*} Array
 * @author: 张泽锋
 * @Date: 2021-04-09 16:19:09
 */
export const unique = (arr: object[]) => {
    return Array.from(new Set(arr));
};

/**
 * @description: 获取数组一不包含数组二的部分
 * @version: 1.0.0
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 * @return {*} Array
 * @author: 张泽锋
 * @Date: 2021-04-09 16:18:58
 */
export const subSet = (arr1: object[], arr2: object[]) => {
    var set1 = new Set(arr1),
        set2 = new Set(arr2),
        subset = [];

    for (let item of set1) {
        if (!set2.has(item)) {
            subset.push(item);
        }
    }
    return subset;
};
/**
 * @description: 获取某个元素在数据中的索引
 * @version: 1.0.0
 * @param {*} data  数据源
 * @param {*} prop 该元素的键名
 * @param {*} value 该元素的值
 * @return {*} Number 返回该元素对应的索引
 * @author: 张泽锋
 * @Date: 2021-04-09 16:28:50
 */
export const getArrayIndex = (data: object[], prop: string | number, value: any) => {
    const index = data.findIndex((val) => val[prop] === value);

    return index;
};
