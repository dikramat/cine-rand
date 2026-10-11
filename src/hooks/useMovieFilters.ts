import { useEffect, useState } from 'react'
import { APP_DEFAULTS } from '../constants/app'
import type { Person } from '../types/person'
import { searchPeople } from '../tmdb'

export function useMovieFilters() {
  const [genreId, setGenreId] = useState<string>(APP_DEFAULTS.emptyGenreId)
  const [actorQuery, setActorQueryValue] = useState<string>(APP_DEFAULTS.emptyActorQuery)
  const [selectedActor, setSelectedActorValue] = useState<Person | null>(null)
  const [actorResults, setActorResults] = useState<Person[]>([])
  const [selectedFirstLetter, setSelectedFirstLetter] = useState<string>(APP_DEFAULTS.emptyFirstLetter)
  const [fromYear, setFromYear] = useState<string>(APP_DEFAULTS.emptyFromYear)
  const [toYear, setToYear] = useState<string>(APP_DEFAULTS.emptyToYear)
  const [actorSearchLoading, setActorSearchLoading] = useState(false)
  const [actorSearchError, setActorSearchError] = useState(false)

  useEffect(() => {
    const normalizedQuery = actorQuery.trim()
    if (normalizedQuery.length < APP_DEFAULTS.minimumActorQueryLength || normalizedQuery === selectedActor?.name) {
      setActorResults([])
      setActorSearchLoading(false)
      setActorSearchError(false)
      return
    }

    let active = true
    const timeout = window.setTimeout(() => {
      setActorSearchLoading(true)
      setActorSearchError(false)
      searchPeople(normalizedQuery)
        .then((people) => { if (active) setActorResults(people) })
        .catch(() => { if (active) { setActorResults([]); setActorSearchError(true) } })
        .finally(() => { if (active) setActorSearchLoading(false) })
    }, APP_DEFAULTS.actorSearchDebounceMs)

    return () => {
      active = false
      window.clearTimeout(timeout)
    }
  }, [actorQuery, selectedActor])

  function setActorQuery(query: string) {
    setActorQueryValue(query)
    setSelectedActorValue(null)
  }

  function setSelectedActor(actor: Person | null) {
    setSelectedActorValue(actor)
    setActorQueryValue(actor?.name ?? APP_DEFAULTS.emptyActorQuery)
  }

  function resetFilters() {
    setGenreId(APP_DEFAULTS.emptyGenreId)
    setActorQueryValue(APP_DEFAULTS.emptyActorQuery)
    setSelectedActorValue(null)
    setActorResults([])
    setSelectedFirstLetter(APP_DEFAULTS.emptyFirstLetter)
    setFromYear(APP_DEFAULTS.emptyFromYear)
    setToYear(APP_DEFAULTS.emptyToYear)
    setActorSearchLoading(false)
    setActorSearchError(false)
  }

  return {
    genreId,
    setGenreId,
    actorQuery,
    setActorQuery,
    selectedActor,
    setSelectedActor,
    actorResults,
    selectedFirstLetter,
    setSelectedFirstLetter,
    fromYear,
    setFromYear,
    toYear,
    setToYear,
    actorSearchLoading,
    actorSearchError,
    resetFilters,
  }
}
