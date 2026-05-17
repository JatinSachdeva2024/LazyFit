import type { WorkoutSession } from './types'

export function bagItemCount(session: WorkoutSession | null): number {
  if (!session) return 0
  return session.exercises.filter((e) => e.sets.length > 0).length
}

export function bagIsEmpty(session: WorkoutSession | null): boolean {
  return bagItemCount(session) === 0
}
