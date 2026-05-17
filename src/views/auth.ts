import { isSupabaseConfigured } from '../lib/supabase'
import { state } from '../state'

export function renderAuth(): string {
  const tab = state.authTab
  const signInActive = tab === 'signin'
  const signUpActive = tab === 'signup'

  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-card__brand">
          <p class="auth-card__eyebrow">Welcome to</p>
          <h1 class="auth-card__title">LazyFit</h1>
          <p class="auth-card__subtitle">Sign in to save workouts and track your progress.</p>
        </div>

        <div class="auth-tabs" role="tablist" aria-label="Sign in or sign up">
          <button
            type="button"
            class="auth-tabs__btn${signInActive ? ' auth-tabs__btn--active' : ''}"
            role="tab"
            aria-selected="${signInActive}"
            aria-controls="auth-panel-signin"
            id="auth-tab-signin"
            data-action="auth-tab-signin"
          >
            Sign in
          </button>
          <button
            type="button"
            class="auth-tabs__btn${signUpActive ? ' auth-tabs__btn--active' : ''}"
            role="tab"
            aria-selected="${signUpActive}"
            aria-controls="auth-panel-signup"
            id="auth-tab-signup"
            data-action="auth-tab-signup"
          >
            Sign up
          </button>
        </div>

        ${
          !isSupabaseConfigured
            ? `<p class="auth-banner" role="status">
                Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env.local</code> to connect.
              </p>`
            : ''
        }

        <div
          id="auth-panel-signin"
          class="auth-panel${signInActive ? ' auth-panel--active' : ''}"
          role="tabpanel"
          aria-labelledby="auth-tab-signin"
          ${signInActive ? '' : 'hidden'}
        >
          <form id="auth-signin-form" class="form auth-form" novalidate>
            <p class="auth-form__error" id="auth-signin-error" hidden></p>
            <label class="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label class="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="Your password"
                required
                minlength="6"
              />
            </label>
            <button type="submit" class="btn btn--primary btn--block auth-form__submit">
              Sign in
            </button>
          </form>
        </div>

        <div
          id="auth-panel-signup"
          class="auth-panel${signUpActive ? ' auth-panel--active' : ''}"
          role="tabpanel"
          aria-labelledby="auth-tab-signup"
          ${signUpActive ? '' : 'hidden'}
        >
          <form id="auth-signup-form" class="form auth-form" novalidate>
            <p class="auth-form__error" id="auth-signup-error" hidden></p>
            <label class="field">
              <span>Name</span>
              <input
                type="text"
                name="displayName"
                autocomplete="name"
                placeholder="How should we call you?"
              />
            </label>
            <label class="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autocomplete="email"
                inputmode="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label class="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                autocomplete="new-password"
                placeholder="At least 6 characters"
                required
                minlength="6"
              />
            </label>
            <label class="field">
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                autocomplete="new-password"
                placeholder="Repeat your password"
                required
                minlength="6"
              />
            </label>
            <button type="submit" class="btn btn--primary btn--block auth-form__submit">
              Create account
            </button>
          </form>
        </div>

        ${
          !isSupabaseConfigured
            ? `
          <button
            type="button"
            class="btn btn--outline btn--block auth-continue"
            data-action="auth-continue"
          >
            Continue without account
          </button>
        `
            : ''
        }
      </div>
    </div>
  `
}
