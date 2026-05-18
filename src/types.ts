export type BodyPart =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'glutes'
  | 'core'
  | 'full body'

export interface ExerciseSet {
  reps: number
  weight: number
}

export interface LoggedExercise {
  id: string
  name: string
  bodyPart?: BodyPart
  sets: ExerciseSet[]
}

export interface WorkoutSession {
  id: string
  label: string
  bodyParts: BodyPart[]
  exercises: LoggedExercise[]
  startedAt: string
  completedAt?: string
}

export interface BodyPartGroup {
  label: string
  bodyParts: BodyPart[]
}

export interface SplitDay {
  name: string
  bodyParts: BodyPart[]
  /** Optional UI grouping (e.g. legs + glutes on one card) */
  groups?: BodyPartGroup[]
  /** Max exercises shown per body part on this day */
  exerciseLimits?: Partial<Record<BodyPart, number>>
  /** Skip first N exercises per part (e.g. Upper B alternates) */
  exerciseOffset?: Partial<Record<BodyPart, number>>
  /** Pick specific exercises by id (overrides limits for that part) */
  exercisePlan?: Partial<Record<BodyPart, string[]>>
}

export interface WorkoutSplit {
  id: string
  name: string
  description: string
  days: SplitDay[]
  isCustom?: boolean
}

export type AnimationType =
  | 'push'
  | 'pull'
  | 'squat'
  | 'curl'
  | 'raise'
  | 'hinge'
  | 'core'
  | 'dip'

export interface ExerciseGuide {
  id: string
  name: string
  bodyPart: BodyPart
  animation: AnimationType
  /** Path under /public, e.g. /Incline-Dumbbell-Press.gif */
  media?: string
  /** Recommended sets for hypertrophy, e.g. "3-4" */
  sets?: string
  /** Recommended rep range for growth, e.g. "10-12" */
  reps?: string
  steps: string[]
  tips: string
}

export type AuthTab = 'signin' | 'signup'

export type View =
  | 'auth'
  | 'home'
  | 'splits'
  | 'split-detail'
  | 'split-day'
  | 'body-part-detail'
  | 'exercise-demo'
  | 'body-parts'
  | 'workout'
  | 'gym-bag'
  | 'history'
  | 'profile'
  | 'custom-splits'
  | 'create-split'
