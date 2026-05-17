import { renderExerciseMedia } from '../components/exercise-media'
import { BODY_PART_LABELS } from '../data'
import { guidesForSplitDay } from '../exercises'
import { state } from '../state'
import type { ExerciseGuide } from '../types'
import { escapeHtml } from './helpers'
import { renderLogSetForm } from './log-set-form'
import { renderRepBadge } from './rep-badge'

export function renderBodyPartDetail(): string {
  const parts = state.selectedBodyParts
  if (!parts.length) return ''

  const split = state.selectedSplit
  const day = split?.days[state.selectedDayIndex]
  const guides = guidesForSplitDay(parts, day)
  const title =
    state.selectedBodyPartLabel ??
    parts.map((p) => BODY_PART_LABELS[p]).join(' & ')
  const backAction = split ? 'go-split-day' : 'go-body-parts'

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="${backAction}" aria-label="Back">←</button>
      <h1>${escapeHtml(title)}</h1>
      <p class="subtitle">${day ? escapeHtml(day.name) : 'Exercises'} · ${guides.length} movements</p>
    </header>

    <ul class="exercise-stack">
      ${guides.map((g) => renderExerciseItem(g)).join('')}
    </ul>

    <footer class="sticky-footer sticky-footer--split">
      <button type="button" class="btn btn--outline btn--block" data-action="go-workout">
        Log workout
      </button>
      <button type="button" class="btn btn--primary btn--block" data-action="go-gym-bag">
        Review gym bag
      </button>
    </footer>
  `
}

function renderExerciseItem(guide: ExerciseGuide): string {
  return `
    <li class="exercise-item card" id="exercise-${guide.id}">
      ${renderExerciseMedia(guide)}
      <div class="exercise-item__body">
        <div class="exercise-item__head">
          <h2 class="exercise-item__title">${escapeHtml(guide.name)}</h2>
          <button
            type="button"
            class="link-btn"
            data-action="open-exercise-demo"
            data-exercise-id="${guide.id}"
          >
            Demo
          </button>
        </div>
        ${renderRepBadge(guide)}
        <ol class="exercise-item__steps">
          ${guide.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
        </ol>
        <p class="exercise-item__tip">${escapeHtml(guide.tips)}</p>
        ${renderLogSetForm(guide.id)}
      </div>
    </li>
  `
}
