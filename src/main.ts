import { render } from './app'
import { initAuth } from './auth'
import { state } from './state'
import './style.css'

function bindGlobalKeys(): void {
  if (document.body.dataset.keysBound === '1') return
  document.body.dataset.keysBound = '1'
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.profileOpen) {
      state.profileOpen = false
      render()
    }
  })
}

async function boot(): Promise<void> {
  bindGlobalKeys()
  await initAuth(() => render())
  render()
}

boot()
