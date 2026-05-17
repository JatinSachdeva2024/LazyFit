import type { ExerciseGuide } from '../types'
import { escapeHtml } from './helpers'

export function renderRepBadge(guide: ExerciseGuide): string {
  if (!guide.sets && !guide.reps) return ''
  const parts: string[] = []
  if (guide.sets) parts.push(`${guide.sets} sets`)
  if (guide.reps) parts.push(`${guide.reps} reps`)
  return `
    <p class="exercise-item__reps" aria-label="Recommended for muscle growth">
      <span class="reps-badge">${escapeHtml(parts.join(' · '))}</span>
      <span class="reps-badge__label">optimal for growth</span>
    </p>
  `
}
