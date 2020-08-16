type genres = {
  id: number;
  name: string;
}

export type MovieResponseType = {
  id?: number;
  backdrop_path?: string;
  homepage?: string;
  poster_path?: string;
  original_title?: string;
  release_date?: string;
  genres?: genres[];
  vote_average?: number;
  overview?: string;
}

export type MovieStockType = {
  id?: number;
  backdropPath?: string;
  originalTitle?: string;
}

export type MovieSearchType = {
  id?: number;
  posterPath?: string;
  originalTitle?: string;
  releaseDate?: string;
}

export type MovieSelectedType = {
  id?: number;
  backdropPath?: string;
  homepage?: string;
  posterPath?: string;
  originalTitle?: string;
  releaseDate?: string;
  genres?: genres[];
  voteAverage?: number;
  overview?: string;
}

export type MovieRecommendType = {
  id?: number;
  posterPath?: string;
  originalTitle?: string;
  releaseDate?: string;
}
