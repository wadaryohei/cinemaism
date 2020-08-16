import { ref, SetupContext, onMounted } from '@vue/composition-api'
import { UseVuexComposition } from './UseVuexComposition'

// ================================
// Type
// ================================
export type PaginationComposition = {
  currentPageCount: () => number;
  stepNextPageHandler: () => void;
  stepPreviewPageHandler: () => void;
}

// ================================
// Composition
// ================================
export const UsePaginationComposition = (context: SetupContext): PaginationComposition => {
  const vuex = UseVuexComposition(context)
  const _currentPageCount = ref<number>(vuex.stores('getters', 'pageCount/pageCountGetters'))

  onMounted(() => {
    // 現在のページをマウント時にStoreから取り出す
    _currentPageCount.value = vuex.stores('getters', 'pageCount/pageCountGetters')
  })

  /**
   * 現在のページを返す
   */
  function currentPageCount (): number {
    return _currentPageCount.value
  }

  /**
   * ページ遷移をrouterpushで遷移する
   */
  function stepActionPage (targetPageCount: number): void {
    context.root.$router.push({ path: 'popular', query: { page: String(targetPageCount) } })
  }

  /**
   * ページ遷移のStore処理
   */
  function stepPage (): void{
    vuex.stores('commit', 'pageCount/gotoPage', _currentPageCount.value)
    _currentPageCount.value = vuex.stores('getters', 'pageCount/pageCountGetters')
    stepActionPage(_currentPageCount.value)
  }

  /**
   * 次のページへ進む
   */
  function stepNextPageHandler (): void {
    _currentPageCount.value += 1
    stepPage()
  }

  /**
   * 前のページへ進む
   */
  function stepPreviewPageHandler (): void {
    if (_currentPageCount.value !== 0) {
      _currentPageCount.value -= 1
      stepPage()
    }
  }

  return { currentPageCount, stepNextPageHandler, stepPreviewPageHandler }
}
