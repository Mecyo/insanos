import * as types from './MutationTypes';

// Declaração de todos os mutations
export default {
  // Mutation responsável por atualização do usuário logado
  [types.UPDATE_USER](state, payload) {
    state.user = payload;
  },

  // Mutation responsável por atualização do token atual
  [types.UPDATE_TOKEN](state, payload) {
    state.token = payload;
  },

  // Mutation responsável por atualização da bar image atual
  [types.SET_BAR_IMAGE](state, payload) {
    state.barImage = payload
  },
  
  // Mutation responsável por atualização do drawer atual
  [types.SET_DRAWER](state, payload) {
    state.drawer = payload
  },
};
