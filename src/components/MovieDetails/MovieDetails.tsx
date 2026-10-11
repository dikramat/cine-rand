import { UI_TEXT } from '../../locales/en'
import type { MovieDetailsProps } from '../../types/componentProps'
import './MovieDetails.css'

export function MovieDetails({ details, loading, error }: MovieDetailsProps) {
  if (loading) return <p className="movie-details__status">{UI_TEXT.details.loading}</p>
  if (error) return <p className="movie-details__status movie-details__status--error" role="alert">{UI_TEXT.errors[error]}</p>
  if (!details) return null

  const fields = [
    { label: UI_TEXT.details.genres, value: details.genres.map((genre) => genre.name).join(', ') },
    { label: UI_TEXT.details.runtime, value: details.runtime ? UI_TEXT.details.runtimeValue(details.runtime) : '' },
    { label: UI_TEXT.details.releaseDate, value: details.release_date },
    { label: UI_TEXT.details.tagline, value: details.tagline },
    { label: UI_TEXT.details.countries, value: details.production_countries.map((country) => country.name).join(', ') },
    { label: UI_TEXT.details.originalLanguage, value: details.original_language },
  ]

  return (
    <dl className="movie-details">
      {fields.map(({ label, value }) => (
        <div className="movie-details__row" key={label}>
          <dt>{label}</dt>
          <dd>{value || UI_TEXT.details.unavailable}</dd>
        </div>
      ))}
    </dl>
  )
}
