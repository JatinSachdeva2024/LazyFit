import { signInWithEmail, signOut, signUpWithEmail } from './auth'
import { bindDayEditor, parseDayEditor } from './custom-split-build'
import { bagIsEmpty } from './cart'
import { playGymBagDropAnimation } from './gym-bag-animation'
import { renderAppShell } from './components/app-shell'
import {
  mountHeroLogoLoop,
  unmountHeroLogoLoop,
} from './components/mount-hero-logo-loop'
import { BODY_PART_LABELS, FAMOUS_SPLITS } from './data'
import { guideById } from './exercises'
import {
  saveActiveSession,
  saveCustomSplits,
  saveSessions,
  uid,
} from './storage'
import { navigate, state } from './state'
import type {
  BodyPart,
  ExerciseSet,
  LoggedExercise,
  SplitDay,
  WorkoutSession,
  WorkoutSplit,
} from './types'
import { renderBodyParts } from './views/body-parts'
import { renderCreateSplit } from './views/create-split'
import { renderCustomSplits } from './views/custom-splits'
import { renderGymBag } from './views/gym-bag'
import { renderHistory } from './views/history'
import { renderHome } from './views/home'
import { renderBodyPartDetail } from './views/body-part-detail'
import { renderExerciseDemo } from './views/exercise-demo'
import { showToast } from './views/helpers'
import {
  bindLogSetForms,
  formatSetSummary,
  readLogSetForm,
} from './views/log-set-form'
import { renderSplitDay } from './views/split-day'
import { renderSplitDetail } from './views/split-detail'
import { renderSplits } from './views/splits'
import { renderAuth } from './views/auth'
import { renderProfile } from './views/profile'
import { renderWorkout } from './views/workout'

const appEl = document.querySelector<HTMLDivElement>('#app')!

function closeProfileMenu(): void {
  state.profileOpen = false
}

function ensureAuthView(): void {
  if (!state.authReady) return
  if (!state.user && !state.authBypass) {
    if (state.view !== 'auth') navigate('auth')
    return
  }
  if (state.user && state.view === 'auth') {
    navigate('home')
  }
}

export function render(): void {
  if (!state.authReady) {
    appEl.innerHTML = `
      <div class="app-shell app-shell--auth">
        <main class="app app--auth">
          <p class="auth-loading" aria-live="polite">Loading…</p>
        </main>
      </div>
    `
    return
  }

  ensureAuthView()

  let html = ''
  switch (state.view) {
    case 'auth':
      html = renderAuth()
      break
    case 'home':
      html = renderHome()
      break
    case 'splits':
      html = renderSplits()
      break
    case 'split-detail':
      html = renderSplitDetail()
      break
    case 'split-day':
      html = renderSplitDay()
      break
    case 'body-part-detail':
      html = renderBodyPartDetail()
      break
    case 'exercise-demo':
      html = renderExerciseDemo()
      break
    case 'body-parts':
      html = renderBodyParts()
      break
    case 'custom-splits':
      html = renderCustomSplits()
      break
    case 'create-split':
      html = renderCreateSplit()
      break
    case 'gym-bag':
      html = renderGymBag()
      break
    case 'workout':
      html = renderWorkout()
      break
    case 'history':
      html = renderHistory()
      break
    case 'profile':
      html = renderProfile()
      break
  }

  appEl.innerHTML = renderAppShell(html, { bare: state.view === 'auth' })
  bindEvents()
  if (state.view === 'auth') bindAuth()
  if (state.view === 'create-split') initCreateSplitForm()
}

