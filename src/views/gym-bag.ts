import { bagIsEmpty } from '../cart'
import { state } from '../state'
import type { LoggedExercise } from '../types'
import { totalSets } from '../utils'
import { escapeHtml } from './helpers'
import { renderInlineLogSetForm } from './log-set-form'

export function renderGymBag(): string {
  const session = state.activeSession
  if (!session) {
    return `
      <header class="page-header">
        <button type="button" class="back-btn" data-action="go-home" aria-label="Back">←</button>
        <h1>Gym bag</h1>
        <p class="subtitle">Your workout cart is empty</p>
      </header>
      <p class="empty-state">Add exercises from a split and log sets to fill your gym bag.</p>
      <button type="button" class="btn btn--primary btn--block" data-action="go-splits">
        Browse splits
      </button>
    `
  }

  const empty = bagIsEmpty(session)
  const items = session.exercises.filter((e) => e.sets.length > 0)

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-back" aria-label="Back">←</button>
      <h1>Gym bag</h1>
      <p class="subtitle">${escapeHtml(session.label)} · ${items.length} exercises</p>
    </header>

    ${
      empty
        ? '<p class="empty-state">No sets logged yet. Add exercises and enter reps & weight first.</p>'
        : `
      <ul class="gym-bag-list">
        ${items.map((ex) => renderBagItem(ex)).join('')}
      </ul>
      <p class="gym-bag-summary muted">
        ${items.length} exercises · ${totalSets(items)} sets
      </p>
    `
    }

    <div class="gym-bag-actions">
      <button
        type="button"
        class="btn btn--primary btn--block"
        data-action="complete-workout"
        ${empty ? 'disabled' : ''}
      >
        Complete workout
      </button>
      <button type="button" class="btn btn--outline btn--block" data-action="discard-workout">
        Discard workout
      </button>
    </div>
  `
}

function renderBagItem(ex: LoggedExercise): string {
  const setsHtml = ex.sets
    .map(
      (set, i) => `
      <li class="bag-set-row">
        <span class="set-num">${i + 1}</span>
        <span>${set.reps} reps · ${set.weight} kg</span>
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
    <li class="gym-bag-item card">
      <div class="gym-bag-item__header">
        <strong>${escapeHtml(ex.name)}</strong>
        <button
          type="button"
          class="icon-btn"
          data-action="remove-exercise"
          data-exercise-id="${ex.id}"
          aria-label="Remove exercise"
        >×</button>
      </div>
      <ul class="bag-set-list">${setsHtml}</ul>
      ${renderInlineLogSetForm(ex.id)}
    </li>
  `
}
