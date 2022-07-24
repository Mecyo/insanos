
import store from '@/store';

/**
 * TODO Este evento é responsável por verificar o controle de autorização
 * na transição de páginas
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const beforeEach = (to, from, next) => {
  var user = store.state.user;
  if (user
    && to.meta.requireRoles
    && !user.permissoes.some(role => to.meta.requireRoles.includes(role))) {
    next({ name: 'not-authorized' });
  } else {
    next();
  }
};

export default beforeEach;
