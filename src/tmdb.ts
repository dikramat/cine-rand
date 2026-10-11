import { APP_ERROR_CODES, TMDB_CONFIG } from './constants/tmdb'
import { APP_DEFAULTS } from './constants/app'
import type { Genre } from './types/genre'
import type { Movie } from './types/movie'
import type { MovieDetails } from './types/movieDetails'
import type { MovieDiscoverParams, GenreListResponse, MovieDiscoverResponse, PersonSearchResponse } from './types/tmdb'
import type { Person } from './types/person'

function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY
  if (!key) throw new Error(APP_ERROR_CODES.missingApiKey)
  return key
}

async function request<T>(path: string, params: MovieDiscoverParams = {}) {
  const url = new URL(`${TMDB_CONFIG.apiBaseUrl}${path}`)
  url.search = new URLSearchParams({ [TMDB_CONFIG.query.language]: TMDB_CONFIG.language, ...params }).toString()
  const response = await fetch(url, {
    headers: {
      [TMDB_CONFIG.headers.authorization]: `${TMDB_CONFIG.bearerPrefix} ${getApiKey()}`,
      [TMDB_CONFIG.headers.accept]: TMDB_CONFIG.headers.json,
    },
  })
  if (!response.ok) throw new Error(APP_ERROR_CODES.requestFailed)
  return response.json() as Promise<T>
}

export async function getGenres(): Promise<Genre[]> {
  const data = await request<GenreListResponse>(TMDB_CONFIG.endpoints.genres)
  return data.genres
}

export async function discoverMovies(params: MovieDiscoverParams): Promise<MovieDiscoverResponse> {
  return request<MovieDiscoverResponse>(TMDB_CONFIG.endpoints.discoverMovies, params)
}

export async function getTopRatedMovies(page: string): Promise<MovieDiscoverResponse> {
  return request<MovieDiscoverResponse>(TMDB_CONFIG.endpoints.topRatedMovies, {
    [TMDB_CONFIG.discoverParams.page]: page,
  })
}

export async function getWeeklyTrendingMovies(): Promise<Movie[]> {
  const data = await request<MovieDiscoverResponse>(TMDB_CONFIG.endpoints.weeklyTrendingMovies)
  return data.results
}

export async function searchPeople(query: string): Promise<Person[]> {
  const params = {
    [TMDB_CONFIG.personSearchParams.query]: query,
    [TMDB_CONFIG.personSearchParams.includeAdult]: TMDB_CONFIG.discoverParams.adultContentDisabled,
  }
  const data = await request<PersonSearchResponse>(TMDB_CONFIG.endpoints.searchPeople, params)
  return data.results
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return request<MovieDetails>(`${TMDB_CONFIG.endpoints.movieDetails}/${movieId}`)
}

export function imageUrl(path: string | null) {
  return path ? `${TMDB_CONFIG.imageBaseUrl}/${TMDB_CONFIG.imageSize}${path}` : APP_DEFAULTS.emptyImagePath
}
