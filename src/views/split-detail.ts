import { getDayGroups } from '../data'
import { state } from '../state'
import { escapeHtml } from './helpers'

export function renderSplitDetail(): string {
  const split = state.selectedSplit
  if (!split) return ''

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-split-back" aria-label="Back">←</button>
      <h1>${escapeHtml(split.name)}</h1>
      <p class="subtitle">${escapeHtml(split.description)}</p>
    </header>

    <section class="section">
      <h2 class="section-title">Choose a day</h2>
      <ul class="day-list">
        ${split.days
          .map(
            (day, i) => `
          <li>
            <button
              type="button"
              class="day-card"
              data-action="open-split-day"
              data-day-index="${i}"
            >
              <strong>${escapeHtml(day.name)}</strong>
              <span class="muted">
                ${getDayGroups(day)
                  .map((g) => g.label)
                  .join(' · ')}
              </span>
            </button>
          </li>
        `,
          )
          .join('')}
      </ul>
    </section>
  `
}
