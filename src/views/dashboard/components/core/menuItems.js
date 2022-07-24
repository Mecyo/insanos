export default [
    {
      icon: 'mdi-view-dashboard',
      title: 'dashboard',
      path: '#',
      items: [],
      to: '',
    },
    {
      icon: 'mdi-account',
      title: 'user',
      to: 'pages/user',
      path: '#',
      items: [],
    },
    {
      title: 'playerlist',
      icon: 'mdi-clipboard-outline',
      to: 'tables/player-list',
      path: '#',
      items: [],
    },
    {
      title: 'blacklist',
      icon: 'mdi-account-cancel',
      to: 'tables/black-list',
      path: '#',
      items: [],
    },
    {
      title: 'war-ranking',
      icon: 'mdi-podium',
      to: 'tables/war-ranking',
      path: '#',
      items: [],
    },
    /*{
      title: 'typography',
      icon: 'mdi-format-font',
      to: '/components/typography',
    },
    {
      title: 'icons',
      icon: 'mdi-chart-bubble',
      to: '/components/icons',
    },
    {
      title: 'google',
      icon: 'mdi-map-marker',
      to: '/maps/google-maps',
    },*/
    {
      title: 'notifications',
      icon: 'mdi-bell',
      to: 'components/notifications',
      path: '#',
      items: [],
    },
  ];