import type { ExerciseSet } from '../types'

const MAX_SETS = 20

export function renderLogSetForm(exerciseId: string): string {
  return `
    <form class="log-set-form add-to-bag-form" data-exercise-id="${exerciseId}">
      <h3 class="log-set-form__title">Log sets</h3>
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
    <label class="field field--sets-count">
      <span>How many sets?</span>
      <input type="number" name="sets" value="0" min="0" max="${MAX_SETS}" required />
    </label>
    <p class="log-set-form__hint muted">Set how many sets you did, then enter reps & weight below.</p>
    <div class="set-rows" data-set-rows></div>
  `
}

export function renderSetRow(index: number, prev?: Partial<ExerciseSet>): string {
  const reps = prev?.reps ?? ''
  const weight = prev?.weight ?? ''
  return `
    <div class="set-row" data-set-index="${index}">
      <span class="set-row__label">Set ${index}</span>
      <label class="field field--set field--set-inline">
        <span>Reps</span>
        <input
          type="number"
          class="set-row__reps"
          placeholder="10"
          min="1"
          value="${reps}"
          required
        />
      </label>
      <label class="field field--set field--set-inline">
        <span>kg</span>
        <input
          type="number"
          class="set-row__weight"
          placeholder="0"
          min="0"
          step="0.5"
          value="${weight}"
          required
        />
      </label>
    </div>
  `
}

/** Build per-set inputs when the sets count changes */
export function syncSetRows(form: HTMLFormElement): void {
  const container = form.querySelector<HTMLElement>('[data-set-rows]')
  const setsInput = form.querySelector<HTMLInputElement>('input[name="sets"]')
  if (!container || !setsInput) return

  const raw = Number(setsInput.value)
  const count = Math.min(
    MAX_SETS,
    Math.max(0, Number.isNaN(raw) ? 0 : Math.floor(raw)),
  )
  setsInput.value = String(count)

  const existing: Partial<ExerciseSet>[] = []
  container.querySelectorAll('.set-row').forEach((row) => {
    existing.push({
      reps: Number((row.querySelector('.set-row__reps') as HTMLInputElement)?.value) || undefined,
      weight:
        Number((row.querySelector('.set-row__weight') as HTMLInputElement)?.value) || undefined,
    })
  })

  container.innerHTML = Array.from({ length: count }, (_, i) =>
    renderSetRow(i + 1, existing[i]),
  ).join('')

  const hint = form.querySelector<HTMLElement>('.log-set-form__hint')
  if (hint) hint.hidden = count > 0
}

export function bindLogSetForms(root: ParentNode): void {
  root.querySelectorAll<HTMLFormElement>('.log-set-form').forEach((form) => {
    const setsInput = form.querySelector<HTMLInputElement>('input[name="sets"]')
    if (!setsInput || setsInput.dataset.bound === '1') return
    setsInput.dataset.bound = '1'
    setsInput.addEventListener('input', () => syncSetRows(form))
    syncSetRows(form)
  })
}

export function readLogSetForm(form: HTMLFormElement): ExerciseSet[] | null {
  const rows = form.querySelectorAll('.set-row')
  if (!rows.length) return []

  const sets: ExerciseSet[] = []
  for (const row of rows) {
    const reps = Number(
      (row.querySelector('.set-row__reps') as HTMLInputElement)?.value,
    )
    const weight = Number(
      (row.querySelector('.set-row__weight') as HTMLInputElement)?.value,
    )
    if (!reps || reps < 1 || weight < 0 || Number.isNaN(weight)) return null
    sets.push({ reps, weight })
  }
  return sets
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
