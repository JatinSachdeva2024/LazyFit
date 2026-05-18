import { bagItemCount } from '../cart'
import {
  START_ICON_BODY,
  START_ICON_CHEVRON,
  START_ICON_CUSTOM,
  START_ICON_SPLITS,
} from '../components/start-icons'
import { state } from '../state'
import { escapeHtml } from './helpers'
import { renderRecentSessionItem } from './workout-detail'

function startTile(
  action: string,
  variant: 'splits' | 'body' | 'custom',
  title: string,
  desc: string,
  icon: string,
): string {
  return `
    <button type="button" class="start-tile start-tile--${variant}" data-action="${action}">
      <span class="start-tile__icon-wrap">${icon}</span>
      <span class="start-tile__body">
        <span class="start-tile__title">${escapeHtml(title)}</span>
        <span class="start-tile__desc">${escapeHtml(desc)}</span>
      </span>
      <span class="start-tile__chevron">${START_ICON_CHEVRON}</span>
    </button>
  `
}

export function renderHome(): string {
  const inBag = bagItemCount(state.activeSession)
  const recent = state.sessions
    .filter((s) => s.completedAt)
    .slice(-3)
    .reverse()

  return `
    <section class="hero" aria-labelledby="hero-title">
      <p class="hero__eyebrow">No excuses · Just reps</p>
      <h1 id="hero-title" class="hero__title">LazyFit</h1>
      <p class="hero__tagline">
        Build muscle. <span class="hero__tagline-accent">Log every set.</span> Own your split.
      </p>
      <div id="hero-logo-loop" class="hero__loop"></div>
    </section>

    ${
      state.activeSession
        ? `
      <section class="card card--accent">
        <p class="label">In progress</p>
        <h2>${escapeHtml(state.activeSession.label)}</h2>
        <p class="muted">
          ${
            inBag > 0
              ? `${inBag} exercise${inBag === 1 ? '' : 's'} in your gym bag.`
              : 'Log sets on exercises, then review your gym bag.'
          }
        </p>
        <div class="home-workout-actions">
          <button type="button" class="btn btn--outline" data-action="go-workout">
            Log workout
          </button>
          <button type="button" class="btn btn--primary" data-action="go-gym-bag">
            Gym bag${inBag > 0 ? ` (${inBag})` : ''}
          </button>
        </div>
      </section>
    `
        : ''
    }

    <section class="section section--start">
      <h2 class="section-title section-title--headline">Start</h2>
      <div class="start-list">
        ${startTile(
          'go-splits',
          'splits',
          'Famous splits',
          'PPL, bro split, and more',
          START_ICON_SPLITS,
        )}
        ${startTile(
          'go-body-parts',
          'body',
          'Single body part',
          'Quick focused session',
          START_ICON_BODY,
        )}
        ${startTile(
          'go-custom-splits',
          'custom',
          'My splits',
          'Create your own routine',
          START_ICON_CUSTOM,
        )}
      </div>
    </section>

    ${
      recent.length
        ? `
      <section class="section">
        <div class="section-row">
          <h2 class="section-title">Recent</h2>
          <button type="button" class="link-btn" data-action="go-history">View all</button>
        </div>
        <ul class="recent-sessions">
          ${recent.map((s) => renderRecentSessionItem(s)).join('')}
        </ul>
      </section>
    `
        : ''
    }

  `
}
