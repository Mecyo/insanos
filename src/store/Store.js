import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './Mutations';
import actions from './Actions';
import getters from './Getters';

Vue.use(Vuex);

// Declaração da Store do sistema
// Nesta store deve ser colocada todas as informações que são compartilhadas entre
// todos os componentes
const store = new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    user: null,
    token: null,
  },
  mutations,
  actions,
  getters,
});

export default store;
