import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // try redirect to home route
    redirect: () => ({ name: 'home' })
  },
  {
    path: '/auth',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: 'register', name: 'register', meta: { guestOnly: true }, component: () => import('pages/RegisterPage.vue') },
      { path: 'login', name: 'login', meta: { guestOnly: true }, component: () => import('pages/LoginPage.vue') }
    ]
  },
  // {
  //   path: '/channels',
  //   // channels requires auth
  //   meta: { requiresAuth: true },
  //   component: () => import('src/layouts/MainLayoutours.vue'),
  //   children: [
  //     { path: '', name: 'home', component: () => import('src/pages/ChannelPage.vue') }
  //   ]
  // },

  {
    path: '/channels',
    // channels requires auth
    meta: { requiresAuth: true },
    component: () => import('src/layouts/ChatLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('src/pages/HomePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
    {
    path: '/',
    component: () => import('src/layouts/ChatLayout.vue'),
    children: [
      { path: '/:id', component: () => import('pages/Conversation.vue') },
    ],
  },
];

export default routes;



