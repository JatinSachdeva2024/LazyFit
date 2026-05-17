/** Production app URL (Vercel). Used for Supabase email confirm / reset redirects. */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv.trim().replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}

/** Where Supabase sends users after they tap "Confirm email". */
export function getAuthRedirectUrl(): string {
  const base = getSiteUrl()
  return base ? `${base}/` : '/'
}
