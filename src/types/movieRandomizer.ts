import type { useMovieCatalog } from '../hooks/useMovieCatalog'
import type { useMovieFilters } from '../hooks/useMovieFilters'
import type { useMovieDetails } from '../hooks/useMovieDetails'
import type { Movie } from './movie'
import type { MovieDetails } from './movieDetails'
import type { AppErrorCode } from './appError'

export type MovieSelectionDependencies = {
  filters: Pick<ReturnType<typeof useMovieFilters>,
    'genreId' | 'selectedActor' | 'selectedFirstLetter' | 'fromYear' | 'toYear' | 'resetFilters'>
  details: Pick<ReturnType<typeof useMovieDetails>,
    'movieDetails' | 'detailsLoading' | 'detailsError' | 'showDetails' | 'resetMovieDetails' | 'toggleMovieDetails'>
}

export type MovieSelectionResult = {
  movie: Movie | null
  movieDetails: MovieDetails | null
  loading: boolean
  detailsLoading: boolean
  error: AppErrorCode | null
  detailsError: AppErrorCode | null
  showFilters: boolean
  showDetails: boolean
}

export type MovieSelectionActions = {
  findRandomMovie: () => Promise<void>
  findTopRatedMovie: () => Promise<void>
  findFilteredMovie: () => Promise<void>
  rerollMovie: () => Promise<void>
  toggleMovieDetails: () => Promise<void>
  selectTrendingMovie: (movie: Movie) => void
  backToRandomizer: () => void
  openFilters: () => void
  closeFilters: () => void
}

export type MovieRandomizerModel = {
  catalog: ReturnType<typeof useMovieCatalog>
  filters: ReturnType<typeof useMovieFilters>
  result: MovieSelectionResult
  actions: MovieSelectionActions
}
