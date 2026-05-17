import { getDayGroups } from '../data'
import { exerciseCountForPart } from '../exercises'
import { state } from '../state'
import type { BodyPart } from '../types'
import { escapeHtml } from './helpers'

export function renderSplitDay(): string {
  const split = state.selectedSplit
  if (!split) return ''

  const day = split.days[state.selectedDayIndex]
  if (!day) return ''

  const groups = getDayGroups(day)

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-split-detail" aria-label="Back">←</button>
      <h1>${escapeHtml(day.name)}</h1>
      <p class="subtitle">${escapeHtml(split.name)} · tap a muscle group to see exercises</p>
    </header>

    <section class="section">
      <h2 class="section-title">Body parts</h2>
      <ul class="body-part-list">
        ${groups
          .map((group) => {
            const count = group.bodyParts.reduce(
              (sum, part) => sum + exerciseCountForPart(part, day),
              0,
            )
            const partsAttr = group.bodyParts.join(',')
            return `
          <li>
            <button
              type="button"
              class="body-part-card"
              data-action="open-body-part-group"
              data-body-parts="${partsAttr}"
              data-group-label="${escapeHtml(group.label)}"
            >
              <span class="body-part-card__icon">${iconForGroup(group.bodyParts)}</span>
              <div class="body-part-card__text">
                <strong>${escapeHtml(group.label)}</strong>
                <span class="muted">${count} exercises with demos</span>
              </div>
              <span class="chevron">›</span>
            </button>
          </li>
        `
          })
          .join('')}
      </ul>
    </section>

    <footer class="sticky-footer sticky-footer--split">
      <button type="button" class="btn btn--outline btn--block" data-action="start-split-workout">
        Start workout
      </button>
      <button type="button" class="btn btn--primary btn--block" data-action="go-workout">
        Log workout
      </button>
    </footer>
  `
}

function iconForGroup(parts: BodyPart[]): string {
  if (parts.includes('legs') && parts.includes('glutes')) return '⫯'
  const icons: Record<string, string> = {
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
  return icons[parts[0] ?? ''] ?? '•'
}
