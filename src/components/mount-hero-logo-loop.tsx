import { createRoot, type Root } from 'react-dom/client'
import {
  HERO_LOOP_SPRITES,
  HERO_LOOP_SPRITE_COLS,
  HERO_LOOP_SPRITE_ROWS,
  HERO_LOOP_SPRITE_URL,
  spriteBackgroundPosition,
} from './hero-loop-sprites'
import LogoLoop, { type LogoItem } from './LogoLoop/LogoLoop'

let root: Root | null = null

function heroLogos(): LogoItem[] {
  return HERO_LOOP_SPRITES.map(({ title, col, row }) => ({
    title,
    node: (
      <span
        className="hero-loop-sprite"
        style={{
          backgroundImage: `url(${HERO_LOOP_SPRITE_URL})`,
          backgroundSize: `${HERO_LOOP_SPRITE_COLS * 100}% ${HERO_LOOP_SPRITE_ROWS * 100}%`,
          backgroundPosition: spriteBackgroundPosition(col, row),
        }}
        aria-hidden
      />
    ),
  }))
}

export function mountHeroLogoLoop(container: HTMLElement): void {
  root?.unmount()
  root = createRoot(container)
  root.render(
    <LogoLoop
      logos={heroLogos()}
      speed={100}
      direction="left"
      logoHeight={56}
      gap={28}
      fadeOut
      fadeOutColor="#030508"
      scaleOnHover
      pauseOnHover
      ariaLabel="Fitness motivation icons"
    />,
  )
}

export function unmountHeroLogoLoop(): void {
  root?.unmount()
  root = null
}
