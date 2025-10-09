import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LandingPage.vue') }],
  },
  {
    path: '/map',
    component: () => import('layouts/MapLayout.vue'),
    children: [{ path: '', component: () => import('pages/MainPage.vue') }],
  },

  {
    path: '/about',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AboutUs.vue') }],
  },

  {
    path: '/data',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DataPage.vue') }],
  },

  {
    path: '/people',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PeoplePage.vue') }],
  },

  {
    path: '/content',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ContentPage.vue') }],
  },

  {
    path: '/samplearticle',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/articles/SampleArticlePage.vue') }],
  },

  {
    path: '/acknowledgement',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AcknowledgementPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