function bindAuth(): void {
  const signInForm = appEl.querySelector<HTMLFormElement>('#auth-signin-form')
  const signUpForm = appEl.querySelector<HTMLFormElement>('#auth-signup-form')
  if (!signInForm || !signUpForm) return
  if (signInForm.dataset.bound === '1') return
  signInForm.dataset.bound = '1'
  signUpForm.dataset.bound = '1'

  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const errEl = appEl.querySelector<HTMLElement>('#auth-signin-error')!
    const submit = signInForm.querySelector<HTMLButtonElement>('[type="submit"]')!
    const fd = new FormData(signInForm)
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')

    errEl.hidden = true
    submit.disabled = true

    const { error } = await signInWithEmail(email, password)
    submit.disabled = false

    if (error) {
      errEl.textContent = error
      errEl.hidden = false
      return
    }

    showToast('Welcome back!')
    navigate('home')
    render()
  })

  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const errEl = appEl.querySelector<HTMLElement>('#auth-signup-error')!
    const submit = signUpForm.querySelector<HTMLButtonElement>('[type="submit"]')!
    const fd = new FormData(signUpForm)
    const displayName = String(fd.get('displayName') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')
    const confirm = String(fd.get('confirmPassword') ?? '')

    errEl.hidden = true

    if (password !== confirm) {
      errEl.textContent = 'Passwords do not match.'
      errEl.hidden = false
      return
    }

    if (password.length < 6) {
      errEl.textContent = 'Password must be at least 6 characters.'
      errEl.hidden = false
      return
    }

    submit.disabled = true
    const { error } = await signUpWithEmail(email, password, displayName)
    submit.disabled = false

    if (error) {
      errEl.textContent = error
      errEl.hidden = false
      return
    }

    showToast('Account created! Check your email if confirmation is required.')
    state.authTab = 'signin'
    navigate('auth')
    render()
  })
}

function bindCreateSplitForm(): void {
  const form = appEl.querySelector('#create-split-form')
  if (!form) return

  form.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement

    if (target.classList.contains('body-part-pick__input')) {
      const editor = target.closest('.day-editor')
      const part = target.value
      const section = editor?.querySelector<HTMLElement>(
        `.day-part-exercises[data-part="${part}"]`,
      )
      if (section) section.hidden = !target.checked
      return
    }

    if (target.classList.contains('select-all-exercises')) {
      const section = target.closest('.day-part-exercises')
      if (!section) return
      section.querySelectorAll<HTMLInputElement>('.exercise-pick__input').forEach((cb) => {
        cb.checked = target.checked
      })
    }
  })
}

function openGymBag(): void {
  state.returnView = state.view
  navigate('gym-bag')
  render()
}

function openWorkout(): void {
  ensureWorkoutSession()
  if (!state.activeSession) {
    showToast('Start a split or pick a body part first')
    return
  }
  navigate('workout')
  render()
}

function goBackFromGymBag(): void {
  navigate(state.returnView)
  render()
}

