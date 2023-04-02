import { createApp } from 'vue';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import './index.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import pinia from './plugins/pinia';

createApp(App).use(pinia).use(VueToast).mount('#app');
