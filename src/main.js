import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