function bindEvents(): void {
  appEl.onclick = (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-action]')
    if (!target) return
    const action = target.dataset.action!

    switch (action) {
      case 'toggle-profile-menu':
        state.profileOpen = !state.profileOpen
        render()
        break
      case 'close-profile-menu':
        closeProfileMenu()
        render()
        break
      case 'auth-tab-signin':
        closeProfileMenu()
        state.authTab = 'signin'
        navigate('auth')
        render()
        break
      case 'auth-tab-signup':
        closeProfileMenu()
        state.authTab = 'signup'
        navigate('auth')
        render()
        break
      case 'auth-sign-out':
        closeProfileMenu()
        state.authBypass = false
        signOut().then(() => {
          showToast('Signed out')
          navigate('auth')
          render()
        })
        break
      case 'auth-continue':
        state.authBypass = true
        navigate('home')
        render()
        break
      case 'go-auth':
        closeProfileMenu()
        state.authTab = 'signin'
        state.authBypass = false
        navigate('auth')
        render()
        break
      case 'go-profile':
        closeProfileMenu()
        navigate('profile')
        render()
        break
      case 'go-home':
        closeProfileMenu()
        navigate('home')
        render()
        break
      case 'go-splits':
        navigate('splits')
        render()
        break
      case 'go-body-parts':
        navigate('body-parts')
        render()
        break
      case 'go-custom-splits':
        navigate('custom-splits')
        render()
        break
      case 'go-create-split':
        navigate('create-split')
        render()
        break
      case 'go-history':
        closeProfileMenu()
        navigate('history')
        render()
        break
      case 'go-split-back':
        navigate(state.selectedSplit?.isCustom ? 'custom-splits' : 'splits')
        state.selectedSplit = null
        render()
        break
      case 'go-gym-bag':
        openGymBag()
        break
      case 'go-workout':
        openWorkout()
        break
      case 'go-back':
        goBackFromGymBag()
        break
      case 'open-split': {
        const id = target.dataset.splitId!
        state.selectedSplit = FAMOUS_SPLITS.find((s) => s.id === id) ?? null
        navigate('split-detail')
        render()
        break
      }
      case 'open-custom-split': {
        const id = target.dataset.splitId!
        state.selectedSplit = state.customSplits.find((s) => s.id === id) ?? null
        navigate('split-detail')
        render()
        break
      }
      case 'open-split-day': {
        state.selectedDayIndex = Number(target.dataset.dayIndex)
        navigate('split-day')
        render()
        break
      }
      case 'go-split-detail':
        navigate('split-detail')
        render()
        break
      case 'go-split-day':
        navigate('split-day')
        render()
        break
      case 'open-body-part':
      case 'open-body-part-group': {
        const partsRaw = target.dataset.bodyParts ?? target.dataset.bodyPart ?? ''
        state.selectedBodyParts = partsRaw
          .split(',')
          .filter(Boolean) as BodyPart[]
        state.selectedBodyPartLabel = target.dataset.groupLabel ?? null
        navigate('body-part-detail')
        render()
        break
      }
      case 'go-body-part-detail':
        navigate('body-part-detail')
        render()
        break
      case 'open-exercise-demo': {
        state.selectedExerciseId = target.dataset.exerciseId!
        navigate('exercise-demo')
        render()
        break
      }
      case 'start-split-workout':
        initSessionFromSplitDay(state.selectedDayIndex)
        showToast('Session started — add sets to your gym bag')
        render()
        break
      case 'complete-workout':
        completeWorkout()
        break
      case 'discard-workout':
        discardWorkout()
        break
      case 'toggle-session-detail': {
        const id = target.dataset.sessionId!
        state.expandedSessionId = state.expandedSessionId === id ? null : id
        render()
        break
      }
      case 'delete-session': {
        const id = target.dataset.sessionId!
        if (confirm('Delete this workout permanently?')) {
          if (state.expandedSessionId === id) state.expandedSessionId = null
          deleteSession(id)
        }
        break
      }
      case 'open-body-part-standalone': {
        const part = target.dataset.bodyPart as BodyPart
        state.selectedSplit = null
        state.selectedBodyParts = [part]
        state.selectedBodyPartLabel = null
        if (!state.activeSession) {
          initSession(`${BODY_PART_LABELS[part]} day`, [part], false)
        }
        navigate('body-part-detail')
        render()
        break
      }
      case 'finish-workout':
        completeWorkout()
        break
      case 'confirm-exit':
        if (confirm('Leave workout log? Your gym bag is saved until you complete.')) {
          navigate(state.selectedSplit ? 'split-day' : 'home')
          render()
        }
        break
      case 'quick-add': {
        const name = target.dataset.name!
        ensureWorkoutSession()
        addExercise(name)
        showToast('Exercise added — log sets below')
        break
      }
      case 'remove-exercise':
        removeExercise(target.dataset.exerciseId!)
        break
      case 'remove-set':
        removeSet(
          target.dataset.exerciseId!,
          Number(target.dataset.setIndex),
        )
        break
      case 'add-split-day':
        addSplitDayEditor()
        break
      case 'remove-day':
        target.closest('.day-editor')?.remove()
        break
      case 'delete-custom-split': {
        const id = target.dataset.splitId!
        if (confirm('Delete this custom split?')) {
          state.customSplits = state.customSplits.filter((s) => s.id !== id)
          saveCustomSplits(state.customSplits)
          if (state.selectedSplit?.id === id) state.selectedSplit = null
          render()
        }
        break
      }
    }
  }

  appEl.querySelectorAll<HTMLFormElement>('.add-to-bag-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const exerciseId = form.dataset.exerciseId!
      const g = guideById(exerciseId)
      if (!g) return
      const sets = readLogSetForm(form)
      if (!sets?.length) return
      addToBag(g.name, sets, g.bodyPart)
      form.reset()
    })
  })

  appEl.querySelectorAll<HTMLFormElement>('.add-set-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const exId = form.dataset.exerciseId!
      const sets = readLogSetForm(form)
      if (!sets?.length) return
      addSet(exId, sets)
      form.reset()
    })
  })

  const addExerciseForm = appEl.querySelector<HTMLFormElement>('#add-exercise-form')
  addExerciseForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = addExerciseForm.querySelector<HTMLInputElement>(
      'input[name="exercise"]',
    )!
    const name = input.value.trim()
    if (name) {
      addExercise(name)
      addExerciseForm.reset()
      showToast('Exercise added — log sets below')
    }
  })

  const createForm = appEl.querySelector<HTMLFormElement>('#create-split-form')
  createForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    saveNewSplit(createForm)
  })

  bindLogSetForms(appEl)

  unmountHeroLogoLoop()
  if (state.view === 'home') {
    const heroLoop = appEl.querySelector<HTMLElement>('#hero-logo-loop')
    if (heroLoop) mountHeroLogoLoop(heroLoop)
  }
}

