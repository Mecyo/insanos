import api from '@/api';
import * as types from './MutationTypes';

export default {
  /**
   * Realiza o login do sistema e guarda as informações
   * do usuário e token
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} credentials email e senha do usuário
   */
  login({ commit }, credentials) {
    const cookieName = process.env.VUE_APP_API_COOKIE_NAME;
    $cookies.remove(cookieName);
    $cookies.remove('JSESSIONID');
    return api.post('/authenticate', credentials)
      .then((response) => {
        const token = response.data.token.replace('Bearer ', '');
        commit(types.UPDATE_USER, response.data);
        commit(types.UPDATE_TOKEN, token);
        $cookies.set(cookieName, token)

        return response.data;
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          this.$toast.error("Falha ao efetuar o login: " + error.response.data.error, {
            dismissable: true,
            x: 'center',
            y: 'top',
            timeout: 4000,
          })
        }
        console.log(error);
      });
  },

  /**
   * Realiza o logout do sistema, para isso basta apagar todas as informações
   * do state que são relativas a autenticação
   * @param {*} commit, função derivada do contexto da store
   */
  logout({ commit }) {
    $cookies.remove(process.env.VUE_APP_API_COOKIE_NAME);
    commit(types.UPDATE_USER, null);
    commit(types.UPDATE_TOKEN, null);
  },
  /**
   * Atualiza o profile do usuário
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} user, dados do usuário
   */
  updateProfile({ commit }, user) {
    return axios.put('profile', user).then(({ data }) => {
      commit(types.UPDATE_USER, data);

      return data;
    });
  },
  /**
   * Envia email com informações para recuperar senha
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} email, email do usuário que quer recuperar a senha
   */
  recoverPassword({ commit }, email) {
    return axios.post('password/email', email).then(({ data }) => data);
  },
  /**
   * Redefine a senha do usuário
   *
   * @param {*} commit, função derivada do contexto da store
   * @param {*} reset, dados para redefinir a senha
   */
  sendReset({ commit }, reset) {
    return axios.post('/password/reset', reset).then(({ data }) => data);
  },
};
