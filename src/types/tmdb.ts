import type { Genre } from './genre'
import type { Movie } from './movie'
import type { Person } from './person'

export type GenreListResponse = {
  genres: Genre[]
}

export type MovieDiscoverResponse = {
  total_pages: number
  results: Movie[]
}

export type MovieDiscoverParams = Record<string, string>

export type PersonSearchResponse = {
  results: Person[]
}
