import { TMDB_CONFIG } from '../../constants/tmdb'
import { UI_TEXT } from '../../locales/en'
import './TmdbCredit.css'

export function TmdbCredit() {
  return (
    <a className="tmdb-credit" href={TMDB_CONFIG.websiteUrl} target="_blank" rel="noreferrer">
      {UI_TEXT.footer.tmdbCredit}
    </a>
  )
}
