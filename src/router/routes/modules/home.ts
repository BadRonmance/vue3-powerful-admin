import { LAYOUT } from '@/router/constant';
import type { AppRouteRecordRaw } from '@/router/types';

const homeRouter: AppRouteRecordRaw = {
    'path': '/dashboard',
    'name': 'dashboard',
    'sort': 10,
    'meta': {
        'icon': 'icon-shouyex',
        'keepAlive': true,
        'title': '首页',
        'auth': ['admin']
    },
    'component': LAYOUT,
    'children': [
        {
            'path': '/home',
            'name': 'home',
            'meta': {
                'title': '工作台',
                'cmpName': 'home',
                'keepAlive': true
            },
            'component': () => import('@/views/home/home.vue')
        }
    ]
};

export default homeRouter;