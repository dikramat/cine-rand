import { useEffect, useRef, useState } from 'react'
import type { TransitionEvent as ReactTransitionEvent } from 'react'
import { APP_DEFAULTS } from '../../constants/app'
import { UI_TEXT } from '../../locales/en'
import type { TrendingMoviesProps } from '../../types/componentProps'
import { imageUrl } from '../../tmdb'
import './TrendingMovies.css'

export function TrendingMovies({ movies, loading, error, onSelectMovie }: TrendingMoviesProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const previousArrowRef = useRef<HTMLButtonElement>(null)
  const nextArrowRef = useRef<HTMLButtonElement>(null)
  const wheelLockRef = useRef<number | null>(null)
  const wheelHandlerRef = useRef<(event: WheelEvent) => void>(() => undefined)
  const [slideStep, setSlideStep] = useState(0)
  const [viewportWidth, setViewportWidth] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const currentIndex = activeIndex ?? movies.length

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    const track = trackRef.current
    if (!carousel || !track) return

    const measureSlide = () => {
      const firstSlide = track.querySelector<HTMLElement>('.trending-movies__item')
      const previousArrow = previousArrowRef.current
      const nextArrow = nextArrowRef.current
      if (!firstSlide || !previousArrow || !nextArrow) return

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap)
      const step = firstSlide.getBoundingClientRect().width + gap
      const carouselGap = Number.parseFloat(window.getComputedStyle(carousel).columnGap)
      const availableWidth = carousel.clientWidth - previousArrow.offsetWidth - nextArrow.offsetWidth - carouselGap * 2
      const visibleSlides = Math.max(1, Math.floor((availableWidth + gap) / step))

      setSlideStep(step)
      setViewportWidth(visibleSlides * step - gap)
    }

    const observer = new ResizeObserver(measureSlide)
    observer.observe(carousel)
    measureSlide()
    return () => observer.disconnect()
  }, [movies])

  useEffect(() => {
    if (hovered || focused || reducedMotion || movies.length < 2) return
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index ?? movies.length) + 1)
    }, APP_DEFAULTS.trendingCarouselAutoAdvanceMs)
    return () => window.clearInterval(interval)
  }, [movies.length, hovered, focused, reducedMotion])

  useEffect(() => () => {
    if (wheelLockRef.current !== null) window.clearTimeout(wheelLockRef.current)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const handleNativeWheel = (event: WheelEvent) => wheelHandlerRef.current(event)
    viewport.addEventListener('wheel', handleNativeWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleNativeWheel)
  }, [movies.length, loading, error])

  function moveByOne(direction: -1 | 1) {
    setActiveIndex((index) => {
      const nextIndex = (index ?? movies.length) + direction
      if (!reducedMotion || movies.length < 2) return nextIndex
      if (nextIndex < movies.length) return movies.length * 2 - 1
      if (nextIndex >= movies.length * 2) return movies.length
      return nextIndex
    })
  }

  function handleTransitionEnd(event: ReactTransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
    const firstOriginalIndex = movies.length
    const firstTrailingCloneIndex = movies.length * 2
    if (currentIndex >= firstTrailingCloneIndex) {
      setTransitionEnabled(false)
      setActiveIndex(firstOriginalIndex)
    } else if (currentIndex < firstOriginalIndex) {
      setTransitionEnabled(false)
      setActiveIndex(firstTrailingCloneIndex - 1)
    }
  }

  useEffect(() => {
    if (transitionEnabled) return
    const frame = window.requestAnimationFrame(() => setTransitionEnabled(true))
    return () => window.cancelAnimationFrame(frame)
  }, [transitionEnabled])

  function handleWheel(event: WheelEvent) {
    if (movies.length < 2) return
    const direction = event.deltaY || event.deltaX
    if (!direction) return
    event.preventDefault()
    if (wheelLockRef.current !== null) return
    moveByOne(direction > 0 ? 1 : -1)
    wheelLockRef.current = window.setTimeout(() => { wheelLockRef.current = null }, APP_DEFAULTS.trendingCarouselWheelThrottleMs)
  }
  wheelHandlerRef.current = handleWheel

  function renderMovie(movie: TrendingMoviesProps['movies'][number], collection: 'previous' | 'original' | 'next') {
    const isClone = collection !== 'original'
    return (
      <button
        className="trending-movies__item"
        key={`${collection}-${movie.id}`}
        type="button"
        onClick={() => onSelectMovie(movie)}
        aria-label={movie.title}
        aria-hidden={isClone}
        tabIndex={isClone ? -1 : undefined}
      >
        {movie.poster_path ? (
          <img className="trending-movies__poster" src={imageUrl(movie.poster_path)} alt="" loading="lazy" />
        ) : (
          <span className="trending-movies__poster-placeholder">{UI_TEXT.trending.posterUnavailable}</span>
        )}
        <span className="trending-movies__name">{movie.title}</span>
      </button>
    )
  }

  return (
    <section className="trending-movies" aria-labelledby="trending-movies-title">
      <h2 className="trending-movies__title" id="trending-movies-title">{UI_TEXT.trending.title}</h2>
      {loading ? (
        <p className="trending-movies__message" role="status">{UI_TEXT.trending.loading}</p>
      ) : error ? (
        <p className="trending-movies__message" role="status">{UI_TEXT.trending.unavailable}</p>
      ) : movies.length ? (
        <div
          className="trending-movies__carousel"
          ref={carouselRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
          }}
        >
          <button
            className="trending-movies__arrow trending-movies__arrow--previous"
            ref={previousArrowRef}
            type="button"
            aria-label={UI_TEXT.trending.previous}
            onClick={() => moveByOne(-1)}
            disabled={movies.length < 2}
          />
          <div className="trending-movies__viewport" ref={viewportRef} style={{ width: viewportWidth ?? undefined }}>
            <div
              className={`trending-movies__track${transitionEnabled ? '' : ' trending-movies__track--no-transition'}`}
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              style={{ transform: `translate3d(-${currentIndex * slideStep}px, 0, 0)` }}
            >
              {(['previous', 'original', 'next'] as const).flatMap((collection) =>
                movies.map((movie) => renderMovie(movie, collection)),
              )}
            </div>
          </div>
          <button
            className="trending-movies__arrow trending-movies__arrow--next"
            ref={nextArrowRef}
            type="button"
            aria-label={UI_TEXT.trending.next}
            onClick={() => moveByOne(1)}
            disabled={movies.length < 2}
          />
        </div>
      ) : (
        <p className="trending-movies__message">{UI_TEXT.trending.noMovies}</p>
      )}
    </section>
  )
}
