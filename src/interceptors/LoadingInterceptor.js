import Vue from 'vue';
import store from '@/store';
import api from '@/api.js';

// Interceptor responsável por Exibir e esconder
// o spinner e incluir o token de autorização em todas requisições AJAX

function getToken() {
  var token = '';
  if(store && store.state && store.state.user) {
    token = store.state.user.token;
  } else {
    return null;
  }

  return 'Bearer ' + token;
}

api.interceptors.request.use((request) => {
  // add auth header with jwt if account is logged in and request is to the api url
  const token = getToken();

  if (token) {
      request.headers.common.Authorization = token;
  }
  Vue.$spinner.show();
  return request;
});

api.interceptors.response.use(
  (response) => {
    Vue.$spinner.hide();

    return response;
  },
  (error) => {
    Vue.$spinner.hide();

    return Promise.reject(error);
  },
);
