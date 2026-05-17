import type { User } from '@supabase/supabase-js'
import type { AuthTab, BodyPart, View, WorkoutSession, WorkoutSplit } from './types'
import { loadActiveSession, loadCustomSplits, loadSessions } from './storage'

export interface AppState {
  view: View
  authTab: AuthTab
  authReady: boolean
  /** Lets you use the app without Supabase / login (dev only) */
  authBypass: boolean
  user: User | null
  profileOpen: boolean
  returnView: View
  sessions: WorkoutSession[]
  customSplits: WorkoutSplit[]
  activeSession: WorkoutSession | null
  selectedSplit: WorkoutSplit | null
  selectedDayIndex: number
  selectedBodyParts: BodyPart[]
  selectedBodyPartLabel: string | null
  selectedExerciseId: string | null
}

export const state: AppState = {
  view: 'auth',
  authTab: 'signin',
  authReady: false,
  authBypass: false,
  user: null,
  profileOpen: false,
  sessions: loadSessions(),
  customSplits: loadCustomSplits(),
  activeSession: loadActiveSession(),
  selectedSplit: null,
  selectedDayIndex: 0,
  selectedBodyParts: [],
  selectedBodyPartLabel: null,
  selectedExerciseId: null,
  returnView: 'home',
}

export function navigate(view: View): void {
  state.view = view
}
