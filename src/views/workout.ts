import { BODY_PART_LABELS, SUGGESTED_EXERCISES } from '../data'
import { state } from '../state'
import type { LoggedExercise } from '../types'
import { escapeHtml } from './helpers'
import { renderInlineLogSetForm } from './log-set-form'

export function renderWorkout(): string {
  const session = state.activeSession
  if (!session) return ''

  const suggestions = [
    ...new Set(
      session.bodyParts.flatMap((p) => SUGGESTED_EXERCISES[p] ?? []),
    ),
  ]

  return `
    <header class="page-header page-header--compact">
      <button type="button" class="back-btn" data-action="confirm-exit" aria-label="Back">←</button>
      <div>
        <h1>${escapeHtml(session.label)}</h1>
        <p class="subtitle">${session.bodyParts.map((p) => BODY_PART_LABELS[p]).join(' · ')}</p>
      </div>
    </header>

    <section class="section">
      <h2 class="section-title">Exercises</h2>
      ${
        session.exercises.length
          ? `<ul class="exercise-list">${session.exercises.map(renderExerciseCard).join('')}</ul>`
          : '<p class="empty-state">No exercises logged yet.</p>'
      }
    </section>

    <section class="section">
      <h2 class="section-title">Add exercise</h2>
      <form id="add-exercise-form" class="form form--inline">
        <input
          type="text"
          name="exercise"
          list="exercise-suggestions"
          placeholder="Exercise name"
          required
        />
        <datalist id="exercise-suggestions">
          ${suggestions.map((s) => `<option value="${escapeHtml(s)}">`).join('')}
        </datalist>
        <button type="submit" class="btn btn--primary">Add</button>
      </form>
      <div class="suggestions">
        ${suggestions
          .slice(0, 6)
          .map(
            (s) =>
              `<button type="button" class="chip chip--sm" data-action="quick-add" data-name="${escapeHtml(s)}">${escapeHtml(s)}</button>`,
          )
          .join('')}
      </div>
    </section>

    <footer class="workout-footer workout-footer--split">
      <button type="button" class="btn btn--outline btn--block" data-action="go-gym-bag">
        Review gym bag
      </button>
      <button type="button" class="btn btn--primary btn--block" data-action="finish-workout">
        Complete workout
      </button>
    </footer>
  `
}

function renderExerciseCard(ex: LoggedExercise): string {
  const setsHtml = ex.sets
    .map(
      (set, i) => `
      <li class="set-row">
        <span class="set-num">${i + 1}</span>
        <span>${set.reps} reps</span>
        <span>${set.weight} kg</span>
        <button
          type="button"
          class="icon-btn"
          data-action="remove-set"
          data-exercise-id="${ex.id}"
          data-set-index="${i}"
          aria-label="Remove set"
        >×</button>
      </li>
    `,
    )
    .join('')

  return `
    <li class="exercise-card card" data-exercise-id="${ex.id}">
      <div class="exercise-card__header">
        <strong>${escapeHtml(ex.name)}</strong>
        <button
          type="button"
          class="icon-btn"
          data-action="remove-exercise"
          data-exercise-id="${ex.id}"
          aria-label="Remove exercise"
        >×</button>
      </div>
      <ul class="set-list">${setsHtml || '<li class="muted">No sets yet</li>'}</ul>
      ${renderInlineLogSetForm(ex.id)}
    </li>
  `
}