function initSessionFromSplitDay(dayIndex: number): void {
  const split = state.selectedSplit
  if (!split) return
  const day = split.days[dayIndex]
  if (!day) return
  initSession(`${split.name} — ${day.name}`, day.bodyParts)
}

function initSession(
  label: string,
  bodyParts: BodyPart[],
  confirmReplace = true,
): void {
  if (
    state.activeSession &&
    confirmReplace &&
    !confirm('Replace current gym bag?')
  ) {
    return
  }

  const session: WorkoutSession = {
    id: uid(),
    label,
    bodyParts,
    exercises: [],
    startedAt: new Date().toISOString(),
  }
  state.activeSession = session
  saveActiveSession(session)
}

function ensureWorkoutSession(): void {
  if (state.activeSession) return

  const split = state.selectedSplit
  const day = split?.days[state.selectedDayIndex]
  if (day) {
    initSession(`${split!.name} — ${day.name}`, day.bodyParts)
    return
  }

  const parts = state.selectedBodyParts
  if (parts.length) {
    const label =
      state.selectedBodyPartLabel ??
      parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' & ')
    initSession(`${label} day`, parts)
    return
  }

  const session: WorkoutSession = {
    id: uid(),
    label: 'Workout',
    bodyParts: [],
    exercises: [],
    startedAt: new Date().toISOString(),
  }
  state.activeSession = session
  saveActiveSession(session)
}

function pushSets(ex: LoggedExercise, sets: ExerciseSet[]): void {
  ex.sets.push(...sets)
}

async function addToBag(
  name: string,
  sets: ExerciseSet[],
  bodyPart?: BodyPart,
): Promise<void> {
  if (!name || !sets.length) return
  ensureWorkoutSession()
  addExercise(name, { silent: true, bodyPart })
  const ex = state.activeSession!.exercises.find(
    (e) => e.name.toLowerCase() === name.toLowerCase(),
  )
  if (ex) {
    pushSets(ex, sets)
    persistActive()
    await playGymBagDropAnimation({
      title: name,
      subtitle: formatSetSummary(sets),
    })
    showToast('Added to workout')
    render()
  }
}

