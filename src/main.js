require('@/config/constant-http-code');
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import 'vue-ldc-axios';
window.Vue = Vue;
window.$store = store;
import router from './router';
window.$router = router;
const EventBus = new Vue();
Vue.prototype.$eventBus = EventBus;

import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
loadProgressBar();

import VueMce from 'vue-mce';
Vue.use(VueMce);

Vue.config.productionTip = false;

require('@/config/component');
require('@/config/window');
require('@/config/property');
require('@/config/socket');
require('@/js/all.js');
import '@/assets/scss/main.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
