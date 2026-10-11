import type { Person } from './person'

export type MovieFilters = {
  genreId: string
  actor: Person | null
  firstLetter: string
}
