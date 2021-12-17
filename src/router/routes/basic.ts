import { LAYOUT } from '@/router/constant';

export const basicRoute = [
    {
        'path': '/',
        'name': '',
        'component': LAYOUT,
        'redirect': '/home'
    },
    {
        'path': '/login',
        'component': () => import('@/views/sign-in/login.vue')
    },
    {
        'path': '/404',
        'name': '404',
        'component': () => import('@/views/error-page/404.vue')
    }
];