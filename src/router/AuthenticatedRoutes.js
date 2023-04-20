export default [
  // Dashboard
  {
    name: 'Dashboard',
    path: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_USER']
    },
  },
  // Pages
  {
    name: 'Registro de Usuário',
    path: 'user-register',
    component: () => import('@/views/dashboard/pages/UserProfile'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_USER']
    },
  },
  {
    name: 'Registro de Player',
    path: 'player-register',
    component: () => import('@/views/dashboard/pages/PlayerProfile'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_USER']
    },
  },
  // Tables
  {
    name: 'Lista de players',
    path: 'player-list',
    component: () => import('@/views/dashboard/tables/PlayerList'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_USER']
    },
  },
  {
    name: 'Lista negra',
    path: 'black-list',
    component: () => import('@/views/dashboard/tables/BlackList'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_ADMIN']
    },
  },
  {
    name: 'Ranking da guerra',
    path: 'war-ranking',
    component: () => import('@/views/dashboard/tables/WarRanking'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_USER']
    },
  },
  {
    name: 'Torneio',
    path: 'torneio',
    component: () => import('@/views/dashboard/pages/Torneio'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_USER']
    },
  },
];
