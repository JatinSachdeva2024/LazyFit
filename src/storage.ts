import type { WorkoutSession, WorkoutSplit } from './types'

const SESSIONS_KEY = 'lazyfit_sessions'
const CUSTOM_SPLITS_KEY = 'lazyfit_custom_splits'
const ACTIVE_KEY = 'lazyfit_active'

export function loadSessions(): WorkoutSession[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    return raw ? (JSON.parse(raw) as WorkoutSession[]) : []
  } catch {
    return []
  }
}

export function saveSessions(sessions: WorkoutSession[]): void {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
}

export function loadCustomSplits(): WorkoutSplit[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SPLITS_KEY)
    return raw ? (JSON.parse(raw) as WorkoutSplit[]) : []
  } catch {
    return []
  }
}

export function saveCustomSplits(splits: WorkoutSplit[]): void {
  localStorage.setItem(CUSTOM_SPLITS_KEY, JSON.stringify(splits))
}

export function loadActiveSession(): WorkoutSession | null {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY)
    return raw ? (JSON.parse(raw) as WorkoutSession) : null
  } catch {
    return null
  }
}

export function saveActiveSession(session: WorkoutSession | null): void {
  if (session) {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(session))
  } else {
    localStorage.removeItem(ACTIVE_KEY)
  }
}

export function uid(): string {
  return crypto.randomUUID()
}
