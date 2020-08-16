import { MovieStockType } from '@/datas/MovieData'

export type defaultImageType = {
  src: string;
  bgSrc: string;
  alt: string;
}

export type ViewDatas = {
  currentStorages: MovieStockType[] | undefined;
  defaultImage: defaultImageType;
  isExistsStorageCount: boolean;
}
