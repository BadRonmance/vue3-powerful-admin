import type { PropItem, FixedAttr, Operation } from '@/types/table';

export interface UserItem {
    userName: string,
    account: string,
    phone: string,
    email: string,
    avatar?: string,
    sex: number,
    status: number,
    strSex?: string,
    strStatus?: string,
    customRowStyle?: {
        background?: string,
        color?: string,
    },
    creatTime: string,
    updateTime: string,
}
export interface RoleItem {
    roleName: string,
    roleVal: string,
    sort: number,
    roleStatus: number,
    creatTime: string,
    remark: string,
}

export interface UserTable {
    propData: PropItem[],
    tableData: UserItem[],
    fixedAttr: FixedAttr,
    operation: Operation[]
}
export interface RoleTable {
    propData: PropItem[],
    tableData: RoleItem[],
    fixedAttr: FixedAttr,
    operation: Operation[]
}