<template>
  <section id="download" class="relative py-20 overflow-hidden bg-surface-50">
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-100/40 rounded-full blur-[100px]">
      </div>
    </div>

    <div class="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-brand-600 shadow-sm">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" class="text-white">
          <path d="M9 11L12 2L15 11H9Z" fill="currentColor" opacity="0.7" />
          <path d="M5 13H19L18 17H6L5 13Z" fill="currentColor" />
          <path d="M7 19H17L16.5 21H7.5L7 19Z" fill="currentColor" opacity="0.8" />
        </svg>
      </div>

      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 mb-4">
        Ready to read <span class="text-brand-700">smarter</span>?
      </h2>
      <p class="text-base text-surface-500 max-w-xl mx-auto mb-8">
        Join curious readers using Highlightly to expand their vocabulary and understand content faster.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
        <a href="https://chrome.google.com/webstore" target="_blank" id="cta-chrome"
          class="inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" y1="8" x2="12" y2="8" />
            <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
            <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
          </svg>
          Add to Chrome
        </a>
        <a href="https://microsoftedge.microsoft.com/addons" target="_blank" id="cta-edge"
          class="inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] font-medium text-surface-600 border border-surface-200 bg-white rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all duration-200">
          Add to Edge
        </a>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-5 text-xs text-surface-400">
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04c8ac" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>Privacy First
        </div>
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04c8ac" stroke-width="2">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>Lightweight
        </div>
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04c8ac" stroke-width="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>Free Forever
        </div>
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#04c8ac">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>Open Source
        </div>
      </div>
    </div>
  </section>
</template>
