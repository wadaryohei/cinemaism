import { FetchPath, FetchAPI } from '@/const/FetchPath'

// ================================
// Type
// ================================
export type APIComposition = {
  APIPath: (
    type: 'search' | 'movie' | 'popular' | 'videos' | 'recommendations',
    queryParams?: string | (string | null)[] | number | null,
    pageCount?: string | (string | null)[]
  ) => string;
}

// ================================
// Composition
// ================================
export const UseAPIComposition = (): APIComposition => {
  /**
   * APIのパスを返す
   */
  function APIPath (
    type: 'search' | 'movie' | 'popular' | 'videos' | 'recommendations',
    queryParams?: string | (string | null)[] | number | null,
    pageCount?: string | (string | null)[]
  ): string {
    switch (type) {
      case 'search':
        return `${FetchPath.search.path}?api_key=${FetchAPI.apiKey}&query=${queryParams}&language=${FetchAPI.language}`
      case 'movie':
        return `${FetchPath.movie.path}/${queryParams}?api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
      case 'popular':
        // queryParamsが渡されなかった場合はqueryParamsを抜いたエンドポイントを叩く
        if (queryParams === null || queryParams === undefined) {
          return `${FetchPath.popular.path}/?page=${pageCount}&api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
        } else {
          return `${FetchPath.popular.path}/?page=${pageCount}&api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
        }
      case 'videos':
        return `${FetchPath.movie.path}/${queryParams}/videos?api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
      case 'recommendations':
        return `${FetchPath.movie.path}/${queryParams}/recommendations?api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
    }
  }
  return { APIPath }
}
