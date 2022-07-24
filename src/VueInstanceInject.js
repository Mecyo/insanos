import i18n from '@/i18n';
import store from '@/store';
import router from '@/router';
import vuetify from './plugins/vuetify';


///Vue.use(VueCookie);

// Propriedades que vão ser injetadas:
//  - na instancia Root do Vue
//  - na instancia dos Dialog
export default {
  i18n,
  store,
  router,
  vuetify,
};