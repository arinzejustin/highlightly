<template>
  <section id="how-it-works" class="relative py-20 bg-white">
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-brand-200 bg-brand-50 text-xs font-medium text-brand-700 tracking-wider uppercase">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          How It Works
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-surface-900 leading-tight">
          Three steps to <span class="text-brand-700">smarter reading</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div v-for="(step, index) in steps" :key="step.title" class="relative group">
          <!-- Connector Line -->
          <div v-if="index < steps.length - 1" class="hidden lg:block absolute top-10 left-[calc(50%+36px)] w-[calc(100%-36px)] h-px bg-surface-200">
            <div class="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-brand-300 to-brand-100 h-px"></div>
          </div>

          <div class="relative p-7 rounded-2xl border border-surface-100 bg-surface-50/50 hover:bg-white hover:border-surface-200 hover:shadow-lg hover:shadow-surface-900/5 transition-all duration-300 text-center">
            <div class="relative inline-flex items-center justify-center w-14 h-14 mb-5">
              <div class="absolute inset-0 rounded-2xl bg-linear-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300" :class="step.gradient"></div>
              <div class="relative text-xl font-bold text-surface-800">{{ index + 1 }}</div>
            </div>
            <div class="w-full h-28 mb-5 flex items-center justify-center">
              <div v-html="step.illustration" class="transition-transform duration-300 group-hover:-translate-y-1"></div>
            </div>
            <h3 class="text-lg font-semibold text-surface-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-surface-500 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: 'Highlight a Word',
    description: 'Simply select any word on any webpage. Highlightly detects your selection instantly.',
    gradient: 'from-brand-500 to-brand-700',
    illustration: `
      <div class="relative">
        <div class="flex flex-col gap-2 p-4 rounded-xl bg-white border border-surface-200 w-52 shadow-sm">
          <div class="h-2 bg-surface-100 rounded-full w-full"></div>
          <div class="flex items-center gap-1">
            <div class="h-2 bg-surface-100 rounded-full w-14"></div>
            <span class="px-1.5 py-0.5 text-xs font-semibold text-brand-800 bg-brand-100 rounded border-b border-brand-400 animate-pulse">word</span>
            <div class="h-2 bg-surface-100 rounded-full w-10"></div>
          </div>
          <div class="h-2 bg-surface-100 rounded-full w-3/4"></div>
        </div>
        <svg class="absolute -bottom-1 -right-2 w-7 h-7 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M15 15l-2 5L9 9l11 4-5 2z"/></svg>
      </div>`,
  },
  {
    title: 'See the Definition',
    description: 'A lightweight popover appears with the meaning, pronunciation, and usage examples.',
    gradient: 'from-emerald-500 to-emerald-700',
    illustration: `
      <div class="p-4 rounded-xl bg-white border border-surface-200 w-52 shadow-md">
        <div class="flex items-center justify-between mb-2">
          <div>
            <div class="text-sm font-semibold text-surface-900">Serenity</div>
            <div class="text-[10px] text-surface-400 italic">/səˈrenədē/</div>
          </div>
          <div class="w-5 h-5 rounded bg-surface-100 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
          </div>
        </div>
        <div class="text-xs text-surface-500 leading-relaxed">The state of being calm, peaceful, and untroubled.</div>
      </div>`,
  },
  {
    title: 'Save & Learn',
    description: 'Click save to add it to your vocabulary. Review saved words anytime from the dashboard.',
    gradient: 'from-violet-500 to-violet-700',
    illustration: `
      <div class="p-4 rounded-xl bg-white border border-surface-200 w-52">
        <div class="flex items-center gap-3 p-2 rounded-lg bg-brand-50 border border-brand-200 mb-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#04c8ac" stroke="#04c8ac" stroke-width="1"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <div class="text-xs text-brand-700 font-medium">Word saved!</div>
        </div>
        <div class="flex items-center gap-2 p-2 rounded-lg bg-surface-50">
          <div class="w-1 h-6 rounded-full bg-brand-500"></div>
          <div>
            <div class="text-xs text-surface-800 font-medium">Serenity</div>
            <div class="text-[10px] text-surface-400">Feb 16, 2026</div>
          </div>
        </div>
      </div>`,
  },
]
</script>
