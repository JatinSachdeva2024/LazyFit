import type { ExerciseSet } from '../types'

const MAX_SETS = 20

function parseSetsCount(value: string): number {
  const raw = value.trim()
  if (!raw) return 0
  const n = parseInt(raw, 10)
  if (Number.isNaN(n) || n < 0) return 0
  return Math.min(MAX_SETS, n)
}

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
      <input
        type="text"
        name="sets"
        class="input--plain"
        inputmode="numeric"
        autocomplete="off"
        placeholder="0"
        value="0"
      />
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
          type="text"
          class="set-row__reps input--plain"
          inputmode="numeric"
          autocomplete="off"
          placeholder="10"
          value="${reps}"
        />
      </label>
      <label class="field field--set field--set-inline">
        <span>kg</span>
        <input
          type="text"
          class="set-row__weight input--plain"
          inputmode="decimal"
          autocomplete="off"
          placeholder="0"
          value="${weight}"
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

  const count = parseSetsCount(setsInput.value)

  const existing: Partial<ExerciseSet>[] = []
  container.querySelectorAll('.set-row').forEach((row) => {
    const repsEl = row.querySelector('.set-row__reps') as HTMLInputElement
    const weightEl = row.querySelector('.set-row__weight') as HTMLInputElement
    existing.push({
      reps: parseReps(repsEl?.value ?? '') ?? undefined,
      weight: parseWeight(weightEl?.value ?? '') ?? undefined,
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
    setsInput.addEventListener('blur', () => {
      setsInput.value = String(parseSetsCount(setsInput.value))
      syncSetRows(form)
    })
    syncSetRows(form)
  })
}

export function readLogSetForm(form: HTMLFormElement): ExerciseSet[] | null {
  const rows = form.querySelectorAll('.set-row')
  if (!rows.length) return []

  const sets: ExerciseSet[] = []
  for (const row of rows) {
    const repsEl = row.querySelector('.set-row__reps') as HTMLInputElement
    const weightEl = row.querySelector('.set-row__weight') as HTMLInputElement
    const reps = parseReps(repsEl?.value ?? '')
    const weight = parseWeight(weightEl?.value ?? '')
    if (reps === null || weight === null) return null
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
