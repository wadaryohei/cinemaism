import { MovieStockType, MovieSelectedType } from '@/datas/MovieData'
import { onMounted, SetupContext, ref } from '@vue/composition-api'
import { MovieStatusSaved, MovieStatusDontSaved, MovieStatusType } from '@/const/MoviesStatus'
import { ModalComposition } from './UseModalComposition'
import { UseVuexComposition } from './UseVuexComposition'

// ================================
// Type
// ================================
export type StorageComposition = {
  currentStorages: (storage: string | null) => MovieStockType[] | null;
  removeStorage: (id: number) => Promise<void> | undefined;
  removeAllStorage: () => void;
  saveStorage: (movie: MovieSelectedType, modal: ModalComposition) => void;
  isExistsMovies: () => MovieStatusType;
  isLocalStorage: () => boolean;
  storageCount: () => number | undefined;
}

// ================================
// Composition
// ================================
export const UseStorageComposition = (context: SetupContext): StorageComposition => {
  const storages = ref<MovieStockType[] | null>(null)
  const vuex = UseVuexComposition(context)

  /**
   * 現在のストレージの中身を返す
   */
  function currentStorages (storage: string | null): MovieStockType[] | null {
    storages.value = JSON.parse(storage as string)
    return storages.value
  }

  /**
   * localStorageを全削除する
   */
  function removeAllStorage (): void {
    localStorage.clear()
    alert('すべて削除しました')
    vuex.stores('commit', 'inbox/countStorages', 0)
    window.location.reload()
    window.scrollTo(0, 0)
  }

  /**
   * localStorageの要素数を返す
   */
  function storageCount (): number | undefined {
    return storages.value?.length
  }

  /**
   * localStorageに保存されているidかチェックして存在するなら保存できないようにする
   */
  function isExistsMovies (): MovieStatusType {
    if (!storages.value) return MovieStatusDontSaved
    const paramsId = context.root.$route.params.id
    const someHasMoviesId = storages.value.some((currentStorage) => {
      return Number(paramsId) === currentStorage?.id
    })
    return someHasMoviesId ? MovieStatusSaved : MovieStatusDontSaved
  }

  /**
   * localStorageが0かどうか調べる
   */
  function isLocalStorage (): boolean {
    if (!storages.value) {
      return false
    } else {
      return true
    }
  }

  /**
   * localStorageにMovieを保存
   */
  function saveStorage (movie: MovieSelectedType, modal: ModalComposition): void {
    // localStorageにMovie情報が1つでも存在するなら既存の配列にmovie情報を加える
    if (storages.value) {
      storages.value = [...storages.value, movie]
    }

    // localStorageがnullなら空の配列にmovie情報を入れる
    if (!storages.value) {
      storages.value = [movie]
    }

    // localStorageに保存する
    localStorage.setItem('movies', JSON.stringify(storages.value))
    document.body.style.overflow = 'hidden'
    modal.openModal(movie.id)
    vuex.stores('commit', 'inbox/countStorages', storageCount())
  }

  /**
   * 選択したmovieのlocalStorageを削除する
   */
  function removeStorage (id: number): Promise<void> | undefined {
    if (storages.value !== null) {
      storages.value = storages.value.filter((storage) => {
        return storage.id !== id
      })
      localStorage.setItem('movies', JSON.stringify(storages.value))

      // ストレージが残り1つの場合はストレージを全削除する
      if (storageCount() === 0) {
        removeAllStorage()
      }
      return new Promise((resolve) => {
        resolve(vuex.stores('commit', 'inbox/countStorages', storageCount()))
      }).then(() => {
        window.location.reload()
        window.scrollTo(0, 0)
      })
    }
  }

  /**
   * ストレージにmovies情報が存在するかどうか
   */
  onMounted(() => {
    const storage = localStorage.getItem('movies')
    storages.value = JSON.parse(storage as string)
    vuex.stores('commit', 'inbox/countStorages', storageCount())
  })

  return { currentStorages, removeStorage, removeAllStorage, saveStorage, isExistsMovies, isLocalStorage, storageCount }
}
