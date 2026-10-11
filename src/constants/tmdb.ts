export const TMDB_CONFIG = {
  apiBaseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p',
  websiteUrl: 'https://www.themoviedb.org/',
  language: 'en-US',
  imageSize: 'w500',
  maximumDiscoverPage: 500,
  firstDiscoverPage: 1,
  yearCharacterOffset: 0,
  yearCharacterCount: 4,
  ratingDecimalPlaces: 1,
  query: {
    language: 'language',
  },
  headers: {
    authorization: 'Authorization',
    accept: 'Accept',
    json: 'application/json',
  },
  bearerPrefix: 'Bearer',
  endpoints: {
    genres: '/genre/movie/list',
    discoverMovies: '/discover/movie',
    movieDetails: '/movie',
    searchPeople: '/search/person',
  },
  discoverParams: {
    adultContent: 'include_adult',
    adultContentDisabled: 'false',
    videoContent: 'include_video',
    videoContentDisabled: 'false',
    sortBy: 'sort_by',
    sortOrder: 'popularity.desc',
    page: 'page',
    genre: 'with_genres',
    cast: 'with_cast',
  },
  personSearchParams: {
    query: 'query',
    includeAdult: 'include_adult',
  },
} as const

export const APP_ERROR_CODES = {
  missingApiKey: 'missingApiKey',
  requestFailed: 'requestFailed',
  noMoviesFound: 'noMoviesFound',
} as const
