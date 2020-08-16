import { MovieSearchType } from '@/datas/MovieData'

export type ViewDatas = {
  fetchData: MovieSearchType[] | undefined;
  isExistsResponseData: boolean;
  queryWordData: string | (string | null)[];
}
