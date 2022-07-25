export default [
    {
      icon: 'mdi-view-dashboard',
      title: 'Dashboard',
      path: 'dashboard',
      items: []
    },
    {
      icon: 'mdi-account',
      title: 'Registro de usuários',
      path: 'user-register',
      requireRoles: ['ROLE_USER'],
      items: []
    },
    {
      title: 'Lista de players',
      icon: 'mdi-clipboard-outline',
      path: 'player-list',
      requireRoles: ['ROLE_USER'],
      items: []
    },
    {
      title: 'Lista negra',
      icon: 'mdi-account-cancel',
      path: 'black-list',
      requireRoles: ['ROLE_ADMIN'],
      items: []
    },
    {
      title: 'Ranking da guerra',
      icon: 'mdi-podium',
      path: 'war-ranking',
      requireRoles: ['ROLE_USER'],
      items: []
    },
    {
      title: 'Notifications',
      icon: 'mdi-bell',
      path: 'notifications',
      requireRoles: ['ROLE_SUPER'],
      items: []
    },
  ]