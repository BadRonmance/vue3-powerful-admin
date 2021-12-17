import { LAYOUT } from '@/router/constant';
import type { AppRouteRecordRaw } from '@/router/types';

const systemRouter: AppRouteRecordRaw = {
    'path': '/system',
    'name': 'system',
    'sort': 50,
    'meta': {
        'icon': 'icon-set-up-dot',
        'keepAlive': true,
        'title': '系统设置',
        'auth': ['admin']
    },
    'component': LAYOUT,
    'children': [
        {
            'path': '/userSystem',
            'name': 'userSystem',
            'meta': {
                'keepAlive': true,
                'auth': ['admin'],
                'title': '用户管理',
                'cmpName': 'userSystem'
            },
            'component': () => import('@/views/system/user-system/index.vue')
        },
        {
            'path': '/menuSystem',
            'name': 'menuSystem',
            'meta': {
                'keepAlive': true,
                'auth': ['admin'],
                'title': '菜单权限管理',
                'cmpName': 'menuSystem'
            },
            'component': () => import('@/views/system/menu/index.vue')
        },
        {
            'path': '/roleSystem',
            'name': 'roleSystem',
            'meta': {
                'keepAlive': true,
                'auth': ['admin'],
                'title': '角色权限管理',
                'cmpName': 'roleSystem'
            },
            'component': () => import('@/views/system/role/index.vue')
        }
    ]
};

export default systemRouter;
