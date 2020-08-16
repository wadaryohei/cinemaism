import { MovieStockType } from '@/datas/MovieData'
import { ViewDatas, defaultImageType } from './ViewDatas'

// ================================
// Type
// ================================
export type HomePresenter = {
  viewDatas: () => ViewDatas;
}

// ================================
// Composition
// ================================
export const UseHomePresenter = (
  _currentStorages: MovieStockType[] | null | undefined,
  _storageCount: number | undefined
): HomePresenter => {
  /**
   * 取得したmovies情報に画像が存在するかどうか
   */
  function isExistsImage (path: string | undefined): string {
    if (path) {
      return `${path}`
    } else {
      return `${require('../../assets/default_image_back.png')}`
    }
  }

  /**
   * 現在ストレージに存在するMovie情報
   */
  function currentStorages (): MovieStockType[] | undefined {
    return _currentStorages?.map((_currentStorage: MovieStockType) => {
      return {
        id: _currentStorage?.id,
        backdropPath: isExistsImage(_currentStorage?.backdropPath),
        originalTitle: _currentStorage?.originalTitle
      }
    })
  }

  /**
   * ストレージに情報が無かったときにデフォルトの画像
   */
  function defaultImage (): defaultImageType {
    return {
      src: `${require('../../assets/logo.png')}`,
      bgSrc: `${require('../../assets/movie_01.png')}`,
      alt: 'CINEMAISM'
    }
  }

  /**
   * ストレージの数で表示を切り替える
   */
  function isExistsStorageCount (): boolean {
    return _storageCount !== undefined
  }

  // ================================
  // viewDatas
  // ================================
  function viewDatas (): ViewDatas {
    return {
      currentStorages: currentStorages(),
      defaultImage: defaultImage(),
      isExistsStorageCount: isExistsStorageCount()
    }
  }

  return { viewDatas }
}
