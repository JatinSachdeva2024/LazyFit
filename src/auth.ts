import type { User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import { state } from './state'

export async function initAuth(onChange?: () => void): Promise<void> {
  if (!supabase) {
    state.authReady = true
    return
  }

  const { data } = await supabase.auth.getSession()
  state.user = data.session?.user ?? null

  supabase.auth.onAuthStateChange((_event, session) => {
    state.user = session?.user ?? null
    onChange?.()
  })

  state.authReady = true
}

export function displayName(user: User | null): string {
  if (!user) return ''
  const meta = user.user_metadata?.display_name
  if (typeof meta === 'string' && meta.trim()) return meta.trim()
  return user.email?.split('@')[0] ?? 'Athlete'
}

export function profileInitials(user: User | null, guestLabel = 'LF'): string {
  const name = user ? displayName(user) : guestLabel
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[1]![0]!).toUpperCase()
  }
  if (parts.length === 1) {
    const word = parts[0]!
    return word.length >= 2 ? word.slice(0, 2).toUpperCase() : word.toUpperCase()
  }
  return guestLabel.slice(0, 2).toUpperCase()
}

export function profileEmail(user: User | null): string {
  return user?.email ?? ''
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    return { error: 'Supabase is not configured. Add keys to .env.local.' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName.trim() || undefined },
    },
  })

  return { error: error?.message ?? null }
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    return { error: 'Supabase is not configured. Add keys to .env.local.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return { error: error?.message ?? null }
}

export async function signOut(): Promise<void> {
  if (supabase) await supabase.auth.signOut()
  state.user = null
  state.authBypass = false
}
