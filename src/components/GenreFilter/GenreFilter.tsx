import { APP_DEFAULTS } from '../../constants/app'
import { UI_TEXT } from '../../locales/en'
import type { GenreFilterProps } from '../../types/componentProps'
import './GenreFilter.css'

export function GenreFilter({ genres, selectedGenreId, selectedActor, actorQuery, actorResults, selectedFirstLetter, actorSearchLoading, actorSearchError, loading, onSelectGenre, onActorQueryChange, onSelectActor, onSelectFirstLetter, onSubmit, onClose }: GenreFilterProps) {
  return (
    <div className="genre-filter">
      <div className="genre-filter__field">
        <label className="genre-filter__label" htmlFor="genre">{UI_TEXT.filters.genre}</label>
        <div className="genre-filter__select-wrap">
          <select className="genre-filter__select" id="genre" value={selectedGenreId} onChange={(event) => onSelectGenre(event.target.value)}>
            <option value={APP_DEFAULTS.emptyGenreId}>{UI_TEXT.filters.anyGenre}</option>
            {genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
        </div>
      </div>
      <div className="genre-filter__field">
        <label className="genre-filter__label" htmlFor="first-letter">{UI_TEXT.filters.firstLetter}</label>
        <div className="genre-filter__select-wrap">
          <select className="genre-filter__select" id="first-letter" value={selectedFirstLetter} onChange={(event) => onSelectFirstLetter(event.target.value)}>
            <option value={APP_DEFAULTS.emptyFirstLetter}>{UI_TEXT.filters.anyLetter}</option>
            {APP_DEFAULTS.firstLetterOptions.map((letter) => <option key={letter} value={letter}>{letter}</option>)}
          </select>
        </div>
      </div>
      <div className="genre-filter__field">
        <label className="genre-filter__label" htmlFor="actor-search">{UI_TEXT.filters.actor}</label>
        <input className="genre-filter__select" id="actor-search" value={selectedActor?.name ?? actorQuery} placeholder={UI_TEXT.filters.actorPlaceholder} onChange={(event) => onActorQueryChange(event.target.value)} />
      </div>
      {actorSearchLoading && <p className="genre-filter__hint">{UI_TEXT.filters.searchingActors}</p>}
      {actorSearchError && <p className="genre-filter__hint" role="status">{UI_TEXT.filters.actorSearchFailed}</p>}
      {actorResults.length > 0 && (
        <div className="genre-filter__results" role="listbox" aria-label={UI_TEXT.filters.actorResults}>
          {actorResults.slice(0, APP_DEFAULTS.actorSearchResultLimit).map((actor) => (
            <button className="genre-filter__actor" key={actor.id} type="button" role="option" aria-selected="false" onClick={() => onSelectActor(actor)}>{actor.name}</button>
          ))}
        </div>
      )}
      {selectedActor && <button className="genre-filter__clear" type="button" onClick={() => onSelectActor(null)}>{UI_TEXT.filters.clearActor}</button>}
      <button className="genre-filter__submit" onClick={onSubmit} disabled={loading}>
        {loading ? UI_TEXT.buttons.searching : UI_TEXT.buttons.searchMovie}
      </button>
      <button className="genre-filter__back" onClick={onClose}>{UI_TEXT.buttons.back}</button>
    </div>
  )
}
