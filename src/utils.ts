import { BODY_PART_LABELS } from './data'
import type { BodyPart } from './types'

export function formatBodyParts(parts: BodyPart[]): string {
  return parts.map((p) => BODY_PART_LABELS[p]).join(' · ')
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function totalSets(exercises: { sets: unknown[] }[]): number {
  return exercises.reduce((sum, e) => sum + e.sets.length, 0)
}
