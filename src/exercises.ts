import type { BodyPart, ExerciseGuide, SplitDay } from './types'

export const EXERCISE_GUIDES: ExerciseGuide[] = [
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    bodyPart: 'chest',
    animation: 'push',
    media: '/chest/Barbell-Bench-Press.gif',
    sets: '3-4',
    reps: '10-12',
    steps: ['Lie flat, feet on floor', 'Grip bar slightly wider than shoulders', 'Lower to mid-chest', 'Press up until arms lock'],
    tips: 'Keep shoulder blades pinched and elbows at ~45°.',
  },
  {
    id: 'incline-db-press',
    name: 'Incline Dumbbell Press',
    bodyPart: 'chest',
    animation: 'push',
    media: '/chest/Incline-Dumbbell-Press.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Set bench to 30–45°',
      'Press dumbbells up over upper chest',
      'Lower with control to chest level',
      'Drive through chest to press',
    ],
    tips: 'Keep elbows at ~45° — don’t flare too wide.',
  },
  {
    id: 'cable-fly',
    name: 'High to Low Cable Fly',
    bodyPart: 'chest',
    animation: 'push',
    media: '/chest/High-To-Low-Cable-fly.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Set cables high, one handle per hand',
      'Step forward with slight bend in elbows',
      'Sweep hands down and together in an arc',
      'Return slowly with tension',
    ],
    tips: 'Squeeze chest at the bottom of the movement.',
  },
  {
    id: 'push-ups',
    name: 'Push-Up',
    bodyPart: 'chest',
    animation: 'push',
    media: '/chest/Push-Up.gif',
    sets: '3-4',
    reps: '10-12',
    steps: ['Hands shoulder-width, body straight', 'Lower chest toward floor', 'Elbows track back ~45°', 'Push floor away to top'],
    tips: 'Brace core so hips don’t sag.',
  },
  {
    id: 'dumbbell-pullover',
    name: 'Dumbbell Pullover',
    bodyPart: 'chest',
    animation: 'pull',
    media: '/chest/Dumbbell-Pullover.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Lie across bench, upper back supported, feet flat',
      'Hold dumbbell over chest with slight elbow bend',
      'Lower weight in an arc behind your head',
      'Pull back over chest using lats and chest',
    ],
    tips: 'Keep hips low and core braced — don’t arch excessively.',
  },
  {
    id: 'close-grip-lat-pulldown',
    name: 'Close-Grip Lat Pulldown',
    bodyPart: 'back',
    animation: 'pull',
    media: '/back/Close-Grip-Lat-Pulldown.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit at pulldown, grip bar close and neutral',
      'Lean back slightly, chest up',
      'Pull bar to upper chest, elbows down',
      'Control the return until arms extend',
    ],
    tips: 'Drive elbows toward your hips — don’t pull with your hands.',
  },
  {
    id: 'lever-reverse-t-bar-row',
    name: 'Lever Reverse T-Bar Row',
    bodyPart: 'back',
    animation: 'pull',
    media: '/back/Lever-Reverse-T-Bar-Row.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Lie chest-down on the pad, feet on plates',
      'Grip handles with arms extended',
      'Pull handles to lower chest, squeeze back',
      'Lower with control to full stretch',
    ],
    tips: 'Keep chest on the pad — pull with your elbows, not your hands.',
  },
  {
    id: 'one-arm-pulldown',
    name: 'One-Arm Pulldown',
    bodyPart: 'back',
    animation: 'pull',
    media: '/back/one%20arm%20pulldown.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Kneel or stand at cable, single handle high',
      'Start with arm extended overhead',
      'Pull elbow down to your side',
      'Squeeze lat at bottom, return slowly',
    ],
    tips: 'Keep torso stable — avoid rotating as you pull.',
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    bodyPart: 'back',
    animation: 'pull',
    media: '/back/Barbell-Bent-Over-Row.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Hinge at hips, flat back, bar at shins',
      'Pull bar to lower ribs, elbows back',
      'Squeeze shoulder blades at top',
      'Lower with control without rounding',
    ],
    tips: 'Keep torso parallel to floor — don’t jerk the weight.',
  },
  {
    id: 'straight-arm-pulldown',
    name: 'Straight-Arm Cable Pulldown',
    bodyPart: 'back',
    animation: 'pull',
    media: '/back/6ae597a234e53ddc285e1bfc227f4cf4.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Face cable, arms extended at shoulder height',
      'Keep a slight bend in elbows throughout',
      'Pull bar down in an arc to thighs',
      'Return slowly with lats engaged',
    ],
    tips: 'Movement is at the shoulders — don’t bend elbows more.',
  },
  {
    id: 'back-cable-rear-delt-fly',
    name: 'Cable Rear Delt Fly',
    bodyPart: 'back',
    animation: 'pull',
    media: '/shoulder/cable-rear-delt-fly.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Set cables at shoulder height, cross handles',
      'Stand tall, arms extended in front',
      'Pull arms back in a wide arc',
      'Squeeze rear delts, then return with control',
    ],
    tips: 'Use lighter weight — focus on squeezing the back of the shoulders.',
  },
  {
    id: 'seated-shoulder-press',
    name: 'Dumbbell Seated Shoulder Press',
    bodyPart: 'shoulders',
    animation: 'raise',
    media: '/shoulder/Dumbbell-Seated-Shoulder-Press.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit upright with back against the bench',
      'Hold dumbbells at shoulder height, palms forward',
      'Press straight overhead until arms extend',
      'Lower with control to shoulder level',
    ],
    tips: 'Keep core braced — avoid arching your lower back.',
  },
  {
    id: 'seated-lateral-raise',
    name: 'Seated Dumbbell Lateral Raise',
    bodyPart: 'shoulders',
    animation: 'raise',
    media: '/shoulder/Seated-Dumbbell-Lateral-Raise.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit upright, dumbbells at your sides',
      'Keep a slight bend in your elbows',
      'Raise arms out to shoulder height',
      'Lower slowly without swinging',
    ],
    tips: 'Lead with your elbows — use lighter weight for clean form.',
  },
  {
    id: 'cable-rear-delt-fly',
    name: 'Cable Rear Delt Fly',
    bodyPart: 'shoulders',
    animation: 'pull',
    media: '/shoulder/cable-rear-delt-fly.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Set cables at shoulder height, cross handles',
      'Stand tall, arms extended in front',
      'Pull arms back in a wide arc',
      'Squeeze rear delts, then return with control',
    ],
    tips: 'Think about pulling with your rear delts, not your hands.',
  },
  {
    id: 'barbell-front-raise',
    name: 'Barbell Front Raise',
    bodyPart: 'shoulders',
    animation: 'raise',
    media: '/shoulder/Barbell-Front-Raise.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Stand tall, hold bar at thighs with overhand grip',
      'Keep arms straight with slight elbow bend',
      'Raise bar to shoulder height in front',
      'Lower with control',
    ],
    tips: 'Use lighter weight — avoid swinging or leaning back.',
  },
  {
    id: 'leaning-cable-lateral-raise',
    name: 'Leaning Cable Lateral Raise',
    bodyPart: 'shoulders',
    animation: 'raise',
    media: '/shoulder/Leaning-Cable-Lateral-Raise.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Hold cable tower, lean away at an angle',
      'Handle at your side, slight bend in elbow',
      'Raise arm out to shoulder height',
      'Lower slowly without swinging',
    ],
    tips: 'Lean creates constant tension — lead with your elbow.',
  },
  {
    id: 'machine-rear-delt-fly',
    name: 'Machine Rear Delt Fly',
    bodyPart: 'shoulders',
    animation: 'pull',
    media: '/shoulder/0_QQ9uVTqKJjhzqzH4.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit facing the machine, chest on pad',
      'Grip handles with arms extended forward',
      'Pull arms back in a wide arc',
      'Squeeze rear delts, return with control',
    ],
    tips: 'Keep chest glued to the pad throughout.',
  },
  {
    id: 'dumbbell-curl',
    name: 'Dumbbell Curl',
    bodyPart: 'biceps',
    animation: 'curl',
    media: '/bicep/Dumbbell-Curl.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Stand tall with a dumbbell in each hand, palms facing in',
      'Curl one dumbbell toward your shoulder, elbow at your side',
      'Lower with control, then repeat on the other arm',
      'Keep your torso still — no swinging',
    ],
    tips: 'Squeeze the biceps at the top; control the negative on the way down.',
  },
  {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    bodyPart: 'biceps',
    animation: 'curl',
    media: '/bicep/Hammer-Curl.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Stand with dumbbells at your sides, neutral grip (palms in)',
      'Curl one dumbbell up keeping your palm facing your body',
      'Lower with control, then curl the other arm',
      'Keep elbows tucked — only forearms move',
    ],
    tips: 'Hammer curls hit the brachialis and forearms as well as the biceps.',
  },
  {
    id: 'incline-dumbbell-curls',
    name: 'Incline Dumbbell Curls',
    bodyPart: 'biceps',
    animation: 'curl',
    media: '/bicep/Flexor-Incline-Dumbbell-Curls.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Set bench to 45–60°, sit back against pad',
      'Arms hang straight down with dumbbells',
      'Curl both dumbbells up toward shoulders',
      'Lower slowly to full extension',
    ],
    tips: 'Keep upper arms still — don’t swing the weight.',
  },
  {
    id: 'lever-preacher-curl',
    name: 'Lever Preacher Curl',
    bodyPart: 'biceps',
    animation: 'curl',
    media: '/bicep/Lever-Preacher-Curl.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit at preacher machine, arms on pad',
      'Grip handles with underhand grip',
      'Curl handles up, squeeze at top',
      'Lower with control — don’t hyperextend',
    ],
    tips: 'Press chest into the pad — only forearms move.',
  },
  {
    id: 'rope-bicep-curls',
    name: 'Rope Bicep Curls',
    bodyPart: 'biceps',
    animation: 'curl',
    media: '/bicep/rope-bicep-curls.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Stand at low cable with rope attachment',
      'Elbows at sides, neutral grip on rope',
      'Curl rope up toward shoulders',
      'Lower slowly, separating rope slightly at top',
    ],
    tips: 'Keep elbows pinned to your sides throughout.',
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    bodyPart: 'biceps',
    animation: 'pull',
    media: '/bicep/Pull-up.gif',
    sets: '3-4',
    reps: '8-12',
    steps: [
      'Hang from the bar with hands shoulder-width, palms facing you',
      'Pull your chest toward the bar, driving elbows down',
      'Pause briefly at the top',
      'Lower with control to full hang',
    ],
    tips: 'Chin-ups emphasize biceps more than wide-grip pull-ups.',
  },
  {
    id: 'cable-rope-overhead-extension',
    name: 'Cable Rope Overhead Triceps Extension',
    bodyPart: 'triceps',
    animation: 'push',
    media: '/tricep/Cable-Rope-Overhead-Triceps-Extension.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Face away from cable, rope behind your head',
      'Elbows up and forward, core braced',
      'Extend arms overhead until straight',
      'Lower rope behind head with control',
    ],
    tips: 'Keep upper arms still — only forearms move.',
  },
  {
    id: 'rope-pushdown',
    name: 'Rope Pushdown',
    bodyPart: 'triceps',
    animation: 'push',
    media: '/tricep/Rope-Pushdown.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Stand at high cable with rope attachment',
      'Pin elbows at your sides, grip the rope',
      'Push down until arms are fully extended',
      'Return slowly, spreading the rope slightly at the bottom',
    ],
    tips: 'Squeeze triceps hard at full extension; don’t let elbows drift forward.',
  },
  {
    id: 'one-arm-triceps-pushdown',
    name: 'One-Arm Triceps Pushdown',
    bodyPart: 'triceps',
    animation: 'push',
    media: '/tricep/One-arm-triceps-pushdown.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Stand at cable with single handle',
      'Pin elbow at your side at 90°',
      'Push down until arm is fully extended',
      'Return slowly without moving the elbow',
    ],
    tips: 'Squeeze triceps at the bottom — don’t swing.',
  },
  {
    id: 'skull-crusher',
    name: 'Skull Crusher',
    bodyPart: 'triceps',
    animation: 'push',
    media: '/tricep/Skull-crusher.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Lie on a flat bench holding an EZ bar or barbell',
      'Extend arms toward the ceiling over your chest',
      'Bend elbows to lower the bar toward your forehead',
      'Press back up to lockout without flaring elbows',
    ],
    tips: 'Keep upper arms vertical — only hinge at the elbows.',
  },
  {
    id: 'triceps-dips',
    name: 'Triceps Dips',
    bodyPart: 'triceps',
    animation: 'dip',
    media: '/tricep/Triceps-Dips.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Support on dip bars, arms straight',
      'Keep torso upright for triceps focus',
      'Lower until upper arms are parallel',
      'Press back up to lockout',
    ],
    tips: 'Stay upright — leaning forward shifts work to chest.',
  },
  {
    id: 'barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    bodyPart: 'glutes',
    animation: 'hinge',
    media: '/legs/Barbell-Hip-Thrust.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Upper back on bench, bar over hips with pad',
      'Feet flat, shoulder-width apart',
      'Drive hips up until torso is parallel to floor',
      'Lower with control, keep tension in glutes',
    ],
    tips: 'Pause and squeeze at the top for 1 second.',
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Dumbbell Bulgarian Split Squat',
    bodyPart: 'legs',
    animation: 'squat',
    media: '/legs/Dumbbell-Bulgarian-Split-Squat.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Rear foot on bench, front foot forward',
      'Hold dumbbells at sides, torso upright',
      'Lower until front thigh is parallel',
      'Drive through front heel to stand',
    ],
    tips: 'Keep most of your weight on the front leg.',
  },
  {
    id: 'hack-squat',
    name: 'Hack Squat',
    bodyPart: 'legs',
    animation: 'squat',
    media: '/legs/HACK_SQT.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Back and shoulders against pads, feet on platform',
      'Lower by bending knees until thighs parallel',
      'Drive through feet to extend legs',
      'Stop just short of locking knees',
    ],
    tips: 'Keep lower back pressed into the pad throughout.',
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    bodyPart: 'legs',
    animation: 'squat',
    media: '/legs/LEG-EXTENSION.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit with back against pad, ankles behind roller',
      'Grip handles for stability',
      'Extend legs until straight',
      'Lower with control to 90°',
    ],
    tips: 'Squeeze quads at the top — don’t swing the weight.',
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Leg Curl',
    bodyPart: 'legs',
    animation: 'curl',
    media: '/legs/Seated-Leg-Curl.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit with back flat, legs over the pad',
      'Curl heels down and back under the seat',
      'Squeeze hamstrings at peak contraction',
      'Return slowly without lifting hips',
    ],
    tips: 'Point toes slightly down to isolate hamstrings.',
  },
  {
    id: 'seated-calf-raise',
    name: 'Seated Machine Calf Raise',
    bodyPart: 'legs',
    animation: 'squat',
    media: '/legs/Seated-Machine-Calf-Raises.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Sit with balls of feet on platform, heels hanging',
      'Pad secured over lower thighs',
      'Raise heels as high as possible',
      'Lower slowly for a full stretch',
    ],
    tips: 'Pause at the top — full range of motion matters.',
  },
  {
    id: 'plank',
    name: 'Forearm Plank',
    bodyPart: 'core',
    animation: 'core',
    media: '/core/plank.gif',
    sets: '3-4',
    reps: '30-60 sec',
    steps: [
      'Forearms on floor, elbows under shoulders',
      'Body in a straight line head to heels',
      'Brace abs and glutes, hold position',
      'Breathe steadily without sagging hips',
    ],
    tips: 'Push the floor away — don’t let hips drop.',
  },
  {
    id: 'cable-crunch',
    name: 'Cable Crunch',
    bodyPart: 'core',
    animation: 'core',
    media: '/core/Cable-Crunch.webp',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Kneel facing away from high cable',
      'Hold rope behind your head',
      'Crunch down, rounding your spine',
      'Return with control to starting position',
    ],
    tips: 'Movement comes from your abs — don’t pull with your arms.',
  },
  {
    id: 'hanging-knee-raises',
    name: 'Hanging Knee Raises',
    bodyPart: 'core',
    animation: 'core',
    media: '/core/Hanging-Knee-Raises.gif',
    sets: '3-4',
    reps: '10-12',
    steps: [
      'Hang from bar with arms fully extended',
      'Brace core, avoid swinging',
      'Raise knees toward chest',
      'Lower legs with control',
    ],
    tips: 'Tilt pelvis up slightly at the top for extra ab engagement.',
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    bodyPart: 'full body',
    animation: 'hinge',
    steps: ['Feet hip-width, bar over mid-foot', 'Hinge and grip, chest up', 'Push floor away, bar close to legs', 'Lock hips and knees at top'],
    tips: 'Neutral spine throughout — no rounding.',
  },
]

