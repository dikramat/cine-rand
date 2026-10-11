import { GenreFilter } from '../GenreFilter/GenreFilter'
import type { GenreFilterProps } from '../../types/componentProps'

export function FilterSelectionScreen(props: GenreFilterProps) {
  return <GenreFilter {...props} />
}