function addExercise(
  name: string,
  options?: { silent?: boolean; bodyPart?: BodyPart },
): void {
  if (!state.activeSession || !name) return
  const exists = state.activeSession.exercises.find(
    (e) => e.name.toLowerCase() === name.toLowerCase(),
  )
  if (exists) {
    if (options?.bodyPart && !exists.bodyPart) exists.bodyPart = options.bodyPart
    return
  }

  state.activeSession.exercises.push({
    id: uid(),
    name,
    bodyPart: options?.bodyPart,
    sets: [],
  })
  persistActive()
  if (!options?.silent) render()
}

async function addSet(exerciseId: string, sets: ExerciseSet[]): Promise<void> {
  if (!state.activeSession) return
  const ex = state.activeSession.exercises.find((e) => e.id === exerciseId)
  if (!ex) return
  pushSets(ex, sets)
  persistActive()
  await playGymBagDropAnimation({
    title: ex.name,
    subtitle: formatSetSummary(sets),
  })
  render()
}

function removeExercise(exerciseId: string): void {
  if (!state.activeSession) return
  state.activeSession.exercises = state.activeSession.exercises.filter(
    (e) => e.id !== exerciseId,
  )
  persistActive()
  render()
}

function removeSet(exerciseId: string, setIndex: number): void {
  if (!state.activeSession) return
  const ex = state.activeSession.exercises.find((e) => e.id === exerciseId)
  if (!ex) return
  ex.sets.splice(setIndex, 1)
  persistActive()
  render()
}

function completeWorkout(): void {
  if (!state.activeSession) return
  if (bagIsEmpty(state.activeSession)) {
    alert('Add at least one exercise with sets before completing.')
    return
  }
  const completed: WorkoutSession = {
    ...state.activeSession,
    exercises: state.activeSession.exercises.filter((e) => e.sets.length > 0),
    completedAt: new Date().toISOString(),
  }
  state.sessions.push(completed)
  saveSessions(state.sessions)
  state.activeSession = null
  saveActiveSession(null)
  showToast('Workout completed!')
  navigate('home')
  render()
}

function discardWorkout(): void {
  if (!state.activeSession) return
  if (!confirm('Discard this workout? Everything in your gym bag will be removed.')) {
    return
  }
  state.activeSession = null
  saveActiveSession(null)
  navigate('home')
  render()
}

function deleteSession(sessionId: string): void {
  state.sessions = state.sessions.filter((s) => s.id !== sessionId)
  saveSessions(state.sessions)
  showToast('Workout deleted')
  render()
}

function persistActive(): void {
  if (state.activeSession) saveActiveSession(state.activeSession)
}

function initCreateSplitForm(): void {
  const container = appEl.querySelector('#split-days-container')
  if (container && !container.children.length) addSplitDayEditor()
  bindCreateSplitForm()
}

function addSplitDayEditor(): void {
  const template = appEl.querySelector<HTMLTemplateElement>('#day-template')
  const container = appEl.querySelector('#split-days-container')
  if (!template || !container) return
  const node = template.content.cloneNode(true) as DocumentFragment
  const editor = node.querySelector<HTMLElement>('.day-editor')
  if (editor) bindDayEditor(editor)
  container.appendChild(node)
}

function saveNewSplit(form: HTMLFormElement): void {
  const nameInput = form.querySelector<HTMLInputElement>('input[name="name"]')!
  const name = nameInput.value.trim()
  if (!name) return

  const dayEditors = form.querySelectorAll<HTMLElement>('.day-editor')
  const days: SplitDay[] = []

  for (const editor of dayEditors) {
    const day = parseDayEditor(editor)
    if (day) days.push(day)
  }

  if (!days.length) {
    alert(
      'Add at least one day with a name, body parts selected, and at least one exercise per part.',
    )
    return
  }

  const split: WorkoutSplit = {
    id: uid(),
    name,
    description: `${days.length} day custom routine`,
    days,
    isCustom: true,
  }

  state.customSplits.push(split)
  saveCustomSplits(state.customSplits)
  showToast('Split saved!')
  navigate('custom-splits')
  render()
}
