import { useEffect, useState } from 'react'
import { APP_DEFAULTS } from '../constants/app'
import { APP_ERROR_CODES } from '../constants/tmdb'
import type { AppErrorCode } from '../types/appError'
import type { Genre } from '../types/genre'
import type { Movie } from '../types/movie'
import type { MovieDetails } from '../types/movieDetails'
import type { Person } from '../types/person'
import type { MovieFilters } from '../types/movieFilters'
import { getGenres, getMovieDetails, searchPeople } from '../tmdb'
import { getRandomMovie } from '../services/movieRandomizer'

function getErrorCode(error: unknown): AppErrorCode {
  const codes = Object.values(APP_ERROR_CODES)
  if (error instanceof Error) {
    const matchingCode = codes.find((code) => code === error.message)
    if (matchingCode) return matchingCode
  }
  return APP_ERROR_CODES.requestFailed
}

export function useMovieRandomizer() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [genreId, setGenreId] = useState(APP_DEFAULTS.emptyGenreId)
  const [actorQuery, setActorQuery] = useState(APP_DEFAULTS.emptyActorQuery)
  const [selectedActor, setSelectedActor] = useState<Person | null>(null)
  const [actorResults, setActorResults] = useState<Person[]>([])
  const [selectedFirstLetter, setSelectedFirstLetter] = useState(APP_DEFAULTS.emptyFirstLetter)
  const [actorSearchLoading, setActorSearchLoading] = useState(false)
  const [actorSearchError, setActorSearchError] = useState(false)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [error, setError] = useState<AppErrorCode | null>(null)
  const [detailsError, setDetailsError] = useState<AppErrorCode | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    getGenres().then(setGenres).catch(() => setGenres([]))
  }, [])

  useEffect(() => {
    const normalizedQuery = actorQuery.trim()
    if (normalizedQuery.length < APP_DEFAULTS.minimumActorQueryLength || normalizedQuery === selectedActor?.name) {
      setActorResults([])
      setActorSearchLoading(false)
      setActorSearchError(false)
      return
    }

    let active = true
    const timeout = window.setTimeout(() => {
      setActorSearchLoading(true)
      setActorSearchError(false)
      searchPeople(normalizedQuery)
        .then((people) => { if (active) setActorResults(people) })
        .catch(() => { if (active) { setActorResults([]); setActorSearchError(true) } })
        .finally(() => { if (active) setActorSearchLoading(false) })
    }, APP_DEFAULTS.actorSearchDebounceMs)

    return () => {
      active = false
      window.clearTimeout(timeout)
    }
  }, [actorQuery, selectedActor])

  async function findMovie(filters?: MovieFilters) {
    setLoading(true)
    setError(null)
    setShowFilters(Boolean(filters))
    try {
      const nextMovie = await getRandomMovie(filters)
      setMovie(nextMovie)
      setMovieDetails(null)
      setShowDetails(false)
      setDetailsError(null)
    } catch (reason) {
      setError(getErrorCode(reason))
    } finally {
      setLoading(false)
    }
  }

  async function toggleMovieDetails() {
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
      setDetailsError(getErrorCode(reason))
    } finally {
      setDetailsLoading(false)
    }
  }

  function backToRandomizer() {
    setMovie(null)
    setMovieDetails(null)
    setShowDetails(false)
    setShowFilters(false)
    setError(null)
    setDetailsError(null)
  }

  return {
    genres,
    genreId,
    setGenreId,
    movie,
    movieDetails,
    loading,
    detailsLoading,
    error,
    detailsError,
    showFilters,
    showDetails,
    findRandomMovie: () => findMovie(),
    findFilteredMovie: () => findMovie({ genreId, actor: selectedActor, firstLetter: selectedFirstLetter }),
    rerollMovie: () => findMovie(showFilters ? { genreId, actor: selectedActor, firstLetter: selectedFirstLetter } : undefined),
    actorQuery,
    setActorQuery: (query: string) => { setActorQuery(query); setSelectedActor(null) },
    actorResults,
    selectedActor,
    setSelectedActor: (actor: Person | null) => { setSelectedActor(actor); setActorQuery(actor?.name ?? APP_DEFAULTS.emptyActorQuery) },
    selectedFirstLetter,
    setSelectedFirstLetter,
    actorSearchLoading,
    actorSearchError,
    toggleMovieDetails,
    backToRandomizer,
    openFilters: () => { setShowFilters(true); setError(null) },
    closeFilters: () => { setShowFilters(false); setError(null) },
  }
}
