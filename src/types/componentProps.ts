import type { AppErrorCode } from './appError'
import type { Genre } from './genre'
import type { Movie } from './movie'
import type { MovieDetails } from './movieDetails'
import type { Person } from './person'

export type MovieActionsProps = {
  loading: boolean
  onRandomMovie: () => void
  onOpenFilters: () => void
}

export type GenreFilterProps = {
  genres: Genre[]
  selectedGenreId: string
  selectedActor: Person | null
  actorQuery: string
  actorResults: Person[]
  selectedFirstLetter: string
  actorSearchLoading: boolean
  actorSearchError: boolean
  loading: boolean
  onSelectGenre: (genreId: string) => void
  onActorQueryChange: (query: string) => void
  onSelectActor: (actor: Person | null) => void
  onSelectFirstLetter: (letter: string) => void
  onSubmit: () => void
  onClose: () => void
}

export type MovieResultProps = {
  movie: Movie
  details: MovieDetails | null
  loading: boolean
  detailsLoading: boolean
  detailsError: AppErrorCode | null
  showDetails: boolean
  onReroll: () => void
  onBack: () => void
  onToggleDetails: () => void
}

export type ErrorMessageProps = {
  error: AppErrorCode
}

export type MovieDetailsProps = {
  details: MovieDetails | null
  loading: boolean
  error: AppErrorCode | null
}
