export const formData = [
    {
        'prop': 'menuType',
        'formType': 'text',
        'label': '类型：',
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
        'prop': 'menuTitle',
        'formType': 'inputString',
        'label': '标题：',
        'show': true,
        'maxlength': 20,
        'placeholder': '请输入标题，必填'
    },
    {
        'prop': 'menuPath',
        'formType': 'inputString',
        'label': '路径：',
        'show': true,
        'maxlength': 20,
        'placeholder': '请输入路径，必填'
    },
    {
        'prop': 'menuAuth',
        'formType': 'inputString',
        'label': '权限：',
        'show': true,
        'maxlength': 20,
        'placeholder': '请输入权限，逗号分隔'
    },
    {
        'prop': 'menuBtn',
        'formType': 'formItemSlot',
        'label': '',
        'show': true,
        'maxlength': 20,
        'placeholder': '请输入权限，逗号分隔'
    }
];