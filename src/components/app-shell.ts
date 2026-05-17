import { profileInitials } from '../auth'
import { bagItemCount } from '../cart'
import { state } from '../state'
import { renderGymBagIcon } from './gym-bag-icon'
import { renderProfileDrawer } from './profile-drawer'

export function renderAppShell(
  content: string,
  options?: { bare?: boolean },
): string {
  if (options?.bare) {
    return `
    <div class="app-shell app-shell--auth">
      <main class="app app--auth">${content}</main>
    </div>
  `
  }

  const count = bagItemCount(state.activeSession)
  const badge =
    count > 0
      ? `<span class="gym-bag-badge" aria-label="${count} exercises in gym bag">${count}</span>`
      : ''

  const initials = profileInitials(
    state.user,
    state.authBypass ? 'G' : 'LF',
  )

  return `
    <div class="app-shell${state.profileOpen ? ' app-shell--menu-open' : ''}">
      <header class="top-bar top-bar--with-profile">
        <button
          type="button"
          class="profile-avatar-btn"
          data-action="toggle-profile-menu"
          aria-label="Open account menu"
          aria-expanded="${state.profileOpen}"
        >
          <span class="profile-avatar">${initials}</span>
        </button>

        <nav class="nav-capsule" aria-label="Main navigation">
          <button
            type="button"
            class="nav-capsule__orb nav-capsule__orb--dumbbell"
            data-action="go-home"
            aria-label="Home"
          >
            <img
              class="nav-dumbbell"
              src="/shoulder/Screenshot_2026-05-17_200015-removebg-preview.png"
              alt=""
              width="36"
              height="36"
              decoding="async"
            />
          </button>

          <button
            type="button"
            class="nav-capsule__pill nav-capsule__pill--brand"
            data-action="go-home"
          >
            LazyFit
          </button>

          <button
            type="button"
            class="nav-capsule__orb nav-capsule__orb--bag gym-bag-btn"
            data-action="go-gym-bag"
            aria-label="Gym bag${count ? `, ${count} exercises` : ''}"
          >
            <span class="gym-bag-scene">
              ${renderGymBagIcon()}
            </span>
            ${badge}
          </button>
        </nav>
      </header>

      ${renderProfileDrawer()}

      <main class="app">${content}</main>
    </div>
  `
}
