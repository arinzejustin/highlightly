<template>
    <div class="min-h-screen flex bg-white">
        <!-- Left — Form -->
        <div class="flex-1 flex items-center justify-center px-6 py-12 lg:px-20">
            <div class="w-full max-w-sm">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2.5 mb-10 group">
                    <div class="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center shadow-sm">
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

                <h1 class="text-2xl font-bold text-surface-900 mb-1.5">Create your account</h1>
                <p class="text-sm text-surface-500 mb-8">Start building your personal vocabulary today.</p>

                <!-- Success Message -->
                <div v-if="registerSuccess"
                    class="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"
                        stroke-linecap="round" class="mx-auto mb-2">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <p class="text-sm font-medium text-emerald-800 mb-1">Account created successfully!</p>
                    <p class="text-xs text-emerald-600">Redirecting you to login...</p>
                </div>

                <!-- Error Message -->
                <div v-if="authError"
                    class="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        class="shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {{ authError }}
                </div>

                <form v-if="!registerSuccess" @submit.prevent="handleSignUp" class="space-y-4">
                    <!-- Name -->
                    <div>
                        <label for="signup-name" class="block text-sm font-medium text-surface-700 mb-1.5">Full
                            name</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3"
                                    stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <input id="signup-name" v-model="form.name" type="text" required placeholder="John Doe"
                                class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
                        </div>
                    </div>

                    <!-- Email -->
                    <div>
                        <label for="signup-email" class="block text-sm font-medium text-surface-700 mb-1.5">Email
                            address</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3"
                                    stroke-width="2">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                            <input id="signup-email" v-model="form.email" type="email" required
                                placeholder="you@example.com"
                                class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
                        </div>
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="signup-password"
                            class="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3"
                                    stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <input id="signup-password" v-model="form.password"
                                :type="showPassword ? 'text' : 'password'" required minlength="6"
                                placeholder="Min. 6 characters"
                                class="w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-surface-400 hover:text-surface-600 transition-colors">
                                <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2">
                                    <path
                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </button>
                        </div>
                        <!-- Password strength -->
                        <div v-if="form.password" class="mt-2 flex gap-1">
                            <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded-full transition-colors duration-300"
                                :class="i <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-surface-200'">
                            </div>
                        </div>
                        <p v-if="form.password" class="text-xs mt-1"
                            :class="strengthLabels[passwordStrength - 1]?.color || 'text-surface-400'">
                            {{ strengthLabels[passwordStrength - 1]?.text || '' }}</p>
                    </div>

                    <!-- Terms -->
                    <div class="flex items-start gap-2.5 pt-1">
                        <input id="signup-terms" v-model="form.terms" type="checkbox" required
                            class="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500/20 accent-brand-600" />
                        <label for="signup-terms" class="text-xs text-surface-500 leading-relaxed">
                            I agree to the <a href="#" class="text-brand-600 hover:underline">Terms of Service</a> and
                            <a href="#" class="text-brand-600 hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <!-- Submit -->
                    <button type="submit" id="signup-submit" :disabled="isLoading || !form.terms"
                        class="w-full py-2.5 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        <div v-if="isLoading"
                            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {{ isLoading ? 'Creating account...' : 'Create account' }}
                    </button>
                </form>

                <!-- Divider -->
                <div v-if="!registerSuccess" class="flex items-center gap-3 my-6">
                    <div class="flex-1 h-px bg-surface-200"></div>
                    <span class="text-xs text-surface-400">or continue with</span>
                    <div class="flex-1 h-px bg-surface-200"></div>
                </div>

                <!-- Social -->
                <button v-if="!registerSuccess" id="signup-google" @click="handleGoogleSignUp" :disabled="isLoading"
                    class="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-medium text-surface-700 border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all disabled:opacity-60">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4" />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853" />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05" />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <p class="mt-8 text-center text-sm text-surface-500">
                    Already have an account?
                    <NuxtLink to="/auth/login" class="font-medium text-brand-600 hover:text-brand-700 transition-colors"
                        id="signup-login-link">Sign in</NuxtLink>
                </p>
            </div>
        </div>

        <!-- Right — Decorative Panel -->
        <div class="hidden lg:flex flex-1 items-center justify-center bg-surface-50 relative overflow-hidden">
            <div class="absolute inset-0 opacity-[0.3]"
                style="background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1px); background-size: 24px 24px;">
            </div>

            <div class="relative text-center max-w-sm px-8">
                <div
                    class="w-48 h-48 mx-auto mb-8 bg-white rounded-3xl border border-surface-200 shadow-lg shadow-surface-900/5 flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                        <rect x="20" y="28" width="12" height="44" rx="3" fill="#c7fff4" stroke="#04c8ac"
                            stroke-width="1" />
                        <rect x="34" y="22" width="12" height="50" rx="3" fill="#effefb" stroke="#04c8ac"
                            stroke-width="1" />
                        <rect x="48" y="32" width="12" height="40" rx="3" fill="#c7fff4" stroke="#04c8ac"
                            stroke-width="1" />
                        <rect x="62" y="26" width="12" height="46" rx="3" fill="#effefb" stroke="#04c8ac"
                            stroke-width="1" />
                        <path d="M38 22 L38 12 L42 16 L46 12 L46 22" fill="#04c8ac" opacity="0.7" />
                        <path d="M76 18 L78 23 L83 23 L79 27 L80 32 L76 29 L72 32 L73 27 L69 23 L74 23Z" fill="#fbbf24"
                            opacity="0.6" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-surface-900 mb-2">Build your library</h2>
                <p class="text-sm text-surface-500 leading-relaxed">Save every word you discover and build a personal
                    vocabulary that grows with you.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
    title: 'Sign Up | Highlightly',
    meta: [
        { name: 'description', content: 'Create a free Highlightly account to sync your vocabulary across devices and unlock premium features.' },
        { name: 'robots', content: 'noindex, nofollow' },
    ],
})

const { register, loginWithGoogle, isLoading, error: authError } = useAuth()

const form = ref({ name: '', email: '', password: '', terms: false })
const showPassword = ref(false)
const registerSuccess = ref(false)

const passwordStrength = computed(() => {
    const p = form.value.password
    if (!p) return 0
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    return score
})

const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-emerald-500']
const strengthLabels = [
    { text: 'Weak', color: 'text-red-500' },
    { text: 'Fair', color: 'text-orange-500' },
    { text: 'Good', color: 'text-amber-500' },
    { text: 'Strong', color: 'text-emerald-600' },
]

async function handleSignUp() {
    const success = await register(form.value.name, form.value.email, form.value.password)
    if (success) {
        registerSuccess.value = true
        setTimeout(() => {
            navigateTo('/auth/login')
        }, 2000)
    }
}

function handleGoogleSignUp() {
    loginWithGoogle()
}
</script>
