import { APP_ERROR_CODES, TMDB_CONFIG } from '../constants/tmdb'
import { APP_DEFAULTS } from '../constants/app'
import type { Movie } from '../types/movie'
import type { MovieFilters } from '../types/movieFilters'
import type { MovieDiscoverParams } from '../types/tmdb'
import { discoverMovies } from '../tmdb'

export async function getRandomMovie(filters?: MovieFilters): Promise<Movie> {
  const { discoverParams, firstDiscoverPage, maximumDiscoverPage } = TMDB_CONFIG
  const params: MovieDiscoverParams = {
    [discoverParams.adultContent]: discoverParams.adultContentDisabled,
    [discoverParams.videoContent]: discoverParams.videoContentDisabled,
    [discoverParams.sortBy]: discoverParams.sortOrder,
    ...(filters?.genreId ? { [discoverParams.genre]: filters.genreId } : {}),
    ...(filters?.actor ? { [discoverParams.cast]: String(filters.actor.id) } : {}),
  }
  const firstPage = await discoverMovies(params)
  const availablePages = Math.min(firstPage.total_pages, maximumDiscoverPage)
  if (!availablePages) throw new Error(APP_ERROR_CODES.noMoviesFound)

  const startPage = Math.floor(Math.random() * availablePages) + firstDiscoverPage
  const pagesToScan = Math.min(availablePages, APP_DEFAULTS.discoverPagesToScan)
  const movies: Movie[] = []
  for (let pageOffset = APP_DEFAULTS.movieIndexMinimum; pageOffset < pagesToScan; pageOffset += APP_DEFAULTS.pageOffset) {
    const page = ((startPage - firstDiscoverPage + pageOffset) % availablePages) + firstDiscoverPage
    const resultPage = await discoverMovies({ ...params, [discoverParams.page]: String(page) })
    movies.push(...resultPage.results.filter((movie) => {
      const hasDisplayData = movie.poster_path && movie.overview
      const startsWithLetter = !filters?.firstLetter || movie.title.trim().toLocaleUpperCase().startsWith(filters.firstLetter)
      return hasDisplayData && startsWithLetter
    }))
    if (movies.length) break
  }
  if (!movies.length) throw new Error(APP_ERROR_CODES.noMoviesFound)
  const randomIndex = Math.floor(Math.random() * movies.length) + APP_DEFAULTS.movieIndexMinimum
  return movies[randomIndex]
}
