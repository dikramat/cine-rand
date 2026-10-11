import { APP_ERROR_CODES, TMDB_CONFIG } from '../constants/tmdb'
import { APP_DEFAULTS } from '../constants/app'
import type { Movie } from '../types/movie'
import type { MovieFilters } from '../types/movieFilters'
import type { MovieDiscoverParams } from '../types/tmdb'
import { discoverMovies, getTopRatedMovies } from '../tmdb'

function isValidYear(value: string) {
  return !value || (Number.isInteger(Number(value)) && Number(value) >= APP_DEFAULTS.minimumValidYear)
}

function validateYearRange(filters?: MovieFilters) {
  if (!filters) return
  const { fromYear, toYear } = filters
  const hasValidYears = isValidYear(fromYear) && isValidYear(toYear)
  const hasValidOrder = !fromYear || !toYear || Number(fromYear) <= Number(toYear)
  if (!hasValidYears || !hasValidOrder) throw new Error(APP_ERROR_CODES.invalidYearRange)
}

export async function getRandomMovie(filters?: MovieFilters): Promise<Movie> {
  validateYearRange(filters)
  const { discoverParams, firstDiscoverPage, maximumDiscoverPage } = TMDB_CONFIG
  const params: MovieDiscoverParams = {
    [discoverParams.adultContent]: discoverParams.adultContentDisabled,
    [discoverParams.videoContent]: discoverParams.videoContentDisabled,
    [discoverParams.sortBy]: discoverParams.sortOrder,
    ...(filters?.genreId ? { [discoverParams.genre]: filters.genreId } : {}),
    ...(filters?.actor ? { [discoverParams.cast]: String(filters.actor.id) } : {}),
    ...(filters?.fromYear ? { [discoverParams.releaseDateFrom]: `${filters.fromYear}${TMDB_CONFIG.yearDateBoundaries.start}` } : {}),
    ...(filters?.toYear ? { [discoverParams.releaseDateTo]: `${filters.toYear}${TMDB_CONFIG.yearDateBoundaries.end}` } : {}),
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

export async function getRandomTopRatedMovie(): Promise<Movie> {
  const firstPage = await getTopRatedMovies(String(TMDB_CONFIG.firstDiscoverPage))
  const poolSize = Math.min(firstPage.total_results, APP_DEFAULTS.topRatedPoolSize)
  if (!poolSize) throw new Error(APP_ERROR_CODES.noMoviesFound)

  const randomRank = Math.floor(Math.random() * poolSize)
  const page = Math.floor(randomRank / TMDB_CONFIG.moviesPerPage) + TMDB_CONFIG.firstDiscoverPage
  const pageResults = page === TMDB_CONFIG.firstDiscoverPage
    ? firstPage
    : await getTopRatedMovies(String(page))
  const pageMovies = pageResults.results.filter((movie) => movie.poster_path && movie.overview)
  if (!pageMovies.length) throw new Error(APP_ERROR_CODES.noMoviesFound)
  const randomIndex = Math.floor(Math.random() * pageMovies.length) + APP_DEFAULTS.movieIndexMinimum
  return pageMovies[randomIndex]
}
