<template>
  <div class="min-h-screen flex bg-white">
    <!-- Left — Form -->
    <div class="flex-1 flex items-center justify-center px-6 py-12 lg:px-20">
      <div class="w-full max-w-sm">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 mb-10 group">
          <div class="w-8 h-8 bg-linear-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:shadow-brand-500/30 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-white">
              <path d="M9 11L12 2L15 11H9Z" fill="currentColor" opacity="0.7" />
              <path d="M5 13H19L18 17H6L5 13Z" fill="currentColor" />
              <path d="M7 19H17L16.5 21H7.5L7 19Z" fill="currentColor" opacity="0.8" />
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tight">
            <span class="text-surface-900">Highlight</span><span class="text-brand-600">ly</span>
          </span>
        </NuxtLink>

        <h1 class="text-2xl font-bold text-surface-900 mb-1.5">Welcome back</h1>
        <p class="text-sm text-surface-500 mb-8">Sign in to your account to continue learning.</p>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="login-email" class="block text-sm font-medium text-surface-700 mb-1.5">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <input
                id="login-email"
                v-model="form.email"
                type="email"
                required
                placeholder="you@example.com"
                class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label for="login-password" class="text-sm font-medium text-surface-700">Password</label>
              <NuxtLink to="/auth/forgot" class="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors" id="login-forgot-link">Forgot password?</NuxtLink>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input
                id="login-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Enter your password"
                class="w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
              >
                <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            id="login-submit"
            :disabled="isLoading"
            class="w-full py-2.5 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <div v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-surface-200"></div>
          <span class="text-xs text-surface-400">or continue with</span>
          <div class="flex-1 h-px bg-surface-200"></div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <button id="login-google" class="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-surface-700 border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button id="login-github" class="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-surface-700 border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#171717"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <p class="mt-8 text-center text-sm text-surface-500">
          Don't have an account?
          <NuxtLink to="/auth/welcome" class="font-medium text-brand-600 hover:text-brand-700 transition-colors" id="login-signup-link">Sign up</NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right — Decorative Panel -->
    <div class="hidden lg:flex flex-1 items-center justify-center bg-surface-50 relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.3]" style="background-image: radial-linear(circle, #d4d4d4 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-brand-200/30 rounded-full blur-[80px]"></div>
      <div class="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-brand-100/40 rounded-full blur-[60px]"></div>

      <div class="relative text-center max-w-sm px-8">
        <!-- Illustration -->
        <div class="w-48 h-48 mx-auto mb-8 bg-white rounded-3xl border border-surface-200 shadow-lg shadow-surface-900/5 flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <rect x="15" y="20" width="70" height="60" rx="8" stroke="#d4d4d4" stroke-width="2" fill="#fafafa" />
            <rect x="25" y="35" width="30" height="4" rx="2" fill="#e5e5e5" />
            <rect x="25" y="43" width="50" height="4" rx="2" fill="#e5e5e5" />
            <rect x="25" y="51" width="15" height="4" rx="2" fill="#e5e5e5" />
            <rect x="42" y="50" width="20" height="6" rx="3" fill="#c7fff4" stroke="#04c8ac" stroke-width="1" />
            <rect x="64" y="51" width="12" height="4" rx="2" fill="#e5e5e5" />
            <rect x="25" y="59" width="40" height="4" rx="2" fill="#e5e5e5" />
            <!-- Tooltip -->
            <rect x="30" y="5" width="40" height="22" rx="6" fill="white" stroke="#04c8ac" stroke-width="1.5" />
            <rect x="36" y="11" width="28" height="3" rx="1.5" fill="#04c8ac" opacity="0.3" />
            <rect x="36" y="17" width="20" height="3" rx="1.5" fill="#04c8ac" opacity="0.15" />
            <path d="M48 27 L52 27 L50 31 Z" fill="white" stroke="#04c8ac" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-surface-900 mb-2">Learn as you browse</h2>
        <p class="text-sm text-surface-500 leading-relaxed">Highlight any word on any webpage to instantly learn its meaning, pronunciation, and usage.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: 'Log In — Highlightly',
  meta: [
    { name: 'description', content: 'Sign in to your Highlightly account to sync your vocabulary and manage your settings.' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)

function handleLogin() {
  isLoading.value = true
  setTimeout(() => { isLoading.value = false }, 1500)
}
</script>
