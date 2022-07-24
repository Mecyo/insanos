import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'
import i18n from '@/i18n'
import '@/sass/overrides.sass'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

const theme = {
  primary: '#4CAF50',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
}

const veutifyObj = new Vuetify({
    lang: {
      t: (key, ...params) => i18n.t(key, params),
    },
    theme: {
      themes: {
        dark: theme,
        light: theme,
      },
    },
});

Vue.use(VuetifyToast, { $vuetify: veutifyObj.framework })

export default veutifyObj;
