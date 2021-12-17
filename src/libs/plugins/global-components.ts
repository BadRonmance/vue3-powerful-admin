import { App, Component } from 'vue';
interface FileType {
    [key: string]: Component,
}
interface componentItem {
    name: string,
    sfc: Component
}
const commonFiles: Record<string, FileType> = import.meta.globEager('/src/components/*/index.ts'),
    ComponentList: componentItem[] = [],
    Files: Record<string, FileType> = Object.assign(commonFiles);

Object.keys(Files).forEach((e: string) => {
    const keyData = e.split('/');

    keyData[3] = `sx-${keyData[3]}`;
    const component = Files[e]?.default;

    ComponentList.push({ 'name': keyData[3] as string, 'sfc': component });

});

function set(app: App<Element>) {
    ComponentList.map(item => {
        app.component(item.name, item.sfc);
    });

}
export default set;

