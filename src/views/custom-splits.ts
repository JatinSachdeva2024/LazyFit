import { exerciseCountForPart } from '../exercises'
import { state } from '../state'
import { escapeHtml } from './helpers'

function totalExercisesForSplit(split: (typeof state.customSplits)[0]): number {
  return split.days.reduce((sum, day) => {
    return (
      sum +
      day.bodyParts.reduce((partSum, part) => partSum + exerciseCountForPart(part, day), 0)
    )
  }, 0)
}

export function renderCustomSplits(): string {
  const splits = state.customSplits

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-home" aria-label="Back">←</button>
      <h1>My splits</h1>
      <p class="subtitle">Create routines with your own days, muscles & exercises</p>
    </header>

    <button type="button" class="btn btn--primary btn--block" data-action="go-create-split">
      + Create split
    </button>

    ${
      splits.length
        ? `
      <ul class="split-list section">
        ${splits
          .map(
            (split) => `
          <li class="custom-split-row">
            <button
              type="button"
              class="split-card"
              data-action="open-custom-split"
              data-split-id="${split.id}"
            >
              <div class="split-card__main">
                <strong>${escapeHtml(split.name)}</strong>
                <span class="muted">
                  ${split.days.length} days · ${totalExercisesForSplit(split)} exercises
                </span>
              </div>
              <span class="badge">Custom</span>
            </button>
            <button
              type="button"
              class="btn btn--outline btn--sm"
              data-action="delete-custom-split"
              data-split-id="${split.id}"
            >
              Delete
            </button>
          </li>
        `,
          )
          .join('')}
      </ul>
    `
        : `
      <p class="empty-state">No custom splits yet. Tap create to build one — same gym bag & set logging as famous splits.</p>
    `
    }
  `
}
