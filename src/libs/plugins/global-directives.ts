import { App, Component } from 'vue';
interface FileType {
    [key: string]: Component,
}
interface componentItem {
    name: string,
    sfc: Component
}
const commonFiles: Record<string, FileType> = import.meta.globEager('/src/libs/directives/*.ts'),

    ComponentList: componentItem[] = [],
    Files: Record<string, FileType> = Object.assign(commonFiles);

Object.keys(Files).forEach((e: string) => {
    const keyData = e.split('/');
    let key = keyData[4].split('.')[0];
    const component = Files[e].default;

    ComponentList.push({ 'name': key as string, 'sfc': component });

});

function set(app: App<Element>) {
    ComponentList.map(item => {
        app.directive(item.name, item.sfc);
    });

}
export default set;

