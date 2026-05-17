import { FAMOUS_SPLITS } from '../data'
import { escapeHtml } from './helpers'

export function renderSplits(): string {
  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-home" aria-label="Back">←</button>
      <h1>Famous splits</h1>
      <p class="subtitle">Pick a program, then choose today's day</p>
    </header>

    <ul class="split-list">
      ${FAMOUS_SPLITS.map(
        (split) => `
        <li>
          <button
            type="button"
            class="split-card"
            data-action="open-split"
            data-split-id="${split.id}"
          >
            <div class="split-card__main">
              <strong>${escapeHtml(split.name)}</strong>
              <span class="muted">${escapeHtml(split.description)}</span>
            </div>
            <span class="badge">${split.days.length} days</span>
          </button>
        </li>
      `,
      ).join('')}
    </ul>
  `
}
