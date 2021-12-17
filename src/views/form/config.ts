
import { initDate } from '../../libs/utils/date';
let ruleData = {
    'UserName': [
        {
            'required': true,
            'message': '请输入***',
            'trigger': 'blur'
        },
        {
            'min': 3,
            'max': 5,
            'message': '字符长度应该在3-5个',
            'trigger': 'blur'
        }
    ],
    'radio': [
        {
            'required': true,
            'message': '请选择任意一项',
            'trigger': 'change'
        }
    ],
    'timeSelect': [
        {
            'required': true,
            'message': '请选择时间',
            'trigger': 'change'
        }
    ],
    'timePicker': [
        {
            'required': true,
            'message': '请选择时间范围',
            'trigger': 'change'
        }
    ],
    'datePicker': [
        {
            'required': true,
            'message': '请选择日期范围',
            'trigger': 'change'
        }
    ],
    'number': [
        {
            'required': true,
            'message': '请输入数字',
            'trigger': 'blur'
        },
        {
            'pattern': /^(1|[1-9]\d?|100)$/,
            'message': '数字可输入范围为1-100',
            'trigger': 'blur'
        }
    ],
    'select': [
        {
            'required': true,
            'message': '请选择任意一项',
            'trigger': 'change'
        }
    ]
};
const basicFormData = [
        {
            'prop': 'UserName',
            'formType': 'inputString',
            'span': 24,
            'push': 0,
            'label': '输入框：',
            'offset': 0,
            'show': true,
            'showWordLimit': false,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '请输入您的姓名',
            'suffixIcon': {
                'text': {
                    'label': ''
                },
                'icon': {
                    'label': 'iconfont icon-shouyex'
                }
            }
        },
        {
            'prop': 'radio',
            'formType': 'radio',
            'span': 24,
            'push': 0,
            'label': '单项选择器：',
            'offset': 0,
            'radioData': [
                {
                    'label': '苹果',
                    'value': 'apple'
                },
                {
                    'label': '香蕉',
                    'value': 'banana'
                },
                {
                    'label': '橙子',
                    'value': 'orange'
                }
            ],
            'show': true,
            'clearable': false,
            'placeholder': '请选择任意一项'
        },
        {
            'prop': 'datePicker',
            'formType': 'datePicker',
            'span': 24,
            'push': 0,
            'label': '日期选择器：',
            'offset': 0,
            'isRange': true,
            'dateType': 'daterange',
            'format': 'YYYY-MM-DD',
            'rangeSeparator': '至',
            'startPlaceholder': '请选择开始日期',
            'endPlaceholder': '请选择结束日期',
            'show': true,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '请选择日期'
        },
        {
            'prop': 'number',
            'formType': 'number',
            'label': '数字输入框：',
            'span': 24,
            'push': 0,
            'offset': 0,
            'show': true,
            'clearable': false,
            'disabled': false,
            'controls': false,
            'precision': 0,
            'maxlength': 20,
            'placeholder': '123'
        },
        {
            'prop': 'select',
            'formType': 'select',
            'label': '下拉选择器：',
            'span': 24,
            'push': 0,
            'offset': 0,
            'show': true,
            'selectData': [
                {
                    'label': '苹果',
                    'value': 'apple'
                },
                {
                    'label': '香蕉',
                    'value': 'banana'
                },
                {
                    'label': '橙子',
                    'value': 'orange'
                }],
            'filterable': false,
            'clearable': false,
            'multiple': false,
            'placeholder': '请选择'
        },
        {
            'prop': 'appendIcon',
            'formType': 'inputTextarea',
            'span': 24,
            'push': 0,
            'label': '多行文本框：',
            'offset': 0,
            'show': true,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '多行文本框'
        }
    ],
    formData = [
        {
            'prop': 'UserName',
            'formType': 'inputString',
            'span': 24,
            'push': 0,
            'label': '输入框：',
            'offset': 0,
            'show': true,
            'showWordLimit': false,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '请输入您的姓名',
            'suffixIcon': {
                'text': {
                    'label': ''
                },
                'icon': {
                    'label': 'iconfont icon-shouyex'
                }
            }
        },
        {
            'prop': 'radio',
            'formType': 'radio',
            'span': 24,
            'push': 0,
            'label': '单项选择器：',
            'offset': 0,
            'radioData': [
                {
                    'label': '苹果',
                    'value': 'apple'
                },
                {
                    'label': '香蕉',
                    'value': 'banana'
                },
                {
                    'label': '橙子',
                    'value': 'orange'
                }
            ],
            'show': true,
            'clearable': false,
            'placeholder': '请选择任意一项'
        },
        {
            'prop': 'checkBox',
            'formType': 'checkBox',
            'span': 24,
            'push': 0,
            'label': '多项选择器：',
            'offset': 0,
            'checkBoxData': [
                {
                    'label': '苹果',
                    'value': 'apple'
                },
                {
                    'label': '香蕉',
                    'value': 'banana'
                },
                {
                    'label': '橙子',
                    'value': 'orange'
                }
            ],
            'show': true,
            'clearable': false,
            'placeholder': '请选择任意一项'
        },
        {
            'prop': 'timeSelect',
            'formType': 'timeSelect',
            'span': 24,
            'push': 0,
            'label': '时间选择器：',
            'offset': 0,
            'show': true,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '请选择时间'
        },
        {
            'prop': 'timePicker',
            'formType': 'timePicker',
            'span': 24,
            'push': 0,
            'label': '时间范围选择：',
            'offset': 0,
            'isRange': true,
            'dateType': 'daterange',
            'format': 'YYYY-MM-DD',
            'rangeSeparator': '至',
            'startPlaceholder': '请选择开始时间',
            'endPlaceholder': '请选择结束时间',
            'show': true,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '请选择时间'
        },
        {
            'prop': 'datePicker',
            'formType': 'datePicker',
            'span': 24,
            'push': 0,
            'label': '日期选择器：',
            'offset': 0,
            'isRange': true,
            'dateType': 'daterange',
            'format': 'YYYY-MM-DD',
            'rangeSeparator': '至',
            'startPlaceholder': '请选择开始日期',
            'endPlaceholder': '请选择结束日期',
            'show': true,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '请选择日期'
        },
        {
            'prop': 'text',
            'formType': 'text',
            'label': '展示文本：',
            'span': 24,
            'push': 0,
            'offset': 0,
            'show': true,
            'toolTip': {
                'show': true,
                'placement': 'top',
                'effect': 'dark'
            },
            'style': '',
            'maxlength': 20
        },
        {
            'prop': 'number',
            'formType': 'number',
            'label': '数字输入框：',
            'span': 24,
            'push': 0,
            'offset': 0,
            'show': true,
            'clearable': false,
            'disabled': false,
            'controls': false,
            'precision': 0,
            'maxlength': 20,
            'placeholder': '123'
        },
        {
            'prop': 'select',
            'formType': 'select',
            'label': '下拉选择器：',
            'span': 24,
            'push': 0,
            'offset': 0,
            'show': true,
            'selectData': [
                {
                    'label': '苹果',
                    'value': 'apple'
                },
                {
                    'label': '香蕉',
                    'value': 'banana'
                },
                {
                    'label': '橙子',
                    'value': 'orange'
                }],
            'filterable': false,
            'clearable': false,
            'multiple': false,
            'placeholder': '请选择'
        },
        {
            'prop': 'appendIcon',
            'formType': 'inputTextarea',
            'span': 24,
            'push': 0,
            'label': '多行文本框：',
            'offset': 0,
            'show': true,
            'clearable': false,
            'maxlength': 20,
            'placeholder': '多行文本框'
        },
        {
            'prop': 'cabin',
            'formType': 'slot',
            'span': 24
        },
        {
            'prop': 'formItemSlot',
            'formType': 'formItemSlot',
            'label': '局部插槽：',
            'span': 24
        },
        {
            'prop': 'btnSlot',
            'formType': 'formItemSlot',
            'label': '',
            'span': 24
        }
    ],
    formValue = {
        'appendIcon': '',
        'suffixIcon': '',
        'text': '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式。',
        'number': 0,
        'timePicker': [],
        'timeSelect': ''
    },
    changeFormVal = {
        'UserName': '测试名称',
        'radio': 'banana',
        'timeSelect': '10:00',
        'timePicker': [
            new Date(`${initDate('', 'YYYY-MM-DD')} 13:09:33`),
            new Date(`${initDate('', 'YYYY-MM-DD')} 14:09:46`)
        ],
        'datePicker': [new Date('2022-10-01'), new Date('2022-10-07')],
        'number': 66,
        'select': 'apple',
        'appendIcon': '“猴子是我杀的。”三藏提着如意棒说，“天蓬和卷帘也是我杀的。”当五百年的执念都在往生咒的金光中消散如烟，那些饱受时间折磨的人到底为了什么而战，又为了什么而活？',
        'text': '这是变更后的文本'
    },
    layout = {
        'labelWidth': '130px',
        'gutter': 10,
        'size': 'medium'
    };

export default {
    ruleData,
    formData,
    formValue,
    changeFormVal,
    layout,
    basicFormData
};
