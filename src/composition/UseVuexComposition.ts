import { SetupContext } from '@vue/composition-api'

// ================================
// Type
// ================================
export type VuexComposition = {
  stores: (type: 'getters' | 'commit' | 'dispatch', storePath: string, payload?: number)
  /**
   * @memo
   * Vuexの型をいずれどうにかしないといけないが公式対応してほしい。。。
   * 一旦Vuex部分はanyを許容
   */
  // eslint-disable-next-line
  => any;
}

// ================================
// Composition
// ================================
export const UseVuexComposition = (context: SetupContext): VuexComposition => {
  /**
   * Vuexのstate || commit || dispatchを発火する
   */
  function stores (type: 'getters' | 'commit' | 'dispatch', storePath: string, payload?: number) {
    switch (type) {
      case 'getters':
        return context.root.$store.getters[storePath]
      case 'commit':
        return context.root.$store.commit(storePath, payload)
      case 'dispatch':
        return context.root.$store.dispatch(storePath)
    }
  }

  return { stores }
}
