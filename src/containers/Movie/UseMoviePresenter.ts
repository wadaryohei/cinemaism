import { MovieSelectedType, MovieRecommendType } from '@/datas/MovieData'
import { ViewDatas } from './ViewDatas'
import { UseDateComposition } from '@/composition/UseDateComposition'

// ================================
// Type
// ================================
export type MoviePresenter = {
  viewDatas: () => ViewDatas;
}

// ================================
// Composition
// ================================

export const UseMoviePresenter = (
  _fetchMovieDatas: MovieSelectedType | undefined,
  _fetchVideoDatas: string | undefined,
  _fetchRecommendDatas: MovieRecommendType[] | null | undefined
): MoviePresenter => {
  const date = UseDateComposition()
  /**
   * 取得したmovies情報に画像が存在するかどうか
   */
  function isExistsBackdropImage (path: string | undefined): string {
    if (path) {
      return `https://image.tmdb.org/t/p/original${path}`
    } else {
      return `${require('../../assets/default_image_back.png')}`
    }
  }

  /**
   * 取得したmovies情報に画像が存在するかどうか
   */
  function isExistsPosterImage (path: string | undefined): string {
    if (path) {
      return `https://image.tmdb.org/t/p/original${path}`
    } else {
      return `${require('../../assets/default_image.png')}`
    }
  }

  /**
   * 表示しているMovie情報の詳細
   */
  function fetchMovieDatas (): MovieSelectedType {
    return {
      id: _fetchMovieDatas?.id,
      backdropPath: isExistsBackdropImage(_fetchMovieDatas?.backdropPath),
      homepage: _fetchMovieDatas?.homepage,
      posterPath: isExistsPosterImage(_fetchMovieDatas?.posterPath),
      originalTitle: _fetchMovieDatas?.originalTitle,
      releaseDate: date.splitDates(_fetchMovieDatas?.releaseDate),
      genres: _fetchMovieDatas?.genres,
      voteAverage: _fetchMovieDatas?.voteAverage,
      overview: _fetchMovieDatas?.overview
    }
  }

  /**
   * 表示しているMovie情報のVideo詳細
   */
  function fetchVideoDatas (): string | undefined {
    if (_fetchVideoDatas) {
      return `https://www.youtube.com/watch?v=${_fetchVideoDatas}`
    }
  }

  /**
   * 表示しているMovie情報のRecommend詳細
   */
  function fetchRecommendDatas (): MovieRecommendType[] | null | undefined {
    if (_fetchRecommendDatas?.length === 0) {
      return
    }

    if (!null || !undefined) {
      return _fetchRecommendDatas?.map((datas: MovieRecommendType) => {
        return {
          id: datas.id,
          posterPath: isExistsPosterImage(datas.posterPath),
          originalTitle: datas.originalTitle,
          releaseDate: date.splitDates(datas?.releaseDate)
        }
      })
    }
  }

  // ================================
  // viewDatas
  // ================================
  function viewDatas (): ViewDatas {
    return {
      fetchMovieDatas: fetchMovieDatas(),
      fetchVideoDatas: fetchVideoDatas(),
      fetchRecommendDatas: fetchRecommendDatas()
    }
  }

  return { viewDatas }
}
