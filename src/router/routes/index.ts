const modules = import.meta.globEager('./modules/**/*.ts');

import type { AppRouteRecordRaw } from '@/router/types';
const routeModuleList = () => {
    let moduleList: any = [];

    Object.keys(modules).forEach((key) => {
        let mod = modules[key].default || {},
            modList = Array.isArray(mod) ? [...mod] : [mod];

        moduleList.push(...modList);
    });
    moduleList = moduleList.sort((a: AppRouteRecordRaw, b: AppRouteRecordRaw) => {
        return a.sort! - b.sort!;
    });
    return moduleList;

};

export const permissionRoute = routeModuleList();

// import componentsRouter from "./modules/components"
// import formRouter from "./modules/form"
// import homeRouter from "./modules/home"
// import jurisdictionRouter from "./modules/jurisdiction"
// import systemRouter from "./modules/system"
// export const permissionRoute = [
//     ...homeRouter,
//     ...homeRouter,
//     ...homeRouter,
//     ...homeRouter,
//     ...homeRouter,
// ]