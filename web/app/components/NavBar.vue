<template>
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        :class="scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-surface-200 shadow-sm' : 'bg-transparent'">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-[72px]">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2.5 group" id="nav-logo">
                    <div class="relative w-8 h-8">
                        <div
                            class="absolute inset-0 bg-brand-500/20 rounded-xl blur-md group-hover:bg-brand-500/30 transition-all duration-500">
                        </div>
                        <div
                            class="relative w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center shadow-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-white">
                                <path d="M9 11L12 2L15 11H9Z" fill="currentColor" opacity="0.7" />
                                <path d="M5 13H19L18 17H6L5 13Z" fill="currentColor" />
                                <path d="M7 19H17L16.5 21H7.5L7 19Z" fill="currentColor" opacity="0.8" />
                            </svg>
                        </div>
                    </div>
                    <span class="text-xl font-bold tracking-tight">
                        <span class="text-surface-900">Highlight</span><span class="text-brand-600">ly</span>
                    </span>
                </NuxtLink>

                <!-- Desktop Links -->
                <div class="hidden md:flex items-center gap-1">
                    <a v-for="link in navLinks" :key="link.href" :href="link.href"
                        :id="`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`"
                        class="px-4 py-2 text-sm font-medium text-surface-500 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-all duration-200">
                        {{ link.label }}
                    </a>
                </div>

                <!-- CTA Buttons -->
                <div class="hidden md:flex items-center gap-3">
                    <NuxtLink to="/auth/login" id="nav-login"
                        class="px-4 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-all duration-200">
                        Log in
                    </NuxtLink>
                    <a href="#download" id="nav-download-btn"
                        class="px-5 py-2.5 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-sm">
                        Add to Browser
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-toggle"
                    class="md:hidden p-2 text-surface-500 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-colors"
                    @click="mobileOpen = !mobileOpen" :aria-label="mobileOpen ? 'Close menu' : 'Open menu'">
                    <svg v-if="!mobileOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <Transition enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2">
            <div v-if="mobileOpen" class="md:hidden bg-white/95 backdrop-blur-xl border-b border-surface-200 px-6 pb-6">
                <div class="flex flex-col gap-1 pt-2">
                    <a v-for="link in navLinks" :key="link.href" :href="link.href"
                        class="px-4 py-3 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-all"
                        @click="mobileOpen = false">
                        {{ link.label }}
                    </a>
                    <NuxtLink to="/auth/login"
                        class="px-4 py-3 text-sm font-medium text-surface-600 hover:text-surface-900 rounded-lg hover:bg-surface-100 transition-all"
                        @click="mobileOpen = false">
                        Log in
                    </NuxtLink>
                    <a href="#download"
                        class="mt-3 text-center px-5 py-3 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all"
                        @click="mobileOpen = false">
                        Add to Browser — It's Free
                    </a>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Demo', href: '/#demo' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
]

onMounted(() => {
    const handleScroll = () => {
        scrolled.value = window.scrollY > 20
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>
