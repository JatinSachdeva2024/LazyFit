/** 7×4 icon grid from /Screenshot_2026-05-17_200627-removebg-preview.png */
export const HERO_LOOP_SPRITE_URL = '/Screenshot_2026-05-17_200627-removebg-preview.png'

export const HERO_LOOP_SPRITE_COLS = 7
export const HERO_LOOP_SPRITE_ROWS = 4

export type HeroLoopSprite = {
  title: string
  col: number
  row: number
}

/** Curated icons across the sheet for the hero marquee */
export const HERO_LOOP_SPRITES: HeroLoopSprite[] = [
  { title: 'Barbell', col: 0, row: 0 },
  { title: 'Train Hard', col: 1, row: 0 },
  { title: 'Kettlebell', col: 3, row: 0 },
  { title: 'Dumbbells', col: 5, row: 0 },
  { title: 'Deadlift', col: 0, row: 1 },
  { title: 'No Excuses', col: 3, row: 1 },
  { title: 'Running', col: 4, row: 1 },
  { title: 'Stay Fit', col: 0, row: 2 },
  { title: 'Plank', col: 2, row: 2 },
  { title: 'Flex', col: 5, row: 2 },
  { title: 'Weight plate', col: 0, row: 3 },
  { title: 'Gym Life', col: 4, row: 3 },
]

export function spriteBackgroundPosition(col: number, row: number): string {
  const x =
    HERO_LOOP_SPRITE_COLS > 1
      ? (col / (HERO_LOOP_SPRITE_COLS - 1)) * 100
      : 0
  const y =
    HERO_LOOP_SPRITE_ROWS > 1
      ? (row / (HERO_LOOP_SPRITE_ROWS - 1)) * 100
      : 0
  return `${x}% ${y}%`
}
