export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

export function showToast(message: string): void {
  let el = document.querySelector<HTMLElement>('.toast')
  if (!el) {
    el = document.createElement('div')
    el.className = 'toast'
    document.body.appendChild(el)
  }
  el.textContent = message
  el.classList.add('toast--visible')
  window.setTimeout(() => el?.classList.remove('toast--visible'), 2200)
}
