// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue';
import App from './App.vue';
import './plugins/base';
import './plugins/index';
import './plugins/chartist';
import './plugins/vee-validate';
import './plugins/SpinnerPlugin';
import './interceptors';
import cookies from 'vue-cookies';
import inject from './VueInstanceInject';
import store from '@/store';

Vue.prototype.$cookies = cookies;
Vue.config.productionTip = false;

Vue.directive('can', {
  inserted(el, binding, vnode, old) {
    var permissions = store.state.user.permissoes;
    if (!permissions.includes(binding.value)) {
      vnode.elm.parentElement.removeChild(vnode.elm)
    }
  }
});

new Vue({
  ...inject,
  render: h => h(App),
}).$mount('#app');
