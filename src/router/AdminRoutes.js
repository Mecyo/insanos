export default [
  {
    name: 'Notifications',
    path: 'notifications',
    component: () => import('@/views/dashboard/component/Notifications'),
    meta: {
      requiresAuth: true,
      requireRoles: ['ROLE_SUPER']
    }
  },
];
