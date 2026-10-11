import { UI_TEXT } from '../../locales/en'
import type { ErrorMessageProps } from '../../types/componentProps'
import './ErrorMessage.css'

export function ErrorMessage({ error }: ErrorMessageProps) {
  return <p className="error-message" role="alert">{UI_TEXT.errors[error]}</p>
}
