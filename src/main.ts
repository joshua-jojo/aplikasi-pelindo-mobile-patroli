import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://192.168.175.195:8000/api'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
// import './theme/variables.css';
import './assets/tailwind.css'

const app = createApp(App)
  .use(IonicVue)
  .use(VueAxios, axios)
  .use(router);
app.provide('axios', app.config.globalProperties.axios)

router.isReady().then(() => {
  app.mount('#app');
  defineCustomElements(window);
});