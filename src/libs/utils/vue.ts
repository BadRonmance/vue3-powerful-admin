import { useRouter } from 'vue-router';
import {getCurrentInstance } from 'vue';

class vueRoute{
    route = {};
    constructor(){
        const route: { value: { path: string } } = useRouter().currentRoute;

        this.route = route;
    }
    getRoute(){
        return this.route;
    }
}
function instanceProxy(){
    const instance: any = getCurrentInstance();

    return instance.proxy;
}
export default {
    instanceProxy,
    vueRoute
};