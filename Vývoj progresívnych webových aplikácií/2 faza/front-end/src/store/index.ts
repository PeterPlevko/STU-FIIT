

import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import auth from './module-auth'
import channels from './module-channels'
import userData from './module-userData'
import { ExampleStateInterface } from './module-userData/state'
import { AuthStateInterface } from './module-auth/state'
import type { ChannelsStateInterface } from './module-channels/state'
// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

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
  userData: ExampleStateInterface;
  auth: AuthStateInterface;
  channels: ChannelsStateInterface;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      // example
      auth,
      userData,
      channels,

    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})

export function useStore() {
  return vuexUseStore(storeKey)
}
