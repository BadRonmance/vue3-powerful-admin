import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';
import store from './store';
import globalCmps from './libs/plugins/global-components';
import globalDirectives from './libs/plugins/global-directives';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/index.scss';

const app = createApp(App);

globalCmps(app);
globalDirectives(app);

app.use(router).use(store).use(ElementPlus).mount('#app');