import { BODY_PART_LABELS, BODY_PARTS } from '../data'
import { exerciseCountForPart } from '../exercises'
import type { BodyPart } from '../types'
import { escapeHtml } from './helpers'

export function renderBodyParts(): string {
  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-home" aria-label="Back">←</button>
      <h1>Body part</h1>
      <p class="subtitle">Choose a muscle group to see all exercises</p>
    </header>

    <ul class="body-part-list">
      ${BODY_PARTS.map(
        (part) => `
        <li>
          <button
            type="button"
            class="body-part-card"
            data-action="open-body-part-standalone"
            data-body-part="${part}"
          >
            <span class="body-part-card__icon">${iconForPart(part)}</span>
            <div class="body-part-card__text">
              <strong>${escapeHtml(BODY_PART_LABELS[part])}</strong>
              <span class="muted">${exerciseCountForPart(part)} exercises</span>
            </div>
            <span class="chevron">›</span>
          </button>
        </li>
      `,
      ).join('')}
    </ul>
  `
}

function iconForPart(part: BodyPart): string {
  const icons: Record<BodyPart, string> = {
    chest: '◆',
    back: '◇',
    shoulders: '△',
    biceps: '⌒',
    triceps: '⌓',
    legs: '⫯',
    glutes: '○',
    core: '◎',
    'full body': '✦',
  }
  return icons[part]
}
