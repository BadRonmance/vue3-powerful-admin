import { createStore } from 'vuex';
import slideMenu from './slide-menu';
import tab from './tab';
import cache from './cache';
import createPersistedState from 'vuex-persistedstate';

interface themeItem {
    colorState: string;
    color: string
}

export default createStore({
    'plugins': [
        createPersistedState({
            'key': 'virtualDirectory-vuex',
            'storage': window.sessionStorage,
            reducer(val: any) {
                return {
                    'tab': val.tab,
                    'themeConfig': val.themeConfig
                };
            }
        })
    ],
    'state': {
        'themeConfig': {
            'size': 'small',
            'ProjectCmpSize': [
                {
                    'name': '默认',
                    'size': 'large'
                },
                {
                    'name': '中等',
                    'size': 'medium'
                },
                {
                    'name': '小型',
                    'size': 'small'
                },
                {
                    'name': '超小',
                    'size': 'mini'
                }
            ],
            'colorConfig': {
                'primary': '#4A47B8',
                'success': '#21ba45',
                'warning': '#f2711c',
                'danger': '#db2828',
                // error: "#db2828",
                'info': '#909399'
            },
            'navConfig': [
                {
                    'name': 'HeaderTopNavigator',
                    'title': '显示顶栏菜单',
                    'val': false
                },
                {
                    'name': 'FixedHeader',
                    'title': '固定顶栏',
                    'val': true
                },
                {
                    'name': 'SlideMenuUniqueOpened',
                    'title': '侧边栏开启手风琴模式',
                    'val': false
                },
                {
                    'name': 'ShowCollapseButton',
                    'title': '显示折叠侧边栏按钮',
                    'val': true
                },
                {
                    'name': 'ShowBreadcrumbNavgation',
                    'title': '显示全局面包屑导航',
                    'val': true
                },
                {
                    'name': 'ShowReloadButton',
                    'title': '显示重载页面按钮',
                    'val': false
                },
                {
                    'name': 'ShowMoreLanguage',
                    'title': '显示多语言选择',
                    'val': false
                },
                {
                    'name': 'ShowNotice',
                    'title': '显示通知栏',
                    'val': true
                },
                {
                    'name': 'ShowComponentSize',
                    'title': '显示全局组件大小调整',
                    'val': true
                }
            ],
            'tabConfig': [
                {
                    'name': 'OpenTabs',
                    'title': '开启多页签',
                    'val': false
                },
                {
                    'name': 'ShowTabsIcon',
                    'title': '多页签显示图标',
                    'val': false
                },
                {
                    'name': 'FixedTabs',
                    'title': '固定多页签',
                    'val': false
                }
            ]
        }
    },
    'mutations': {
        setProjectSize(state, size) {
            state.themeConfig.size = size;
        },
        setThemeConfig(state, data: themeItem) {
            state.themeConfig.colorConfig[data.colorState] = data.color;
        },
        setProjectTheme(state, data: themeItem) {
            state.themeConfig.colorConfig[data.colorState] = data.color;
        }
    },
    'modules': {
        slideMenu,
        tab,
        cache
    }
});