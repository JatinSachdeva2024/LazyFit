/** Colorful duffel gym bag — zip + handles animate via CSS */
export function renderGymBagIcon(): string {
  return `
    <svg
      class="gym-bag-icon"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gb-body" x1="24" y1="14" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3b82f6" />
          <stop offset="1" stop-color="#1d4ed8" />
        </linearGradient>
        <linearGradient id="gb-panel" x1="24" y1="28" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop stop-color="#2563eb" />
          <stop offset="1" stop-color="#1e3a8a" />
        </linearGradient>
      </defs>

      <!-- Handles -->
      <path
        class="gb-handle gb-handle--l"
        d="M14 16C14 10 18 7 24 7s10 3 10 9"
        stroke="#7dd3fc"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
      />
      <path
        class="gb-handle gb-handle--r"
        d="M34 16C34 10 30 7 24 7"
        stroke="#bae6fd"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
      />

      <!-- Bag body -->
      <path
        class="gb-body"
        d="M8 18h32l-2.5 22H10.5L8 18Z"
        fill="url(#gb-body)"
        stroke="#1e40af"
        stroke-width="1.25"
        stroke-linejoin="round"
      />
      <path
        class="gb-panel"
        d="M11 30h26v8c0 1.5-1.2 2.5-3 2.5H14c-1.8 0-3-1-3-2.5v-8Z"
        fill="url(#gb-panel)"
      />

      <!-- Zip track -->
      <rect class="gb-zip-track" x="11" y="17" width="26" height="3" rx="1.5" fill="#1e3a8a" opacity="0.35" />

      <!-- Zip mouth (opens on drop) -->
      <g class="gb-zip-mouth">
        <rect class="gb-zip-opening" x="13" y="17.5" width="22" height="2" rx="1" fill="#0f172a" opacity="0.55" />
        <line class="gb-zip-tooth gb-zip-tooth--l" x1="13" y1="18.5" x2="22" y2="18.5" stroke="#e2e8f0" stroke-width="1" stroke-linecap="round" />
        <line class="gb-zip-tooth gb-zip-tooth--r" x1="26" y1="18.5" x2="35" y2="18.5" stroke="#e2e8f0" stroke-width="1" stroke-linecap="round" />
      </g>

      <!-- Zip teeth row -->
      <g class="gb-zip-teeth">
        <path d="M14 19h2v1h-2zM18 19h2v1h-2zM22 19h2v1h-2zM26 19h2v1h-2zM30 19h2v1h-2z" fill="#f8fafc" opacity="0.9" />
      </g>

      <!-- Pull tabs -->
      <rect class="gb-pull gb-pull--l" x="12" y="16" width="3" height="4" rx="1" fill="#fbbf24" />
      <rect class="gb-pull gb-pull--r" x="33" y="16" width="3" height="4" rx="1" fill="#f59e0b" />

      <!-- Front pocket zip -->
      <path class="gb-pocket" d="M18 32h12" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" />
      <circle class="gb-pocket-dot" cx="18" cy="32" r="1.25" fill="#f59e0b" />
    </svg>
  `
}
