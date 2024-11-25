import { LAYOUT } from '@/router/constant';
import type { AppRouteRecordRaw } from '@/router/types';
const componentsRouter: AppRouteRecordRaw = {
    'path': '/material',
    'name': 'material',
    'sort': 20,
    'meta': {
        'icon': 'icon-wuliaobaozhuangdan',
        'keepAlive': true,
        'title': '物料',
        'auth': ['admin']
    },
    'component': LAYOUT,
    'children': [
        {
            'path': '/table',
            'name': 'table',
            'meta': {
                'title': '表格'
            },
            'component': () => import('@/views/components/table/index.vue')
        },
        {
            'path': '/draggleable',
            'name': 'draggleable',
            'meta': {
                'title': '拖拽'
            },
            'component': () => import('@/views/chart/index.vue')
        },
        {
            'path': '/map',
            'name': 'map',
            'meta': {
                'title': '地图'
            },
            'component': () => import('@/views/components/map/index.vue')
        },
        {
            'path': '/video',
            'name': 'video',
            'meta': {
                'title': '视频'
            },
            'component': () => import('@/views/components/video/index.vue')
        },
        {
            'path': '/editor',
            'name': 'editor',
            'meta': {
                'title': '富文本编辑器'
            },
            'component': () => import('@/views/components/editor/index.vue')
        }
    ]
};

export default componentsRouter;
