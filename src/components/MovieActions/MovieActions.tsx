import { UI_TEXT } from '../../locales/en'
import type { MovieActionsProps } from '../../types/componentProps'
import './MovieActions.css'

export function MovieActions({ loading, onRandomMovie, onTopRatedMovie, onOpenFilters }: MovieActionsProps) {
  return (
    <div className="movie-actions">
      <button className="movie-actions__primary" onClick={onRandomMovie} disabled={loading}>
        {loading ? UI_TEXT.buttons.searching : UI_TEXT.buttons.randomMovie}
      </button>
      <button className="movie-actions__secondary" onClick={onOpenFilters}>
        {UI_TEXT.buttons.chooseByFilters}
      </button>
      <button className="movie-actions__tertiary" onClick={onTopRatedMovie} disabled={loading}>
        {loading ? UI_TEXT.buttons.searching : UI_TEXT.buttons.topRatedMovies}
      </button>
    </div>
  )
}
