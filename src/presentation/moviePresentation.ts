import { TMDB_CONFIG } from '../constants/tmdb'
import { UI_TEXT } from '../locales/en'
import type { Movie } from '../types/movie'

export function getMovieSummary(movie: Movie) {
  const year = movie.release_date?.slice(TMDB_CONFIG.yearCharacterOffset, TMDB_CONFIG.yearCharacterCount) || UI_TEXT.result.missingYear
  const rating = movie.vote_average.toFixed(TMDB_CONFIG.ratingDecimalPlaces)
  return UI_TEXT.result.summary(year, rating)
}
