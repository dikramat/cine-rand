import { MovieActions } from '../MovieActions/MovieActions'
import { TrendingMovies } from '../TrendingMovies/TrendingMovies'
import type { RandomizerHomeProps } from '../../types/randomizerScreenProps'

export function RandomizerHomeScreen({ actions, trending }: RandomizerHomeProps) {
  return (
    <>
      <TrendingMovies {...trending} />
      <MovieActions {...actions} />
    </>
  )
}
