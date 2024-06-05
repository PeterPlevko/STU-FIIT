import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/names',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/CatNamesPage.vue') }],
  },
  {
    path: '/cat',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: 'detail/:id/:tab',
        component: () => import('src/pages/CatDetail.vue'),
      },
      { path: 'all', component: () => import('pages/FindCat.vue') },
    ],
  },
  {
    path: '/help_1',
    component: () => import('layouts/BaseLayout.vue'),
    children: [{ path: '', component: () => import('pages/help/Help_1.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
