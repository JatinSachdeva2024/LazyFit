import { renderExerciseAnimation } from './exercise-animation'
import type { ExerciseGuide } from '../types'
import { escapeHtml } from '../views/helpers'

export function renderExerciseMedia(guide: ExerciseGuide): string {
  if (guide.media) {
    return `
      <div class="exercise-media exercise-media--gif">
        <img
          src="${escapeHtml(guide.media)}"
          alt="${escapeHtml(guide.name)} demonstration"
          loading="lazy"
          decoding="async"
        />
      </div>
    `
  }

  return `
    <div class="exercise-media exercise-media--svg">
      ${renderExerciseAnimation(guide.animation)}
    </div>
  `
}
