import './AmbientBackground.css'

export function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-background__glow ambient-background__glow--left" />
      <div className="ambient-background__glow ambient-background__glow--right" />
    </div>
  )
}
