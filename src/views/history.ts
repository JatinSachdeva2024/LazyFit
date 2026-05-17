import { state } from '../state'
import { formatBodyParts, formatDate, totalSets } from '../utils'
import { escapeHtml } from './helpers'

export function renderHistory(): string {
  const sessions = [...state.sessions]
    .filter((s) => s.completedAt)
    .reverse()

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-home" aria-label="Back">←</button>
      <h1>History</h1>
      <p class="subtitle">${sessions.length} completed workouts</p>
    </header>

    ${
      sessions.length
        ? `
      <ul class="history-list">
        ${sessions
          .map(
            (s) => `
          <li class="history-card card">
            <div class="history-card__top">
              <strong>${escapeHtml(s.label)}</strong>
              <time>${formatDate(s.completedAt!)}</time>
            </div>
            <p class="muted">${escapeHtml(formatBodyParts(s.bodyParts))}</p>
            <p class="history-stats">
              ${s.exercises.length} exercises · ${totalSets(s.exercises)} sets
            </p>
            <button
              type="button"
              class="btn btn--outline btn--block btn--danger"
              data-action="delete-session"
              data-session-id="${s.id}"
            >
              Delete workout
            </button>
          </li>
        `,
          )
          .join('')}
      </ul>
    `
        : '<p class="empty-state">No workouts yet. Complete a workout from your gym bag.</p>'
    }
  `
}
