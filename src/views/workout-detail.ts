import { BODY_PART_LABELS } from '../data'
import { guideByName } from '../exercises'
import { state } from '../state'
import type { LoggedExercise, WorkoutSession } from '../types'
import { formatBodyParts, formatDate, totalSets } from '../utils'
import { escapeHtml } from './helpers'

function exerciseBodyPartLabel(ex: LoggedExercise): string {
  if (ex.bodyPart) return BODY_PART_LABELS[ex.bodyPart]
  const guide = guideByName(ex.name)
  return guide ? BODY_PART_LABELS[guide.bodyPart] : ''
}

export function renderWorkoutDetailCard(session: WorkoutSession): string {
  const exercises = session.exercises.filter((e) => e.sets.length > 0)
  if (!exercises.length) {
    return '<p class="workout-detail__empty muted">No sets logged.</p>'
  }

  return `
    <div class="workout-detail card">
      <p class="workout-detail__meta muted">${escapeHtml(formatBodyParts(session.bodyParts))}</p>
      <ul class="workout-detail__list">
        ${exercises
          .map((ex) => {
            const part = exerciseBodyPartLabel(ex)
            return `
          <li class="workout-detail__item">
            <div class="workout-detail__head">
              <strong>${escapeHtml(ex.name)}</strong>
              ${part ? `<span class="workout-detail__part">${escapeHtml(part)}</span>` : ''}
            </div>
            <ul class="workout-detail__sets">
              ${ex.sets
                .map(
                  (set, i) => `
                <li>
                  <span class="workout-detail__set-num">${i + 1}</span>
                  ${set.reps} reps · ${set.weight} kg
                </li>
              `,
                )
                .join('')}
            </ul>
          </li>
        `
          })
          .join('')}
      </ul>
    </div>
  `
}

export function renderSessionSummaryBadge(session: WorkoutSession): string {
  const count = session.exercises.filter((e) => e.sets.length > 0).length
  const sets = totalSets(session.exercises)
  return `${count} exercise${count === 1 ? '' : 's'} · ${sets} set${sets === 1 ? '' : 's'}`
}

export function renderRecentSessionItem(
  session: WorkoutSession,
  options?: { showDate?: boolean },
): string {
  const open = state.expandedSessionId === session.id
  const subtitle =
    options?.showDate && session.completedAt
      ? `${escapeHtml(formatBodyParts(session.bodyParts))} · ${formatDate(session.completedAt)}`
      : escapeHtml(formatBodyParts(session.bodyParts))

  return `
    <li class="recent-session${open ? ' recent-session--open' : ''}">
      <button
        type="button"
        class="recent-session__toggle"
        data-action="toggle-session-detail"
        data-session-id="${session.id}"
        aria-expanded="${open}"
      >
        <span class="recent-session__main">
          <strong>${escapeHtml(session.label)}</strong>
          <span class="muted">${subtitle}</span>
        </span>
        <span class="badge">${escapeHtml(renderSessionSummaryBadge(session))}</span>
        <span class="recent-session__chevron" aria-hidden="true">${open ? '▾' : '▸'}</span>
      </button>
      ${open ? renderWorkoutDetailCard(session) : ''}
      ${
        open
          ? `
        <button
          type="button"
          class="btn btn--outline btn--block btn--danger recent-session__delete"
          data-action="delete-session"
          data-session-id="${session.id}"
        >
          Delete workout
        </button>
      `
          : ''
      }
    </li>
  `
}
