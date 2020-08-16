export const FetchPath = {
  search: {
    path: `${process.env.VUE_APP_API_BASE_URL}/search/movie`
  },
  movie: {
    path: `${process.env.VUE_APP_API_BASE_URL}/movie`
  },
  popular: {
    path: `${process.env.VUE_APP_API_BASE_URL}/movie/popular`
  },
  videos: {
    path: `${process.env.VUE_APP_API_BASE_URL}`
  },
  recommendations: {
    path: `${process.env.VUE_APP_API_BASE_URL}`
  }
} as const

export const FetchAPI = {
  apiKey: `${process.env.VUE_APP_API_KEY}`,
  language: `${process.env.VUE_APP_API_LANGUAGE}`
}
