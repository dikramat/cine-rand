import { RandomizerScreen } from '../RandomizerScreen/RandomizerScreen'
import { useMovieRandomizer } from '../../hooks/useMovieRandomizer'
import type { RandomizerScreenView } from '../../types/randomizerScreenProps'

export function RandomizerFlow() {
  const randomizer = useMovieRandomizer()
  const { catalog, filters, result, actions } = randomizer
  const view: RandomizerScreenView = result.movie
    ? {
        mode: 'result',
        error: result.error,
        props: {
          movie: result.movie,
          details: result.movieDetails,
          loading: result.loading,
          detailsLoading: result.detailsLoading,
          detailsError: result.detailsError,
          showDetails: result.showDetails,
          onReroll: actions.rerollMovie,
          onBack: actions.backToRandomizer,
          onToggleDetails: actions.toggleMovieDetails,
        },
      }
    : result.showFilters
      ? {
          mode: 'filters',
          error: result.error,
          props: {
            genres: catalog.genres,
            selectedGenreId: filters.genreId,
            selectedActor: filters.selectedActor,
            actorQuery: filters.actorQuery,
            actorResults: filters.actorResults,
            selectedFirstLetter: filters.selectedFirstLetter,
            fromYear: filters.fromYear,
            toYear: filters.toYear,
            actorSearchLoading: filters.actorSearchLoading,
            actorSearchError: filters.actorSearchError,
            loading: result.loading,
            onSelectGenre: filters.setGenreId,
            onActorQueryChange: filters.setActorQuery,
            onSelectActor: filters.setSelectedActor,
            onSelectFirstLetter: filters.setSelectedFirstLetter,
            onFromYearChange: filters.setFromYear,
            onToYearChange: filters.setToYear,
            onSubmit: actions.findFilteredMovie,
            onClose: actions.closeFilters,
          },
        }
      : {
          mode: 'home',
          error: result.error,
          props: {
            actions: {
              loading: result.loading,
              onRandomMovie: actions.findRandomMovie,
              onTopRatedMovie: actions.findTopRatedMovie,
              onOpenFilters: actions.openFilters,
            },
            trending: {
              movies: catalog.trendingMovies,
              loading: catalog.trendingMoviesLoading,
              error: catalog.trendingMoviesError,
              onSelectMovie: actions.selectTrendingMovie,
            },
          },
        }

  return <RandomizerScreen view={view} />
}
