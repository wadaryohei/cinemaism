import { MovieSelectedType, MovieRecommendType } from '@/datas/MovieData'

export type ViewDatas = {
  fetchMovieDatas: MovieSelectedType | undefined;
  fetchVideoDatas: string | undefined;
  fetchRecommendDatas: MovieRecommendType[] | null | undefined;
}
