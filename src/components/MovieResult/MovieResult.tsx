import { MovieDetails } from '../MovieDetails/MovieDetails'
import { getMovieSummary } from '../../presentation/moviePresentation'
import type { MovieResultProps } from '../../types/componentProps'
import { imageUrl } from '../../tmdb'
import { UI_TEXT } from '../../locales/en'
import './MovieResult.css'

export function MovieResult({ movie, details, loading, detailsLoading, detailsError, showDetails, onReroll, onBack, onToggleDetails }: MovieResultProps) {
  return (
    <div className="movie-result-layout">
      <article className="movie-result" aria-live="polite">
        <img className="movie-result__poster" src={imageUrl(movie.poster_path)} alt={UI_TEXT.brand.posterAlt(movie.title)} />
        <div className="movie-result__copy">
          <div className="movie-result__body">
            <p className="movie-result__summary">{getMovieSummary(movie)}</p>
            <h2 className="movie-result__title">{movie.title}</h2>
            <p className="movie-result__overview">{movie.overview}</p>
            {showDetails && <MovieDetails details={details} loading={detailsLoading} error={detailsError} />}
          </div>
          <div className="movie-result__controls">
            <button className="movie-result__details-toggle" onClick={onToggleDetails} disabled={loading || detailsLoading}>
              {detailsLoading ? UI_TEXT.details.loading : showDetails ? UI_TEXT.details.hide : UI_TEXT.details.toggle}
            </button>
            <button className="movie-result__reroll" onClick={onReroll} disabled={loading || detailsLoading}>
              {loading ? UI_TEXT.buttons.searching : UI_TEXT.buttons.anotherMovie}
            </button>
          </div>
        </div>
      </article>
      <button className="movie-result__back" onClick={onBack} disabled={loading}>
        {UI_TEXT.buttons.back}
      </button>
    </div>
  )
}
