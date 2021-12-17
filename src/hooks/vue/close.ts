import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export const clearPageCache = () => {

    const vueStore = useStore(),
        vueRoute = useRoute(),
        vueRouter = useRouter();

    vueStore.commit('tab/deleteTab', vueRoute.path);
    vueStore.commit('cache/deleteCache', 'userSystem');
    vueRouter.go(-1);
};