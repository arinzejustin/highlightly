<template>
  <section class="relative py-20 bg-surface-50">
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left -->
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700 tracking-wider uppercase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Privacy & Performance
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-surface-900 mb-4 leading-tight">
            Built for trust.
            <br />
            <span class="text-brand-700">Engineered for speed.</span>
          </h2>
          <p class="text-base text-surface-500 leading-relaxed mb-8">
            Highlightly is designed from the ground up with privacy as a core principle, not an afterthought.
          </p>

          <div class="space-y-4">
            <div v-for="point in privacyPoints" :key="point.title" class="flex items-start gap-3.5">
              <div class="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border" :class="point.borderClass">
                <div v-html="point.icon"></div>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-surface-900 mb-0.5">{{ point.title }}</h3>
                <p class="text-sm text-surface-500 leading-relaxed">{{ point.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right -->
        <div class="space-y-4">
          <div class="p-6 rounded-2xl border border-surface-200 bg-white">
            <h4 class="text-xs font-medium text-surface-400 uppercase tracking-wider mb-4">Required Permissions</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 rounded-xl bg-surface-50 border border-surface-100">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04c8ac" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/></svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-surface-800">activeTab</div>
                    <div class="text-xs text-surface-400">Read selected text on current page</div>
                  </div>
                </div>
                <span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Minimal</span>
              </div>
              <div class="flex items-center justify-between p-3 rounded-xl bg-surface-50 border border-surface-100">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04c8ac" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-surface-800">storage</div>
                    <div class="text-xs text-surface-400">Save vocabulary locally on device</div>
                  </div>
                </div>
                <span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Minimal</span>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl border border-surface-200 bg-white">
            <h4 class="text-xs font-medium text-surface-400 uppercase tracking-wider mb-4">Performance Impact</h4>
            <div class="space-y-3.5">
              <div v-for="metric in performanceMetrics" :key="metric.label">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm text-surface-600">{{ metric.label }}</span>
                  <span class="text-sm font-semibold" :class="metric.color">{{ metric.value }}</span>
                </div>
                <div class="h-1.5 bg-surface-100 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000 ease-out" :class="metric.barColor" :style="{ width: metric.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const privacyPoints = [
  { title: 'Local Storage Only', description: 'All data stays on your device. Nothing sent externally unless you enable sync.', borderClass: 'border-emerald-200 bg-emerald-50', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' },
  { title: 'Zero Tracking', description: 'No analytics, no cookies, no behavior tracking. We don\'t know what you read.', borderClass: 'border-brand-200 bg-brand-50', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#04c8ac" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="1" y1="1" x2="23" y2="23" stroke="#ef4444" stroke-width="2.5"/></svg>' },
  { title: 'Open Source', description: 'Our code is fully transparent. Audit it, contribute to it on GitHub.', borderClass: 'border-violet-200 bg-violet-50', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="#7c3aed"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' },
  { title: 'Manifest V3', description: 'Built on the latest Chrome extension standard with the most secure architecture.', borderClass: 'border-amber-200 bg-amber-50', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>' },
]

const performanceMetrics = [
  { label: 'Memory Usage', value: '< 2MB', percent: 8, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
  { label: 'Load Time Impact', value: '< 5ms', percent: 3, color: 'text-brand-600', barColor: 'bg-brand-500' },
  { label: 'CPU Usage (idle)', value: '~0%', percent: 1, color: 'text-violet-600', barColor: 'bg-violet-500' },
  { label: 'Network (idle)', value: '0 requests', percent: 0, color: 'text-amber-600', barColor: 'bg-amber-500' },
]
</script>
