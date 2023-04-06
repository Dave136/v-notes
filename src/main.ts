import { createApp } from 'vue';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import './index.css';
import 'vue-toast-notification/dist/theme-sugar.css';

import pinia from './plugins/pinia';
import router from './router';

createApp(App).use(router).use(pinia).use(VueToast).mount('#app');
