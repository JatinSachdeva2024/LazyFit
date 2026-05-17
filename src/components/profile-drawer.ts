import { displayName, profileEmail, profileInitials } from '../auth'
import { state } from '../state'
import { formatDate, totalSets } from '../utils'
import { escapeHtml } from '../views/helpers'

export function renderProfileDrawer(): string {
  const open = state.profileOpen
  const user = state.user
  const name = user ? displayName(user) : state.authBypass ? 'Guest' : 'LazyFit'
  const initials = profileInitials(user, state.authBypass ? 'G' : 'LF')
  const email = profileEmail(user)

  const recent = [...state.sessions]
    .filter((s) => s.completedAt)
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime(),
    )
    .slice(0, 3)

  const workoutCount = state.sessions.filter((s) => s.completedAt).length

  return `
    <div
      class="profile-drawer${open ? ' profile-drawer--open' : ''}"
      aria-hidden="${open ? 'false' : 'true'}"
    >
      <button
        type="button"
        class="profile-drawer__backdrop"
        data-action="close-profile-menu"
        aria-label="Close menu"
        tabindex="${open ? '0' : '-1'}"
      ></button>
      <aside
        class="profile-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Account menu"
      >
        <div class="profile-drawer__header">
          <div class="profile-drawer__avatar" aria-hidden="true">${escapeHtml(initials)}</div>
          <div class="profile-drawer__identity">
            <p class="profile-drawer__name">${escapeHtml(name)}</p>
            ${email ? `<p class="profile-drawer__email">${escapeHtml(email)}</p>` : ''}
          </div>
          <button
            type="button"
            class="profile-drawer__close"
            data-action="close-profile-menu"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <nav class="profile-drawer__nav" aria-label="Account">
          <button type="button" class="profile-drawer__item" data-action="go-profile">
            <span class="profile-drawer__item-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.75"/><path d="M6 20v-1.5a6 6 0 0 1 12 0V20" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>
            </span>
            <span class="profile-drawer__item-text">
              <span class="profile-drawer__item-title">Profile</span>
              <span class="profile-drawer__item-desc">Your account details</span>
            </span>
          </button>

          <button type="button" class="profile-drawer__item" data-action="go-history">
            <span class="profile-drawer__item-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 8v4l3 2" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/></svg>
            </span>
            <span class="profile-drawer__item-text">
              <span class="profile-drawer__item-title">Previous workouts</span>
              <span class="profile-drawer__item-desc">${workoutCount} completed</span>
            </span>
          </button>

          <button type="button" class="profile-drawer__item profile-drawer__item--danger" data-action="auth-sign-out">
            <span class="profile-drawer__item-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l-6 6 6 6M3 12h14" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <span class="profile-drawer__item-text">
              <span class="profile-drawer__item-title">Sign out</span>
              <span class="profile-drawer__item-desc">Log out of your account</span>
            </span>
          </button>
        </nav>

        ${
          recent.length
            ? `
          <div class="profile-drawer__recent">
            <p class="profile-drawer__recent-label">Recent</p>
            <ul class="profile-drawer__recent-list">
              ${recent
                .map(
                  (s) => `
                <li>
                  <button type="button" class="profile-drawer__recent-item" data-action="go-history">
                    <strong>${escapeHtml(s.label)}</strong>
                    <span>${formatDate(s.completedAt!)} · ${totalSets(s.exercises)} sets</span>
                  </button>
                </li>
              `,
                )
                .join('')}
            </ul>
          </div>
        `
            : ''
        }
      </aside>
    </div>
  `
}
