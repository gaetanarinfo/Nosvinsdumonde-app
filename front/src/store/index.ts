import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';

import news from './news_store';
import vins from './vins_store';
import champagnes from './champagnes_store';
import produits from './produits_store';
import appellations from './appellation_store';
import regions from './region_store';
import contact from './contact_store';
import users from './user_store';
import carts from './carts_store';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  news: typeof news;
  vins: typeof vins;
  champagnes: typeof champagnes;
  produits: typeof produits;
  appellations: typeof appellations;
  regions: typeof regions;
  contact: typeof contact;
  users: typeof users;
  carts: typeof carts;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol('vuex-key');

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      news,
      vins,
      champagnes,
      produits,
      appellations,
      regions,
      contact,
      users,
      carts,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
