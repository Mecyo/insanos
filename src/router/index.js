import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import * as types from '../store/MutationTypes';
import api from '@/api';

import authenticationGuard from './guards/AuthenticationGuard';
import authorizationGuard from './guards/AuthorizationGuard';

import adminRoutes from './AdminRoutes';
import authenticatedRoutes from './AuthenticatedRoutes';

Vue.use(Router);

// Agrupamento de todas as rotas
// Todas as rotas devem ser registradas com nome
// Estes nomes são utilizados no de/para com os itens de menu
const routes = [
  {
    name: 'Login',
    path: '/',
    meta: {
      requiresAuth: false,
    },
    component: () => import('@/views/dashboard/components/core/Login')
  },
  /*{
    path: '/password/reset/:token',
    name: 'resetPassword',
    component: ResetPassword,
  },*/
  {
    path: '/app',
    component: () => import('@/views/dashboard/Index'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_USER']
    },
    children: [
      {
        path: 'not-authorized',
        name: 'not-authorized',
        component: () => import('@/views/NotAuthorized'),
      },
      ...adminRoutes,
      ...authenticatedRoutes,
    ],
  },
  {
    name: "Página não encontrada",
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/PageNotFound'),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new Router({
  mode: 'history',
  routes: routes
});


// em todas as rotas é verificado autenticação e autorização
router.beforeEach(async (to, from, next) => {
  // move o scroll para o inicio da tela
  window.scrollTo(0, 0);
  if(!store.state.user) {
    const user = await loginComToken()
      .then((user) => {
        if (user) {
          store.commit(types.UPDATE_USER, user.data);
          store.commit(types.UPDATE_TOKEN, user.data.token);
        } else {
          removeSession();
        }
      }).catch((error) => {
        removeSession();
      });
  }

  authenticationGuard(to, from, next);
  authorizationGuard(to, from, next);
});

async function loginComToken() {
  const cookieName = process.env.VUE_APP_API_COOKIE_NAME;
  let token = store.state.token;
  if (!token && $cookies.isKey(cookieName)) {
    token = $cookies.get(cookieName);
  }

  if (token) {
    return await api.post('/token-validate', token);
  }
}

function removeSession() {
  store.commit(types.UPDATE_USER, null);
  store.commit(types.UPDATE_TOKEN, null);
}

export default router;
