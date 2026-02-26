<template>
  <section id="features" class="relative py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-brand-200 bg-brand-50 text-xs font-medium text-brand-700 tracking-wider uppercase">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Features
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-surface-900 leading-tight">
          Everything you need to
          <span class="text-brand-700">learn smarter</span>
        </h2>
        <p class="mt-4 text-base text-surface-500 leading-relaxed max-w-2xl mx-auto">
          Highlightly transforms passive reading into active learning with intelligent features designed around how you
          naturally consume content.
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="feature in features" :key="feature.title"
          class="group relative p-7 rounded-2xl border border-surface-100 bg-surface-50/50 hover:bg-white hover:border-surface-200 hover:shadow-lg hover:shadow-surface-900/5 transition-all duration-300 hover:-translate-y-0.5">
          <!-- Icon -->
          <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
            :class="feature.bgClass"
          >
            <div v-html="feature.icon" :style="{ color: feature.iconColor }"></div>
          </div>

          <!-- Content -->
          <h3 class="text-lg font-semibold text-surface-900 mb-2">{{ feature.title }}</h3>
          <p class="text-[14px] text-surface-500 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Instant Definitions',
    description: 'Get immediate word meanings directly on the page. No tab switching, no losing your place. Just highlight and learn.',
    bgClass: 'bg-brand-50 border border-brand-200',
    iconColor: '#04c8ac',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  },
  {
    title: 'Smart Vocabulary',
    description: 'Save words in one click. Each entry captures the word, its meaning, source page, and date — building a structured library.',
    bgClass: 'bg-emerald-50 border border-emerald-200',
    iconColor: '#059669',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    title: 'Pronunciation',
    description: 'Hear how words are pronounced with audio playback. Phonetics are displayed alongside definitions.',
    bgClass: 'bg-violet-50 border border-violet-200',
    iconColor: '#7c3aed',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  },
  {
    title: 'Usage Examples',
    description: 'See real-world examples of how words are used in context. Understanding usage is just as important as the definition.',
    bgClass: 'bg-amber-50 border border-amber-200',
    iconColor: '#d97706',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    title: 'Vocabulary Dashboard',
    description: 'A distraction-free interface to manage saved words. Search, sort, filter, edit, and track your progress.',
    bgClass: 'bg-rose-50 border border-rose-200',
    iconColor: '#e11d48',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  },
  {
    title: 'Privacy First',
    description: 'Your data stays on your device. No tracking, no analytics, no third-party access. Optional cloud sync only when enabled.',
    bgClass: 'bg-sky-50 border border-sky-200',
    iconColor: '#0284c7',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
]
</script>
