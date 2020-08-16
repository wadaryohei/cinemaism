import { reactive, SetupContext, toRefs } from '@vue/composition-api'
import { MovieSearchType, MovieSelectedType, MovieResponseType, MovieRecommendType } from '@/datas/MovieData'

// ================================
// Type
// ================================
/**
 * @memo stateを...toRefしたときの型指定がよくわからないのでCompositionに対してのinterfaceは一旦無しにする
 */
// export type FetchDataComposition = {
//   fetchMovieSearchData: (path: string) => Promise<MovieSearchType[] | null | undefined>;
//   fetchMovieSelectedData: (path: string) => Promise<MovieSelectedType | undefined>;
//   fetchMovieVideosData: (path: string) => Promise<string | undefined>;
//   fetchMovieRecommendData: (path: string) => Promise<MovieRecommendType[] | null | undefined>;
//   responseData: () => MovieSearchType[] | null;
//   responseSelectedData: () => MovieSelectedType | null;
//   responseVideosData: () => string | null;
//   responseRecommendData: () => MovieRecommendType[] | null;
//   responseDataCount: () => number | undefined;
//   isLoading: () => boolean;
// }

// ================================
// State
// ================================
export type State = {
  searchResponse: MovieSearchType[] | null;
  selectedResponse: MovieSelectedType | null;
  videosResponse: string | null;
  recommendResponse: MovieRecommendType[] | null;
  loading: boolean;
}

// ================================
// Composition
// ================================
export const UseFetchDataComposition = (context: SetupContext) => {
  const state = reactive<State>({
    searchResponse: null,
    selectedResponse: null,
    videosResponse: null,
    recommendResponse: null,
    loading: true
  })

  /**
   * movieの検索情報を取得する
   */
  async function fetchMovieSearchData (path: string): Promise<MovieSearchType[] | null | undefined> {
    try {
      const response = await context.root.$axios.get(path)
      const result: MovieSearchType[] | null = response.data.results.map((result: MovieResponseType) => {
        return {
          id: result?.id,
          posterPath: result?.poster_path,
          originalTitle: result?.original_title,
          releaseDate: result?.release_date
        }
      })
      state.searchResponse = result
      return state.searchResponse
    } catch (e) {
      console.log(`${e} 'Don't get the movies info from API`)
    }
  }

  /**
   *movieの検索した情報から個別のmovie情報を取得する
   */
  async function fetchMovieSelectedData (path: string): Promise<MovieSelectedType | undefined> {
    try {
      const response = await context.root.$axios.get(path)
      const result: MovieSelectedType = {
        id: response?.data?.id,
        backdropPath: response?.data?.backdrop_path,
        homepage: response?.data?.homepage,
        posterPath: response?.data?.poster_path,
        originalTitle: response?.data?.original_title,
        releaseDate: response?.data?.release_date,
        genres: response?.data?.genres,
        voteAverage: response?.data?.vote_average,
        overview: response?.data?.overview
      }
      state.selectedResponse = result
      return state.selectedResponse
    } catch (e) {
      console.log(`${e} 'Don't get the movies info from API`)
    }
  }

  /**
   * movieの検索情報を取得する
   */
  async function fetchMovieVideosData (path: string): Promise<string | undefined> {
    try {
      const response = await context.root.$axios.get(path)
      if (response.data.results) {
        const videosKey: string = response.data.results[0]?.key
        state.videosResponse = videosKey
        return state.videosResponse
      }
    } catch (e) {
      console.log(`${e} 'Don't get the movies info from API`)
    }
  }

  /**
   * movieの検索情報を取得する
   */
  async function fetchMovieRecommendData (path: string): Promise<MovieRecommendType[] | null | undefined> {
    try {
      const response = await context.root.$axios.get(path)
      const result: MovieRecommendType[] | null = response.data.results?.map((result: MovieResponseType) => {
        return {
          id: result?.id,
          posterPath: result?.poster_path,
          originalTitle: result?.original_title,
          releaseDate: result?.release_date
        }
      })
      state.recommendResponse = result
      return state.recommendResponse
    } catch (e) {
      console.log(`${e} 'Don't get the movies info from API`)
    }
  }

  /**
   * Fetchしたデータを返す
   */
  function responseData (): MovieSearchType[] | null {
    return state.searchResponse
  }

  /**
   * Fetchしたmovieの個別データを返す
   */
  function responseSelectedData (): MovieSelectedType | null {
    return state.selectedResponse
  }

  /**
   * FetchしたmovieのVideosデータを返す
   */
  function responseVideosData (): string | null {
    return state.videosResponse
  }

  /**
   * FetchしたmovieのRecommendデータを返す
   */
  function responseRecommendData (): MovieRecommendType[] | null {
    return state.recommendResponse
  }

  /**
   * Fetchしたデータの要素数を返す
   */
  function responseDataCount (): number | undefined {
    return state.searchResponse?.length
  }

  /**
   * Fetchしたデータの要素数を返す
   */
  function isLoading (): boolean {
    return state.loading
  }

  return {
    ...toRefs(state),
    isLoading,
    fetchMovieSearchData,
    fetchMovieSelectedData,
    fetchMovieVideosData,
    fetchMovieRecommendData,
    responseData,
    responseSelectedData,
    responseVideosData,
    responseRecommendData,
    responseDataCount
  }
}
