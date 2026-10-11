import { MovieResult } from '../MovieResult/MovieResult'
import type { MovieResultProps } from '../../types/componentProps'

export function MovieResultScreen(props: MovieResultProps) {
  return <MovieResult {...props} />
}
