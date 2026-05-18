import type { ExerciseSet } from '../types'

function parseReps(value: string): number | null {
  const n = parseInt(value.trim(), 10)
  if (Number.isNaN(n) || n < 1) return null
  return n
}

function parseWeight(value: string): number | null {
  const raw = value.trim().replace(',', '.')
  if (!raw) return null
  const n = parseFloat(raw)
  if (Number.isNaN(n) || n < 0) return null
  return n
}

export function renderLogSetForm(exerciseId: string): string {
  return `
    <form class="log-set-form add-to-bag-form" data-exercise-id="${exerciseId}">
      <h3 class="log-set-form__title">Log set</h3>
      ${renderLogSetFieldsInner()}
      <button type="submit" class="btn btn--primary btn--block">
        Add to workout
      </button>
    </form>
  `
}

export function renderInlineLogSetForm(exerciseId: string, submitLabel = '+ Set'): string {
  return `
    <form class="add-set-form log-set-form log-set-form--inline" data-exercise-id="${exerciseId}">
      ${renderLogSetFieldsInner()}
      <button type="submit" class="btn btn--outline log-set-form__submit">${submitLabel}</button>
    </form>
  `
}

function renderLogSetFieldsInner(): string {
  return `
    <div class="set-row" data-set-row>
      <label class="field field--set field--set-inline">
        <span>Reps</span>
        <input
          type="text"
          name="reps"
          class="set-row__reps input--plain"
          inputmode="numeric"
          autocomplete="off"
          placeholder="10"
        />
      </label>
      <label class="field field--set field--set-inline">
        <span>kg</span>
        <input
          type="text"
          name="weight"
          class="set-row__weight input--plain"
          inputmode="decimal"
          autocomplete="off"
          placeholder="0"
        />
      </label>
    </div>
  `
}

/** Read one set (reps + weight) from the form */
export function readLogSetForm(form: HTMLFormElement): ExerciseSet[] | null {
  const repsEl = form.querySelector('.set-row__reps') as HTMLInputElement | null
  const weightEl = form.querySelector('.set-row__weight') as HTMLInputElement | null
  const reps = parseReps(repsEl?.value ?? '')
  const weight = parseWeight(weightEl?.value ?? '')
  if (reps === null || weight === null) return null
  return [{ reps, weight }]
}

export function bindLogSetForms(_root: ParentNode): void {
  /* Single-row forms need no dynamic row sync */
}

export function formatSetSummary(sets: ExerciseSet[]): string {
  if (!sets.length) return ''
  const allSame = sets.every(
    (s) => s.reps === sets[0].reps && s.weight === sets[0].weight,
  )
  if (allSame) {
    const n = sets.length
    const part = n > 1 ? `${n} sets · ` : ''
    return `${part}${sets[0].reps} reps · ${sets[0].weight} kg`
  }
  return `${sets.length} sets · varied reps/weight`
}
