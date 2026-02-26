<template>
  <footer class="border-t border-surface-100 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div class="md:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-2.5 mb-3">
            <div class="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-white">
                <path d="M9 11L12 2L15 11H9Z" fill="currentColor" opacity="0.7" />
                <path d="M5 13H19L18 17H6L5 13Z" fill="currentColor" />
                <path d="M7 19H17L16.5 21H7.5L7 19Z" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
            <span class="text-base font-bold"><span class="text-surface-900">Highlight</span><span
                class="text-brand-600">ly</span></span>
          </NuxtLink>
          <p class="text-sm text-surface-400 leading-relaxed mb-5">A fast, privacy-first browser extension for instant
            word definitions.</p>
          <div class="flex items-center gap-2.5">
            <a v-for="s in socials" :key="s.name" :href="s.href" target="_blank" :aria-label="s.name"
              class="w-8 h-8 rounded-lg border border-surface-100 flex items-center justify-center text-surface-400 hover:text-surface-700 hover:border-surface-300 hover:bg-surface-50 transition-all duration-200"
              v-html="s.icon" />
          </div>
        </div>
        <div v-for="group in footerLinks" :key="group.title">
          <h4 class="text-xs font-semibold text-surface-800 mb-3 tracking-wider uppercase">{{ group.title }}</h4>
          <ul class="space-y-2">
            <li v-for="link in group.links" :key="link.label">
              <a :href="link.href"
                class="text-sm text-surface-400 hover:text-brand-600 transition-colors">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-12 pt-6 border-t border-surface-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-surface-400">&copy; {{ new Date().getFullYear() }} Highlightly. Apache License 2.0.</p>
        <div class="flex items-center gap-5">
          <a href="#" class="text-xs text-surface-400 hover:text-surface-600 transition-colors">Privacy</a>
          <a href="#" class="text-xs text-surface-400 hover:text-surface-600 transition-colors">Terms</a>
          <a href="#" class="text-xs text-surface-400 hover:text-surface-600 transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = [
  { name: 'GitHub', href: 'https://github.com/arinzejustin/highlight', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>' },
  { name: 'Twitter', href: 'https://twitter.com', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
  { name: 'Email', href: 'mailto:codewitharinzejustin@gmail.com', icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' },
]

const footerLinks = [
  { title: 'Product', links: [{ label: 'Features', href: '/#features' }, { label: 'Demo', href: '/#demo' }, { label: 'Pricing', href: '/#pricing' }, { label: 'Changelog', href: '#' }] },
  { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'Support', href: '#' }, { label: 'FAQ', href: '#' }, { label: 'Blog', href: '#' }] },
  { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Open Source', href: 'https://github.com/arinzejustin/highlight' }, { label: 'Contact', href: 'mailto:codewitharinzejustin@gmail.com' }] },
]
</script>
