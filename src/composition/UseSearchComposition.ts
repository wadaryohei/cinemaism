import { ref, Ref, SetupContext } from '@vue/composition-api'

// ================================
// Type
// ================================
export type SearchComposition = {
  inputWord: Ref<string>;
  searchMovie: (keyCode: number) => void;
}

// ================================
// Composition
// ================================
export const UseSearchComposition = (context: SetupContext): SearchComposition => {
  const inputWord = ref<string>('')

  /**
   * 入力した検索ワードを受け取ってクエリーで遷移する
   */
  function searchMovie (keyCode: number): void {
    if (keyCode !== 13) return
    context.root.$router.push({ path: 'search', query: { q: inputWord.value } })
    inputWord.value = ''
  }
  return { inputWord, searchMovie }
}
