import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/actualites',
        name: 'actualitesAll',
        component: () => import('src/pages/NewsAll.vue'),
      },
      {
        path: '/actualite/:url',
        name: 'articleId',
        component: () => import('pages/Actualite.vue'),
      },
      {
        path: '/produits',
        name: 'produitsAll',
        component: () => import('src/pages/Produits.vue'),
      },
      {
        path: '/vins',
        name: 'VinsAll',
        component: () => import('src/pages/Vins.vue'),
      },
      {
        path: '/vins/:id',
        name: 'vins',
        component: () => import('pages/Vin-id.vue'),
      },
      {
        path: '/champagnes',
        name: 'ChampagnesAll',
        component: () => import('src/pages/Champagnes.vue'),
      },
      {
        path: '/champagnes/:id',
        name: 'champagnes',
        component: () => import('pages/Champagne-id.vue'),
      },
      {
        path: '/favoris',
        name: 'favoris',
        component: () => import('pages/Favoris.vue'),
      },
      {
        path: '/appellation/:typeBoisson/:id',
        name: 'appellation',
        component: () => import('pages/AppellationAll.vue'),
      },
      {
        path: '/regions/:typeBoisson/:id',
        name: 'region',
        component: () => import('pages/RegionsAll.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('pages/Contact.vue'),
      },
      {
        path: '/contact/:page',
        name: 'contactSuggest',
        component: () => import('pages/Contact.vue'),
      },
      {
        path: '/contact/claim/:id',
        name: 'contactClaim',
        component: () => import('pages/Contact.vue'),
      },
      {
        path: '/qui-sommes-nous',
        name: 'quiSommesNous',
        component: () => import('pages/QuiSommesNous.vue'),
      },
      {
        path: '/nos-engagements',
        name: 'nosEngagements',
        component: () => import('pages/NosEngagements.vue'),
      },
      {
        path: '/livraison',
        name: 'livraisonPage',
        component: () => import('src/pages/LivraisonsPage.vue'),
      },
      {
        path: '/faq',
        name: 'faqPage',
        component: () => import('src/pages/faqPage.vue'),
      },
      {
        path: '/programme-privilege',
        name: 'ProgrammePrivilege',
        component: () => import('src/pages/ProgrammePrivilege.vue'),
      },
      {
        path: '/cgv',
        name: 'CgvPage',
        component: () => import('src/pages/CgvPage.vue'),
      },
      {
        path: '/cgu',
        name: 'CguPage',
        component: () => import('src/pages/CguPage.vue'),
      },
      {
        path: '/politique-confidentialite',
        name: 'PolitiqueConfidentialite',
        component: () => import('src/pages/PolitiqueConfidentialite.vue'),
      },
      {
        path: '/cart/:etape',
        name: 'CartPage',
        component: () => import('src/pages/CartPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/404.vue'),
  },
];

export default routes;
