import { displayName, profileEmail, profileInitials } from '../auth'
import { state } from '../state'
import { escapeHtml } from './helpers'

export function renderProfile(): string {
  const user = state.user
  const name = user ? displayName(user) : state.authBypass ? 'Guest' : 'LazyFit'
  const initials = profileInitials(user, state.authBypass ? 'G' : 'LF')
  const email = profileEmail(user)
  const completed = state.sessions.filter((s) => s.completedAt).length

  return `
    <header class="page-header">
      <button type="button" class="back-btn" data-action="go-home" aria-label="Back">←</button>
      <h1>Profile</h1>
      <p class="subtitle">Your account</p>
    </header>

    <section class="profile-card card">
      <div class="profile-card__avatar" aria-hidden="true">${escapeHtml(initials)}</div>
      <h2 class="profile-card__name">${escapeHtml(name)}</h2>
      ${email ? `<p class="profile-card__email">${escapeHtml(email)}</p>` : '<p class="profile-card__email muted">Not signed in</p>'}
      <dl class="profile-card__stats">
        <div>
          <dt>Completed workouts</dt>
          <dd>${completed}</dd>
        </div>
      </dl>
    </section>
  `
}
