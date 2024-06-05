import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/:id', component: () => import('pages/Conversation.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
