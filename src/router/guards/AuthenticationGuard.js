
import store from '@/store';

/**
 * TODO Este evento é responsável por verificar o controle de autenticação
 * na transição de páginas
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const beforeEach = (to, from, next) => {
  // Verifica se a rota requer autenticação ou algum perfil especifico
  // se requerer o usuário deverá estar logado para continuar a rota
  var user = store.state.user;
  if ((to.meta.requiresAuth || to.meta.requireRoles) && !user) {
    next('/');
  } else if (to.name === 'Login' && user) {
    next({ path: 'dashboard' });
  } else {
    next();
  }
};

export default beforeEach;
