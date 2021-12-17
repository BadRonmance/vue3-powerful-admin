
export interface DataItem {
    label: string,
    value: string | number
}
export interface FormItemIcon {
    text?: {
        label?: string,
        textColor?: string
    },
    icon?: {
        label?: string,
        iconColor?: string
    }
}
export interface ToolTip {
    show?: boolean,
    placement: string,
    effect: string
}
export interface FormItem {
    prop: string,
    formType: string,
    span?: number,
    push?: number,
    label?: string,
    offset?: number,
    precision?: number,
    show?: boolean,
    disabled?: boolean,
    controls?: boolean,
    showWordLimit?: boolean,
    clearable?: boolean,
    isRange?: boolean,
    filterable?: boolean,
    multiple?: boolean,
    dateType?: string,
    format?: string,
    rangeSeparator?: string,
    startPlaceholder?: string,
    endPlaceholder?: string,
    style?: string,
    maxlength?: number,
    placeholder?: string,
    selectData?: DataItem[],
    radioData?: DataItem[],
    checkBoxData?: DataItem[],
    toolTip?: ToolTip,
    suffixIcon?: FormItemIcon,
    appendIcon?: FormItemIcon,
    container?: {
        style?: {
            width: string;
            height: string;
        };
    }

}

export interface Layout {
    labelWidth: string;
    gutter: number;
    span: number;
    size: string;
}
interface RuleItem {
    required?: boolean,
    message?: string,
    trigger?: string,
    min?: number,
    max?: number,
    pattern?: any
}
export interface Rule {
    [key: string]: RuleItem[]
}