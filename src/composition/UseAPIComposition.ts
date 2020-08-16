import { FetchPath, FetchAPI } from '@/const/FetchPath'

// ================================
// Type
// ================================
export type APIComposition = {
  APIPathSearch: (queryParams: string | (string | null)[]) => string;
  APIPathMovie: (paramsId: string) => string;
  APIPathVideos: (paramsId: string) => string;
  APIPathPopular: (pageCount?: string | (string | null)[]) => string;
  APIPathRecommendations: (paramsId: string) => string;
}

// ================================
// Composition
// ================================
export const UseAPIComposition = (): APIComposition => {
  /**
   * SearchのAPIエンドポイントを返す
   */
  function APIPathSearch (queryParams: string | (string | null)[]): string {
    return `${FetchPath.search.path}?api_key=${FetchAPI.apiKey}&query=${queryParams}&language=${FetchAPI.language}`
  }

  /**
   * MovieのAPIエンドポイントを返す
   */
  function APIPathMovie (paramsId: string): string {
    return `${FetchPath.movie.path}/${paramsId}?api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
  }

  /**
   * VideoのAPIエンドポイントを返す
   */
  function APIPathVideos (paramsId: string): string {
    return `${FetchPath.movie.path}/${paramsId}/videos?api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
  }

  /**
   * RecommendationsのAPIエンドポイントを返す
   */
  function APIPathRecommendations (paramsId: string): string {
    return `${FetchPath.movie.path}/${paramsId}/recommendations?api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
  }

  /**
   * PopularのAPIエンドポイントを返す
   */
  function APIPathPopular (pageCount?: string | (string | null)[]): string {
    return `${FetchPath.popular.path}?page=${pageCount}&api_key=${FetchAPI.apiKey}&language=${FetchAPI.language}`
  }

  return {
    APIPathSearch,
    APIPathMovie,
    APIPathVideos,
    APIPathPopular,
    APIPathRecommendations
  }
}
