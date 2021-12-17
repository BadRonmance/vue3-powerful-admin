import { LAYOUT } from '@/router/constant';
import type { AppRouteRecordRaw } from '@/router/types';

const jurisdictionRouter: AppRouteRecordRaw = {
    'path': '/jurisdiction',
    'name': 'jurisdiction',
    'sort': 40,
    'meta': {
        'title': '权限',
        'icon': 'icon-quanxianguanli',
        'keepAlive': true,
        'auth': ['admin']
    },
    'component': LAYOUT,
    'children': [
        {
            'path': '/page',
            'name': 'page',
            'meta': {
                'title': '页面权限'
            },
            'component': () => import('@/views/jurisdiction/page-jurisdiction/index.vue')
        },
        {
            'path': '/button',
            'name': 'button',
            'meta': {
                'title': '按钮权限'
            },
            'component': () => import('@/views/jurisdiction/button-jurisdiction/index.vue')
        }
    ]
};

export default jurisdictionRouter;
