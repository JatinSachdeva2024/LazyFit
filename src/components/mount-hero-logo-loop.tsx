import { createRoot, type Root } from 'react-dom/client'
import { HERO_LOOP_ICONS } from './hero-loop-icons'
import LogoLoop, { type LogoItem } from './LogoLoop/LogoLoop'

let root: Root | null = null

const HERO_ICON_HEIGHT = 64

function heroLogos(): LogoItem[] {
  return HERO_LOOP_ICONS.map(({ title, src, width, height }) => ({
    title,
    src,
    alt: title,
    width,
    height,
  }))
}

export function mountHeroLogoLoop(container: HTMLElement): void {
  root?.unmount()
  root = createRoot(container)
  root.render(
    <LogoLoop
      logos={heroLogos()}
      speed={90}
      direction="left"
      logoHeight={HERO_ICON_HEIGHT}
      gap={40}
      fadeOut={false}
      scaleOnHover
      pauseOnHover
      ariaLabel="Fitness motivation icons"
      className="hero-logo-loop"
    />,
  )
}

export function unmountHeroLogoLoop(): void {
  root?.unmount()
  root = null
}
