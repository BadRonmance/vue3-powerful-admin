export default ({
    'namespaced': true,
    'state': {
        'cacheList': [],
        'cacheListEnums': {}
    },
    'getters': {
        'getCacheList': (state: any) => state.activeValue
    },
    'mutations': {
        deleteCache(state: any, cmpName: string) {
            let index = state.cacheList.findIndex((val: string) => val === cmpName);

            index !== -1 && state.cacheList.splice(index, 1);
            delete state.cacheListEnums[cmpName];

        },
        addCache(state: any, data: any) {
            if (data.meta && data.meta.cmpName && data.meta.keepAlive) {
                let index = state.cacheList.findIndex((val: string) => val === data.meta.cmpName);

                index === -1 && state.cacheList.push(data.meta.cmpName);
                if (index === -1) {
                    state.cacheListEnums[data.meta.cmpName] = {
                        'scrollTop': 0
                    };
                }
            }
        },
        updateCacheScroll(state: any, data: any) {
            if (data.from.meta && data.from.meta.cmpName) {
                const cmpName = data.from.meta.cmpName;

                if (!state.cacheListEnums[cmpName]) {
                    return;
                }
                state.cacheListEnums[cmpName].scrollTop = data.scrollTop;
            }
        },
        getCacheName(state: any, data: string) {
            let index = state.cacheList.findIndex((val: string) => val === data);

            return index !== -1;
        }
    }
});