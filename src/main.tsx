import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { UI_TEXT } from './locales/en'
import './styles.css'

const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
if (description) description.content = UI_TEXT.metadata.description

document.documentElement.lang = UI_TEXT.metadata.language
document.title = UI_TEXT.metadata.title

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
