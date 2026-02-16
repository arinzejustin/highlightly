<template>
  <section class="py-8 border-y border-surface-100 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <p class="text-center text-[11px] font-medium tracking-[0.2em] uppercase text-surface-400 mb-6">
        Compatible with your favorite browsers
      </p>
      <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
        <div
          v-for="browser in browsers"
          :key="browser.name"
          class="flex items-center gap-2.5 opacity-40 hover:opacity-100 transition-all duration-400 group cursor-default"
        >
          <div class="w-9 h-9 rounded-xl bg-surface-100 flex items-center justify-center group-hover:bg-surface-200 transition-colors" v-html="browser.icon"></div>
          <span class="text-sm font-medium text-surface-500 group-hover:text-surface-800 transition-colors hidden sm:inline">{{ browser.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const browsers = [
  {
    name: 'Chrome',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="#04c8ac" stroke-width="1.5"/><path d="M12 8a4 4 0 013.46 2H21a9 9 0 00-9-8v6z" fill="#525252" opacity="0.3"/><path d="M15.46 10a4 4 0 01-1.73 5.46l-2.73 4.73A9 9 0 0021 10h-5.54z" fill="#525252" opacity="0.2"/><path d="M10.27 15.46A4 4 0 018 12H3a9 9 0 008.27 8.2l-1-4.73z" fill="#525252" opacity="0.25"/></svg>`,
  },
  {
    name: 'Edge',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V14c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2c0-5.52-4.48-10-10-10z" stroke="#525252" stroke-width="1.5" opacity="0.4"/><circle cx="14" cy="16" r="3" stroke="#04c8ac" stroke-width="1.5"/></svg>`,
  },
  {
    name: 'Brave',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5.25 3.4 10.2 8 12 4.6-1.8 8-6.75 8-12V6l-8-4z" stroke="#525252" stroke-width="1.5" opacity="0.4"/><path d="M12 7l2.5 2-1 3 2.5 2-2 1-2-3-2 3-2-1 2.5-2-1-3z" fill="#04c8ac" opacity="0.5"/></svg>`,
  },
  {
    name: 'Arc',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#525252" stroke-width="1.5" opacity="0.3"/><path d="M8 12a4 4 0 018 0" stroke="#04c8ac" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    name: 'Opera',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="10" stroke="#525252" stroke-width="1.5" opacity="0.3"/><ellipse cx="12" cy="12" rx="4" ry="7" stroke="#04c8ac" stroke-width="1.5"/></svg>`,
  },
]
</script>
