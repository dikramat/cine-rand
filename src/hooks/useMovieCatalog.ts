import { useEffect, useState } from 'react'
import type { Genre } from '../types/genre'
import type { Movie } from '../types/movie'
import { getGenres, getWeeklyTrendingMovies } from '../tmdb'

export function useMovieCatalog() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(true)
  const [trendingMoviesError, setTrendingMoviesError] = useState(false)

  useEffect(() => {
    getGenres().then(setGenres).catch(() => setGenres([]))
  }, [])

  useEffect(() => {
    let active = true
    getWeeklyTrendingMovies()
      .then((movies) => { if (active) setTrendingMovies(movies) })
      .catch(() => { if (active) setTrendingMoviesError(true) })
      .finally(() => { if (active) setTrendingMoviesLoading(false) })

    return () => { active = false }
  }, [])

  return { genres, trendingMovies, trendingMoviesLoading, trendingMoviesError }
}
