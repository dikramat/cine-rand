import './App.css'
import { AmbientBackground } from './components/AmbientBackground/AmbientBackground'
import { RandomizerFlow } from './components/RandomizerFlow/RandomizerFlow'
import { TmdbCredit } from './components/TmdbCredit/TmdbCredit'

export default function App() {
  return (
    <main className="app-shell">
      <AmbientBackground />
      <RandomizerFlow />
      <TmdbCredit />
    </main>
  )
}
