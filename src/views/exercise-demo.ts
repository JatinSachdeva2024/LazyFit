import { renderExerciseMedia } from '../components/exercise-media'
import { guideById } from '../exercises'
import { state } from '../state'
import { escapeHtml } from './helpers'
import { renderLogSetForm } from './log-set-form'
import { renderRepBadge } from './rep-badge'

export function renderExerciseDemo(): string {
  const guide = state.selectedExerciseId
    ? guideById(state.selectedExerciseId)
    : undefined
  if (!guide) return ''

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-body-part-detail" aria-label="Back">←</button>
      <h1>${escapeHtml(guide.name)}</h1>
      <p class="subtitle">Follow the movement</p>
    </header>

    <section class="demo-card card demo-card--full">
      ${renderExerciseMedia(guide)}
    </section>

    ${renderRepBadge(guide)}

    <section class="section">
      <h2 class="section-title">How to do it</h2>
      <ol class="steps-list">
        ${guide.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
      </ol>
    </section>

    <section class="section tip-card">
      <h2 class="section-title">Tip</h2>
      <p>${escapeHtml(guide.tips)}</p>
    </section>

    ${renderLogSetForm(guide.id)}
  `
}