export function guidesForBodyPart(part: BodyPart): ExerciseGuide[] {
  return EXERCISE_GUIDES.filter((g) => g.bodyPart === part)
}

export function guidesForBodyParts(parts: BodyPart[]): ExerciseGuide[] {
  return EXERCISE_GUIDES.filter((g) => parts.includes(g.bodyPart))
}

export function guidesForSplitDay(
  parts: BodyPart[],
  day?: SplitDay,
): ExerciseGuide[] {
  const result: ExerciseGuide[] = []
  for (const part of parts) {
    const planned = day?.exercisePlan?.[part]
    if (planned?.length) {
      const picked = planned
        .map((id) => guideById(id))
        .filter((g): g is ExerciseGuide => g !== undefined)
      result.push(...picked)
      continue
    }

    let guides = guidesForBodyPart(part)
    const limit = day?.exerciseLimits?.[part]
    const offset = day?.exerciseOffset?.[part] ?? 0
    if (limit !== undefined) {
      guides = guides.slice(offset, offset + limit)
    }
    result.push(...guides)
  }
  return result
}

export function exerciseCountForPart(part: BodyPart, day?: SplitDay): number {
  const planned = day?.exercisePlan?.[part]
  if (planned?.length) return planned.length

  const limit = day?.exerciseLimits?.[part]
  if (limit !== undefined) {
    const total = guidesForBodyPart(part).length
    const offset = day?.exerciseOffset?.[part] ?? 0
    return Math.min(limit, Math.max(0, total - offset))
  }
  return guidesForBodyPart(part).length
}

export function guideById(id: string): ExerciseGuide | undefined {
  return EXERCISE_GUIDES.find((g) => g.id === id)
}

export function guideByName(name: string): ExerciseGuide | undefined {
  const key = name.trim().toLowerCase()
  return EXERCISE_GUIDES.find((g) => g.name.toLowerCase() === key)
}
