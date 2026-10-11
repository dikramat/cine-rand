import { BrandHeader } from '../BrandHeader/BrandHeader'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import { FilterSelectionScreen } from '../FilterSelectionScreen/FilterSelectionScreen'
import { MovieResultScreen } from '../MovieResultScreen/MovieResultScreen'
import { RandomizerHomeScreen } from '../RandomizerHomeScreen/RandomizerHomeScreen'
import type { RandomizerScreenProps } from '../../types/randomizerScreenProps'

export function RandomizerScreen({ view }: RandomizerScreenProps) {
  const content = view.mode === 'result'
    ? <MovieResultScreen {...view.props} />
    : view.mode === 'filters'
      ? <FilterSelectionScreen {...view.props} />
      : <RandomizerHomeScreen {...view.props} />

  return (
    <section className="app-content">
      <BrandHeader />
      {content}
      {view.error && <ErrorMessage error={view.error} />}
    </section>
  )
}
