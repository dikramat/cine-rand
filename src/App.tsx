import './App.css'
import { AmbientBackground } from './components/AmbientBackground/AmbientBackground'
import { BrandHeader } from './components/BrandHeader/BrandHeader'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { GenreFilter } from './components/GenreFilter/GenreFilter'
import { MovieActions } from './components/MovieActions/MovieActions'
import { MovieResult } from './components/MovieResult/MovieResult'
import { TmdbCredit } from './components/TmdbCredit/TmdbCredit'
import { useMovieRandomizer } from './hooks/useMovieRandomizer'

export default function App() {
  const {
    genres,
    genreId,
    setGenreId,
    actorQuery,
    setActorQuery,
    actorResults,
    selectedActor,
    setSelectedActor,
    selectedFirstLetter,
    setSelectedFirstLetter,
    actorSearchLoading,
    actorSearchError,
    movie,
    movieDetails,
    loading,
    detailsLoading,
    error,
    detailsError,
    showFilters,
    showDetails,
    findRandomMovie,
    findFilteredMovie,
    rerollMovie,
    toggleMovieDetails,
    backToRandomizer,
    openFilters,
    closeFilters,
  } = useMovieRandomizer()

  return (
    <main className="app-shell">
      <AmbientBackground />
      <section className="app-content">
        <BrandHeader />
        {movie ? (
          <MovieResult
            movie={movie}
            details={movieDetails}
            loading={loading}
            detailsLoading={detailsLoading}
            detailsError={detailsError}
            showDetails={showDetails}
            onReroll={rerollMovie}
            onBack={backToRandomizer}
            onToggleDetails={toggleMovieDetails}
          />
        ) : showFilters ? (
          <GenreFilter
            genres={genres}
            selectedGenreId={genreId}
            selectedActor={selectedActor}
            actorQuery={actorQuery}
            actorResults={actorResults}
            selectedFirstLetter={selectedFirstLetter}
            actorSearchLoading={actorSearchLoading}
            actorSearchError={actorSearchError}
            loading={loading}
            onSelectGenre={setGenreId}
            onActorQueryChange={setActorQuery}
            onSelectActor={setSelectedActor}
            onSelectFirstLetter={setSelectedFirstLetter}
            onSubmit={findFilteredMovie}
            onClose={closeFilters}
          />
        ) : (
          <MovieActions loading={loading} onRandomMovie={findRandomMovie} onOpenFilters={openFilters} />
        )}
        {error && <ErrorMessage error={error} />}
      </section>
      <TmdbCredit />
    </main>
  )
}
