import { guidesForBodyPart } from './exercises'
import type { BodyPart, SplitDay } from './types'

/** Read one day-editor card from the create-split form */
export function parseDayEditor(editor: HTMLElement): SplitDay | null {
  const dayName = editor.querySelector<HTMLInputElement>('.day-name')?.value.trim() ?? ''
  if (!dayName) return null

  const bodyParts = [
    ...editor.querySelectorAll<HTMLInputElement>('.body-part-pick__input:checked'),
  ].map((el) => el.value as BodyPart)

  if (!bodyParts.length) return null

  const exercisePlan: Partial<Record<BodyPart, string[]>> = {}

  for (const part of bodyParts) {
    const allGuides = guidesForBodyPart(part)
    const picked = [
      ...editor.querySelectorAll<HTMLInputElement>(
        `input.exercise-pick__input[name="exercise-${part}"]:checked`,
      ),
    ].map((el) => el.value)

    if (!picked.length) return null

    if (picked.length < allGuides.length) {
      exercisePlan[part] = picked
    }
  }

  const day: SplitDay = { name: dayName, bodyParts }
  if (Object.keys(exercisePlan).length) {
    day.exercisePlan = exercisePlan
  }
  return day
}

export function bindDayEditor(editor: HTMLElement): void {
  editor.querySelectorAll<HTMLInputElement>('.body-part-pick__input').forEach((cb) => {
    const part = cb.value
    const section = editor.querySelector<HTMLElement>(
      `.day-part-exercises[data-part="${part}"]`,
    )
    if (section) section.hidden = !cb.checked
  })
}
