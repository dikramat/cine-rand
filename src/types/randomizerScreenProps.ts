import type { AppErrorCode } from './appError'
import type { GenreFilterProps, MovieActionsProps, MovieResultProps, TrendingMoviesProps } from './componentProps'

export type RandomizerHomeProps = {
  actions: MovieActionsProps
  trending: TrendingMoviesProps
}

export type RandomizerScreenView =
  | { mode: 'result'; error: AppErrorCode | null; props: MovieResultProps }
  | { mode: 'filters'; error: AppErrorCode | null; props: GenreFilterProps }
  | { mode: 'home'; error: AppErrorCode | null; props: RandomizerHomeProps }

export type RandomizerScreenProps = {
  view: RandomizerScreenView
}
