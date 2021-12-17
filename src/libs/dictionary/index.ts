/**
 * @description: 数据字典
 * @version: 1.0.0
 * @param {*}
 * @return {*}
 * @author: 天生不是宠儿
 * @Date: 2021-11-26 10:58:09
 */
import { dataType } from '@/libs/utils/function';
interface ArrayValue {
    label: string;
    value: number | string | boolean
}
export default {
    'sex': [
        {
            'label': '男',
            'value': 1
        },
        {
            'label': '女',
            'value': 2
        }
    ],
    'userStatus': [
        {
            'label': '启用',
            'value': 0
        },
        {
            'label': '禁用',
            'value': 1
        }
    ],
    'roleStatus': [
        {
            'label': '启用',
            'value': 0
        },
        {
            'label': '禁用',
            'value': 1
        }
    ],
    'getVal': function (key = '', value: string | number, dataList = []) {
        if (!key || key === '') {
            return;
        }
        const data = this[key].find((val: any) => val.value === value);

        return data ? data.label : '';
    },
    'getArrayVal': function (key = '', value: ArrayValue[] = []) {
        if (!key || key === '' || dataType(value) !== 'Array') {
            return;
        }
        let labelData: string[] = [];

        value.map((el) => {
            let labelItem = this[key].filter((item: any) => {
                return item.value === el;
            });

            labelItem.length && labelData.push(labelItem[0].label);
        });
        return labelData;
    }
};