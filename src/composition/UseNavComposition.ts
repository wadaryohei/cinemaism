import { ref } from '@vue/composition-api'

// ================================
// Type
// ================================
export type NavComposition = {
  toggleMenu: () => boolean;
  activeMenu: () => boolean;
}

// ================================
// Composition
// ================================
export const UseNavComposition = (): NavComposition => {
  const isMenuActive = ref<boolean>(false)

  /**
   * メニューの開閉をする
   */
  function toggleMenu (): boolean {
    isMenuActive.value = !isMenuActive.value
    return !isMenuActive.value
  }

  /**
   * メニューの現在の開閉状況を返す
   */
  function activeMenu (): boolean {
    if (isMenuActive.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return isMenuActive.value
  }

  return { toggleMenu, activeMenu }
}
