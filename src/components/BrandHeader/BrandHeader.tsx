import { UI_TEXT } from '../../locales/en'
import './BrandHeader.css'

export function BrandHeader() {
  return (
    <header className="brand-header">
      <a className="brand-header__clapper" href="#home" aria-label={UI_TEXT.brand.posterAriaLabel}>
        {UI_TEXT.brand.posterIcon}
      </a>
      <h1 className="brand-header__name" id="home">
        <span>{UI_TEXT.brand.nameStart}</span>
        <span className="brand-header__gradient">{UI_TEXT.brand.nameEnd}</span>
      </h1>
      <p className="brand-header__tagline">{UI_TEXT.tagline}</p>
    </header>
  )
}
