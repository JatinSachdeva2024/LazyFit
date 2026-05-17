import { BODY_PART_LABELS, BODY_PARTS } from '../data'
import { guidesForBodyPart } from '../exercises'
import type { BodyPart } from '../types'
import { escapeHtml } from './helpers'

export function renderCreateSplit(): string {
  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-custom-splits" aria-label="Back">←</button>
      <h1>New split</h1>
      <p class="subtitle">Build days, pick muscles, choose exercises</p>
    </header>

    <section class="card create-split-tips">
      <p class="create-split-tips__title">How it works</p>
      <ol class="create-split-tips__list">
        <li>Add a training day (e.g. Push, Legs).</li>
        <li>Select body parts for that day.</li>
        <li>Pick which exercises to include — or keep all checked.</li>
        <li>Save, then train like any famous split (gym bag & sets).</li>
      </ol>
    </section>

    <form id="create-split-form" class="form">
      <label class="field">
        <span>Split name</span>
        <input type="text" name="name" placeholder="e.g. My 4-day split" required />
      </label>

      <div id="split-days-container" class="split-days"></div>

      <button type="button" class="btn btn--outline btn--block" data-action="add-split-day">
        + Add day
      </button>

      <button type="submit" class="btn btn--primary btn--block">Save split</button>
    </form>

    <template id="day-template">
      ${renderDayEditorTemplate()}
    </template>
  `
}

function renderDayEditorTemplate(): string {
  return `
    <div class="day-editor card">
      <div class="day-editor__header">
        <input type="text" class="day-name" placeholder="Day name (e.g. Push)" required />
        <button type="button" class="icon-btn" data-action="remove-day" aria-label="Remove day">×</button>
      </div>

      <p class="day-editor__label">Body parts on this day</p>
      <ul class="body-part-pick-list">
        ${BODY_PARTS.map((part) => renderBodyPartPickRow(part)).join('')}
      </ul>

      <div class="day-exercise-panels">
        ${BODY_PARTS.map((part) => renderDayExercisePanel(part)).join('')}
      </div>
    </div>
  `
}

function renderBodyPartPickRow(part: BodyPart): string {
  const count = guidesForBodyPart(part).length
  return `
    <li>
      <label class="body-part-pick">
        <input type="checkbox" class="body-part-pick__input" value="${part}" />
        <span class="body-part-pick__icon">${iconForPart(part)}</span>
        <span class="body-part-pick__text">
          <strong>${escapeHtml(BODY_PART_LABELS[part])}</strong>
          <span class="muted">${count} exercises available</span>
        </span>
      </label>
    </li>
  `
}

function renderDayExercisePanel(part: BodyPart): string {
  const guides = guidesForBodyPart(part)
  return `
    <div class="day-part-exercises" data-part="${part}" hidden>
      <div class="day-part-exercises__head">
        <h4>${escapeHtml(BODY_PART_LABELS[part])} exercises</h4>
        <label class="select-all-label">
          <input type="checkbox" class="select-all-exercises" checked />
          <span>All</span>
        </label>
      </div>
      <ul class="exercise-pick-list">
        ${guides
          .map(
            (g) => `
          <li>
            <label class="exercise-pick">
              <input
                type="checkbox"
                class="exercise-pick__input"
                name="exercise-${part}"
                value="${g.id}"
                checked
              />
              <span>${escapeHtml(g.name)}</span>
            </label>
          </li>
        `,
          )
          .join('')}
      </ul>
    </div>
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
