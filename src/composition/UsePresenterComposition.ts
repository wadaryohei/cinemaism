import { ref } from '@vue/composition-api'

// ================================
// Type
// ================================
export type PresenterComposition = {
  presenterDatas: <T>(_presenterDatas: T) => void;
  datas: <T>() => T;
}

// ================================
// Composition
// ================================
export const UsePresenterComposition = (): PresenterComposition => {
  const presenter = ref()

  /**
   * 受け取ったプレゼンターをリアクティブ変数に入れる
   */
  function presenterDatas <T> (_presenterDatas: T): void {
    presenter.value = _presenterDatas
  }

  /**
   * 受け取ったプレゼンターのリアクティブデータをそのまま返してtemplate内で使えるようにする
   */
  function datas <T> (): T {
    return presenter.value
  }

  return { presenterDatas, datas }
}
