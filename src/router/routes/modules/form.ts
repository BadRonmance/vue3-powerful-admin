import { LAYOUT, LEVEL } from '@/router/constant';
import type { AppRouteRecordRaw } from '@/router/types';

const formRouter: AppRouteRecordRaw = {
    'path': '/form',
    'name': 'form',
    'sort': 30,
    'meta': {
        'icon': 'icon-wodeshenqingbiaodan',
        'keepAlive': true,
        'title': '表单'
    },
    'component': LAYOUT,
    'children': [
        {
            'path': '/ceshiform',
            'name': 'ceshiform',
            'component': LEVEL,
            'meta': {
                'title': '测试多级表单'
            },
            'children': [
                {
                    'path': '/basic-form',
                    'name': 'basicForm',
                    'meta': {
                        'cmpName': 'basicForm',
                        'title': '基础表单',
                        'keepAlive': true
                    },
                    'component': () => import('@/views/form/basic-form/index.vue')
                }
            ]
        },
        {
            'path': '/advanced-form',
            'name': 'advancedForm',
            'meta': {
                'cmpName': 'advancedForm',
                'title': '高级表单',
                'keepAlive': true
            },
            'component': () => import('@/views/form/advanced-form/index.vue')
        },
        {
            'path': '/linkage-form',
            'name': 'linkageForm',
            'meta': {
                'cmpName': 'linkageForm',
                'title': '表单联动',
                'keepAlive': true
            },
            'component': () => import('@/views/form/linkage-form/index.vue')
        },
        {
            'path': '/event-form',
            'name': 'eventForm',
            'meta': {
                'cmpName': 'eventForm',
                'title': '表单事件',
                'keepAlive': true
            },
            'component': () => import('@/views/form/event-form/index.vue')
        }
    ]
};

export default formRouter;
