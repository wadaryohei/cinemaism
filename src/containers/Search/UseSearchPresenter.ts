import { MovieSearchType } from '@/datas/MovieData'
import { ViewDatas } from './ViewDatas'
import { UseDateComposition } from '@/composition/UseDateComposition'

// ================================
// Type
// ================================
export type SearchPresenter = {
  viewDatas: () => ViewDatas;
}

// ================================
// Composition
// ================================
export const UseSearchPresenter = (
  _fetchDatas: MovieSearchType[] | null | undefined,
  _responseDataCount: number | undefined,
  _query: string | (string | null)[]
): SearchPresenter => {
  const date = UseDateComposition()

  /**
   * 取得したmovies情報に画像が存在するかどうか
   */
  function isExistsImage (path: string | null | undefined): string {
    if (path) {
      return `https://image.tmdb.org/t/p/w300${path}`
    } else {
      return `${require('../../assets/default_image.png')}`
    }
  }

  /**
   * 現在Storageに存在するMovie情報
   */
  function fetchData (): MovieSearchType[] | undefined {
    if (_fetchDatas) {
      return _fetchDatas.map((_fetchData: MovieSearchType) => {
        return {
          id: _fetchData?.id,
          posterPath: isExistsImage(_fetchData?.posterPath),
          originalTitle: _fetchData?.originalTitle,
          releaseDate: date.splitDates(_fetchData?.releaseDate)
        }
      })
    }
  }

  /**
   * Fetchしたデータが無い場合
   */
  function isExistsResponseData (): boolean {
    return _responseDataCount === undefined || _responseDataCount === 0
  }

  /**
   * 検索ワードを返す
   */
  function queryWordData (): string | (string | null)[] {
    return _query
  }

  // ================================
  // viewDatas
  // ================================
  function viewDatas (): ViewDatas {
    return {
      fetchData: fetchData(),
      isExistsResponseData: isExistsResponseData(),
      queryWordData: queryWordData()
    }
  }

  return { viewDatas }
}
