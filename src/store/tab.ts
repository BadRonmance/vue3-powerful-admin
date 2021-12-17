
import { basicRoute } from '@/router/routes/basic';
import type { AppRouteRecordRaw } from '@/router/types';
interface TabItem {
    name: string,
    path: string,
    cmpName: string
}
export default ({
    'namespaced': true,
    'state': {
        'openTab': [{
            'name': '/home',
            'title': '工作台'
        }],
        'activeValue': ''
    },
    'getters': {
        'getActiveValue': (state: any) => state.activeValue,
        'getCmpName': (state: any, path: string) => {
            let tabInfo = state.openTab.find((val: { name: string }) => val.name === path);

            return tabInfo.cmpName || '';
        }
    },
    'mutations': {
        async deleteTab(state: any, data: string) {
            if (state.openTab.length <= 1) {
                state.activeValue = state.openTab[0].name;
                return;
            }
            const index: number = state.openTab.findIndex(
                (item: { name: string }) => item.name === data
            );

            index !== -1 && state.openTab.splice(index, 1);
            const length = state.openTab.length - 1;

            state.activeValue = state.openTab[length].name;
            return true;
        },
        updateTab() {

        },
        addTab(state: any, data: AppRouteRecordRaw) {
            if (basicRoute.findIndex(val => val.path === data.path) !== -1) {
                return;
            }
            if (state.openTab.findIndex((val: AppRouteRecordRaw) => val.name === data.path) !== -1) {
                return;
            }
            const tabItem = {
                'title': data.meta.title,
                'name': data.path,
                'cmpName': data.meta.cmpName || ''
            };

            state.openTab.push(tabItem);
        },
        setTabValue(state: any, path: string) {
            state.activeValue = path;
        }
    }
});