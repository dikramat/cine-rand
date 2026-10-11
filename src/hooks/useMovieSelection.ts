import { useState } from 'react'
import type { AppErrorCode } from '../types/appError'
import type { Movie } from '../types/movie'
import type { MovieFilters } from '../types/movieFilters'
import type { MovieSelectionDependencies, MovieSelectionResult, MovieSelectionActions } from '../types/movieRandomizer'
import { getRandomMovie, getRandomTopRatedMovie } from '../services/movieRandomizer'
import { getAppErrorCode } from '../utils/getAppErrorCode'

export function useMovieSelection({ filters, details }: MovieSelectionDependencies) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AppErrorCode | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [topRatedMode, setTopRatedMode] = useState(false)

  function getCurrentFilters(): MovieFilters {
    const currentFilters: MovieFilters = {
      genreId: filters.genreId,
      actor: filters.selectedActor,
      firstLetter: filters.selectedFirstLetter,
      fromYear: filters.fromYear,
      toYear: filters.toYear,
    }

    return currentFilters
  }

  async function findMovie(movieFilters?: MovieFilters, fromTopRated = false) {
    setLoading(true)
    setError(null)
    setShowFilters(Boolean(movieFilters))
    setTopRatedMode(fromTopRated)
    try {
      const nextMovie = fromTopRated ? await getRandomTopRatedMovie() : await getRandomMovie(movieFilters)
      setMovie(nextMovie)
      details.resetMovieDetails()
    } catch (reason) {
      setError(getAppErrorCode(reason))
    } finally {
      setLoading(false)
    }
  }

  function selectTrendingMovie(selectedMovie: Movie) {
    setMovie(selectedMovie)
    details.resetMovieDetails()
    setShowFilters(false)
    setTopRatedMode(false)
    setError(null)
  }

  function backToRandomizer() {
    const returnToFilters = showFilters
    setMovie(null)
    setTopRatedMode(false)
    details.resetMovieDetails()
    if (!returnToFilters) filters.resetFilters()
    setShowFilters(returnToFilters)
    setError(null)
  }

  function openFilters() {
    setShowFilters(true)
    setError(null)
  }

  function closeFilters() {
    filters.resetFilters()
    setShowFilters(false)
    setError(null)
  }

  const result: MovieSelectionResult = {
    movie,
    movieDetails: details.movieDetails,
    loading,
    detailsLoading: details.detailsLoading,
    error,
    detailsError: details.detailsError,
    showFilters,
    showDetails: details.showDetails,
  }
  const findRandomMovie = () => findMovie()
  const findTopRatedMovie = () => findMovie(undefined, true)
  const findFilteredMovie = () => findMovie(getCurrentFilters())
  const rerollMovie = () => topRatedMode
    ? findMovie(undefined, true)
    : findMovie(showFilters ? getCurrentFilters() : undefined)
  const toggleMovieDetails = () => details.toggleMovieDetails(movie)
  const actions: MovieSelectionActions = {
    findRandomMovie,
    findTopRatedMovie,
    findFilteredMovie,
    rerollMovie,
    toggleMovieDetails,
    selectTrendingMovie,
    backToRandomizer,
    openFilters,
    closeFilters,
  }
  const selection = { result, actions }

  return selection
}
