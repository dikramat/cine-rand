import { APP_DEFAULTS } from '../constants/app'
import { APP_ERROR_CODES } from '../constants/tmdb'

export const UI_TEXT = {
  metadata: {
    language: 'en',
    title: 'CineRandom - Find Your Next Movie',
    description: 'Find your next movie in seconds.',
  },
  brand: {
    nameStart: APP_DEFAULTS.siteNameStart,
    nameEnd: APP_DEFAULTS.siteNameEnd,
    posterAriaLabel: 'CineRandom - go to home',
    posterIcon: APP_DEFAULTS.clapperboardIcon,
    posterAlt: (title: string) => `Poster for ${title}`,
  },
  tagline: 'Find your next movie.',
  buttons: {
    randomMovie: 'Random Movie',
    chooseByFilters: 'Choose by Filters',
    searchMovie: 'Find a Movie',
    searching: 'Finding a movie...',
    anotherMovie: 'Another Movie',
    back: 'Back',
  },
  filters: {
    label: 'CHOOSE FILTERS',
    genre: 'GENRE',
    anyGenre: 'Any genre',
    firstLetter: 'FIRST LETTER OF TITLE',
    anyLetter: 'Any letter',
    actor: 'ACTOR',
    actorPlaceholder: 'Search for an actor',
    searchingActors: 'Searching actors...',
    actorSearchFailed: 'Could not search actors. Please try again.',
    actorResults: 'Actor search results',
    clearActor: 'Clear actor',
  },
  result: {
    missingYear: APP_DEFAULTS.missingYear,
    summary: (year: string, rating: string) => `YOUR RANDOM MOVIE | ${year} | Rating ${rating}`,
  },
  details: {
    toggle: 'More Details',
    hide: 'Hide Details',
    genres: 'Genres',
    runtime: 'Runtime',
    runtimeValue: (minutes: number) => `${minutes} min`,
    releaseDate: 'Release Date',
    tagline: 'Tagline',
    countries: 'Countries',
    originalLanguage: 'Original Language',
    unavailable: 'Not available',
    loading: 'Loading details...',
  },
  footer: {
    tmdbCredit: 'MOVIE DATA BY TMDB',
  },
  errors: {
    [APP_ERROR_CODES.missingApiKey]: 'Add VITE_TMDB_API_KEY to .env.local',
    [APP_ERROR_CODES.requestFailed]: 'TMDB is temporarily unavailable. Please try again.',
    [APP_ERROR_CODES.noMoviesFound]: 'No movies found for these filters. Try changing your selections.',
  },
} as const
