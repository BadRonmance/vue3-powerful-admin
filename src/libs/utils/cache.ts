import store from '../../store/index';

export const addCache = (to: any) => {
    store.commit('cache/addCache', to);
};
export const updateCacheScroll = (from: any, scrollTop: number) => {
    store.commit('cache/updateCacheScroll', {
        'from': from,
        'scrollTop': scrollTop
    });
};