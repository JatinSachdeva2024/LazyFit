import type { AnimationType } from '../types'

export function renderExerciseAnimation(type: AnimationType): string {
  return `
    <div class="demo-stage anim--${type}" aria-hidden="true">
      <svg class="stick-figure" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <circle class="sf-head" cx="60" cy="18" r="10" />
        <line class="sf-torso" x1="60" y1="28" x2="60" y2="72" />
        <line class="sf-arm-l" x1="60" y1="38" x2="38" y2="58" />
        <line class="sf-arm-r" x1="60" y1="38" x2="82" y2="58" />
        <line class="sf-leg-l" x1="60" y1="72" x2="48" y2="120" />
        <line class="sf-leg-r" x1="60" y1="72" x2="72" y2="120" />
        <line class="sf-bar" x1="28" y1="52" x2="92" y2="52" />
      </svg>
      <p class="demo-label">${labelFor(type)}</p>
    </div>
  `
}

function labelFor(type: AnimationType): string {
  const labels: Record<AnimationType, string> = {
    push: 'Press motion',
    pull: 'Pull motion',
    squat: 'Squat motion',
    curl: 'Curl motion',
    raise: 'Raise motion',
    hinge: 'Hinge motion',
    core: 'Core brace',
    dip: 'Dip motion',
  }
  return labels[type]
}
