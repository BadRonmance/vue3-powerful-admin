
import { createRouter, createWebHistory, RouteMeta, RouteRecordRedirectOption } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { addCache, updateCacheScroll } from '../libs/utils/cache';
import { permissionRoute } from '@/router/routes/index';
import { basicRoute } from '@/router/routes/basic';
import type { Component, AppRouteRecordRaw } from '@/router/types';
interface LevelRoute {
    path: string;
    name: string;
    meta: RouteMeta;
    sort?: number;
    component?: Component | string;
    components?: Component;
    children: AppRouteRecordRaw[];
    fullPath?: string;
    redirect: RouteRecordRedirectOption
}
function setRoute(routes: AppRouteRecordRaw[]) {
    let levelRoute: LevelRoute[] = [];
    const transRoute = (index: number, data: AppRouteRecordRaw[]) => {
        data.map((item: AppRouteRecordRaw) => {
            levelRoute[index].children.push({
                'path': item.path,
                'name': item.name,
                'component': item.component,
                'meta': item.meta,
                'sort': item.sort
            });
            item.children && item.children.length && transRoute(index, item.children);
        });
    };

    for (let i = 0; i < routes.length; i++) {
        let obj = {
            'path': routes[i].path,
            'name': routes[i].name,
            'component': routes[i].component,
            'meta': routes[i].meta,
            'sort': routes[i].sort,
            'redirect': routes[i].redirect,
            'children': []
        };

        levelRoute.push(obj);
        transRoute(i, routes[i].children || []);
    }
    return levelRoute;
}
const routes = [...basicRoute, ...setRoute(permissionRoute)];

export const router = createRouter({
    'history': createWebHistory(),
    'routes': routes,
    'strict': true,
    'scrollBehavior': () => ({ 'left': 0, 'top': 0 })
});
router.beforeEach(async (to, from, next) => {
    if (to.matched && to.matched.length > 2) {
        for (let i = 0; i < to.matched.length; i++) {
            const element = to.matched[i];

            if (element.components.default.name === 'level') {
                to.matched.splice(i, 1);
            }
        }
    }
    updateCacheScroll(from, document.documentElement.scrollTop);
    addCache(to);
    NProgress.start();
    next();
});
router.afterEach(() => {
    NProgress.done();
});

// !??????keep-alive????????????????????????????????????

// !????????????????????? ??????????????????????????????????????????
// !???????????????????????????????????? ?????????????????????keep-alive??????????????????????????? ??????????????????????????????????????????