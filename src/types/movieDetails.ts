import type { Genre } from './genre'

export type ProductionCountry = {
  iso_3166_1: string
  name: string
}

export type MovieDetails = {
  id: number
  genres: Genre[]
  runtime: number | null
  release_date: string
  tagline: string
  production_countries: ProductionCountry[]
  original_language: string
}
