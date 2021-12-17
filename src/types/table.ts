// 表格prop属性
export interface PropItem {
    type?: string;
    width?: string;
    prop?: string;
    label?: string;
    line?: number;
    color?: string;
    slotName?: string;
}
// 表格特殊配置属性
export interface FixedAttr {
    select?: boolean | string,
    operation?: boolean | string,
    dynamicHeight?: boolean,
    operationWidth?: string | number
}
// 操作栏按钮属性
export interface Operation {
    id?: number,
    type: string,
    plain?: boolean,
    size?: string,
    circle?: boolean,
    loading?: boolean,
    round?: boolean,
    disabled?: boolean,
    autoInsertSpace?: boolean,
    text?: string
}