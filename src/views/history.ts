import { state } from '../state'
import { renderRecentSessionItem } from './workout-detail'

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
      <ul class="recent-sessions">
        ${sessions.map((s) => renderRecentSessionItem(s, { showDate: true })).join('')}
      </ul>
    `
        : '<p class="empty-state">No workouts yet. Complete a workout from your gym bag.</p>'
    }
  `
}
