import type { BodyPart, BodyPartGroup, SplitDay, WorkoutSplit } from './types'

export const BODY_PART_LABELS: Record<BodyPart, string> = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  biceps: 'Biceps',
  triceps: 'Triceps',
  legs: 'Legs',
  glutes: 'Glutes',
  core: 'Core',
  'full body': 'Full Body',
}

export const BODY_PARTS: BodyPart[] = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'legs',
  'glutes',
  'core',
]

export const SUGGESTED_EXERCISES: Record<BodyPart, string[]> = {
  chest: [
    'Barbell Bench Press',
    'Dumbbell Pullover',
    'Incline Dumbbell Press',
    'High to Low Cable Fly',
    'Push-Up',
  ],
  back: [
    'Close-Grip Lat Pulldown',
    'Barbell Bent-Over Row',
    'Lever Reverse T-Bar Row',
    'One-Arm Pulldown',
    'Straight-Arm Cable Pulldown',
    'Cable Rear Delt Fly',
  ],
  shoulders: [
    'Dumbbell Seated Shoulder Press',
    'Seated Dumbbell Lateral Raise',
    'Cable Rear Delt Fly',
    'Barbell Front Raise',
    'Leaning Cable Lateral Raise',
    'Machine Rear Delt Fly',
  ],
  biceps: ['Incline Dumbbell Curls', 'Lever Preacher Curl', 'Rope Bicep Curls'],
  triceps: [
    'Cable Rope Overhead Triceps Extension',
    'One-Arm Triceps Pushdown',
    'Triceps Dips',
  ],
  legs: [
    'Dumbbell Bulgarian Split Squat',
    'Hack Squat',
    'Leg Extension',
    'Seated Leg Curl',
    'Seated Machine Calf Raise',
  ],
  glutes: ['Barbell Hip Thrust'],
  core: ['Forearm Plank', 'Cable Crunch', 'Hanging Knee Raises'],
  'full body': [
    'Barbell Bench Press',
    'Barbell Bent-Over Row',
    'Dumbbell Seated Shoulder Press',
    'Rope Bicep Curls',
    'Triceps Dips',
    'Hack Squat',
    'Barbell Hip Thrust',
    'Forearm Plank',
  ],
}

/** One best exercise per muscle group for full-body training */
export const FULL_BODY_EXERCISE_PLAN: SplitDay['exercisePlan'] = {
  chest: ['bench-press'],
  back: ['barbell-bent-over-row'],
  shoulders: ['seated-shoulder-press'],
  biceps: ['rope-bicep-curls'],
  triceps: ['triceps-dips'],
  legs: ['hack-squat'],
  glutes: ['barbell-hip-thrust'],
  core: ['plank'],
}

const FULL_BODY_PARTS: BodyPart[] = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'legs',
  'glutes',
  'core',
]

export const FAMOUS_SPLITS: WorkoutSplit[] = [
  {
    id: 'ppl',
    name: 'Push / Pull / Legs',
    description: 'Classic 6-day hypertrophy split',
    days: [
      {
        name: 'Push',
        bodyParts: ['chest', 'shoulders', 'triceps'],
        exerciseLimits: { chest: 3, shoulders: 2 },
      },
      {
        name: 'Pull',
        bodyParts: ['back', 'biceps'],
        exerciseLimits: { back: 4 },
      },
      {
        name: 'Legs & Glutes',
        bodyParts: ['legs', 'glutes', 'core'],
        groups: [
          { label: 'Legs & Glutes', bodyParts: ['legs', 'glutes'] },
          { label: 'Core', bodyParts: ['core'] },
        ],
      },
    ],
  },
  {
    id: 'upper-lower',
    name: 'Upper / Lower',
    description: '4-day balanced strength split',
    days: [
      {
        name: 'Upper A',
        bodyParts: ['chest', 'back', 'shoulders', 'biceps', 'triceps'],
        exerciseLimits: {
          chest: 2,
          back: 2,
          shoulders: 1,
          biceps: 1,
          triceps: 1,
        },
      },
      { name: 'Lower A', bodyParts: ['legs', 'glutes', 'core'] },
      {
        name: 'Upper B',
        bodyParts: ['chest', 'back', 'shoulders', 'biceps', 'triceps'],
        exerciseLimits: {
          chest: 2,
          back: 2,
          shoulders: 1,
          biceps: 1,
          triceps: 1,
        },
        exerciseOffset: {
          chest: 2,
          back: 2,
          shoulders: 1,
          biceps: 1,
          triceps: 1,
        },
      },
      { name: 'Lower B', bodyParts: ['legs', 'glutes', 'core'] },
    ],
  },
  {
    id: 'bro-split',
    name: 'Bro Split',
    description: 'One muscle group per day',
    days: [
      {
        name: 'Chest',
        bodyParts: ['chest'],
        exercisePlan: {
          chest: [
            'bench-press',
            'incline-db-press',
            'cable-fly',
            'push-ups',
            'dumbbell-pullover',
          ],
        },
      },
      {
        name: 'Back',
        bodyParts: ['back'],
        exercisePlan: {
          back: [
            'close-grip-lat-pulldown',
            'barbell-bent-over-row',
            'lever-reverse-t-bar-row',
            'one-arm-pulldown',
            'straight-arm-pulldown',
          ],
        },
      },
      {
        name: 'Shoulders',
        bodyParts: ['shoulders'],
        exercisePlan: {
          shoulders: [
            'seated-shoulder-press',
            'seated-lateral-raise',
            'cable-rear-delt-fly',
            'barbell-front-raise',
            'leaning-cable-lateral-raise',
            'machine-rear-delt-fly',
          ],
        },
      },
      { name: 'Arms', bodyParts: ['biceps', 'triceps'] },
      { name: 'Legs', bodyParts: ['legs', 'glutes'] },
    ],
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: '3x per week — one best exercise per muscle group',
    days: [
      {
        name: 'Day A',
        bodyParts: FULL_BODY_PARTS,
        exercisePlan: FULL_BODY_EXERCISE_PLAN,
      },
      {
        name: 'Day B',
        bodyParts: FULL_BODY_PARTS,
        exercisePlan: FULL_BODY_EXERCISE_PLAN,
      },
      {
        name: 'Day C',
        bodyParts: FULL_BODY_PARTS,
        exercisePlan: FULL_BODY_EXERCISE_PLAN,
      },
    ],
  },
]

export function getDayGroups(day: SplitDay): BodyPartGroup[] {
  if (day.groups?.length) return day.groups
  return day.bodyParts.map((part) => ({
    label: BODY_PART_LABELS[part],
    bodyParts: [part],
  }))
}
