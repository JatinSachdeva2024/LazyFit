import { escapeHtml } from './views/helpers'

const DROP_MS = 1500

/** Card drops into bag: zip opens → card enters → zip closes */
export function playGymBagDropAnimation(meta: {
  title: string
  subtitle?: string
}): Promise<void> {
  return new Promise((resolve) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      resolve()
      return
    }

    const btn = document.querySelector<HTMLElement>('.gym-bag-btn')
    if (!btn) {
      resolve()
      return
    }

    const scene = btn.querySelector<HTMLElement>('.gym-bag-scene') ?? btn

    const card = document.createElement('div')
    card.className = 'gym-bag-fly-card'
    card.innerHTML = `
      <span class="gym-bag-fly-card__title">${escapeHtml(meta.title)}</span>
      ${
        meta.subtitle
          ? `<span class="gym-bag-fly-card__sub">${escapeHtml(meta.subtitle)}</span>`
          : ''
      }
    `

    scene.appendChild(card)

    const badge = btn.querySelector<HTMLElement>('.gym-bag-badge')
    badge?.classList.add('gym-bag-badge--pop')

    btn.classList.add('gym-bag-btn--dropping')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        btn.classList.add('gym-bag-btn--active')
        card.classList.add('gym-bag-fly-card--drop')
      })
    })

    window.setTimeout(() => {
      btn.classList.remove('gym-bag-btn--active', 'gym-bag-btn--dropping')
      card.remove()
      badge?.classList.remove('gym-bag-badge--pop')
      resolve()
    }, DROP_MS)
  })
}

export const GYM_BAG_DROP_MS = DROP_MS
