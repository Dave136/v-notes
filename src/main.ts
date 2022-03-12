import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import './index.scss';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App)
  .use(createPinia())
  .use(VueToast)
  .mount('#app');
