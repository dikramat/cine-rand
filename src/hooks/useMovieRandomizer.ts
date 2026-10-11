import type { MovieRandomizerModel } from '../types/movieRandomizer'
import { useMovieCatalog } from './useMovieCatalog'
import { useMovieDetails } from './useMovieDetails'
import { useMovieFilters } from './useMovieFilters'
import { useMovieSelection } from './useMovieSelection'

export function useMovieRandomizer() {
  const catalog = useMovieCatalog()
  const filters = useMovieFilters()
  const details = useMovieDetails()
  const selection = useMovieSelection({ filters, details })
  const randomizer: MovieRandomizerModel = {
    catalog,
    filters,
    result: selection.result,
    actions: selection.actions,
  }

  return randomizer
}
