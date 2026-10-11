import { useState } from 'react'
import type { AppErrorCode } from '../types/appError'
import type { Movie } from '../types/movie'
import type { MovieDetails } from '../types/movieDetails'
import { getMovieDetails } from '../tmdb'
import { getAppErrorCode } from '../utils/getAppErrorCode'

export function useMovieDetails() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState<AppErrorCode | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  function resetMovieDetails() {
    setMovieDetails(null)
    setShowDetails(false)
    setDetailsError(null)
    setDetailsLoading(false)
  }

  async function toggleMovieDetails(movie: Movie | null) {
    if (!movie) return
    if (showDetails) {
      setShowDetails(false)
      return
    }

    setShowDetails(true)
    if (movieDetails?.id === movie.id) return

    setDetailsLoading(true)
    setDetailsError(null)
    try {
      setMovieDetails(await getMovieDetails(movie.id))
    } catch (reason) {
      setDetailsError(getAppErrorCode(reason))
    } finally {
      setDetailsLoading(false)
    }
  }

  return { movieDetails, detailsLoading, detailsError, showDetails, toggleMovieDetails, resetMovieDetails }
}
