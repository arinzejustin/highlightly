<template>
    <div class="min-h-screen flex bg-white">
        <!-- Left — Form -->
        <div class="flex-1 flex items-center justify-center px-6 py-12 lg:px-20">
            <div class="w-full max-w-sm">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-2.5 mb-10 group">
                    <div
                        class="w-8 h-8 bg-linear-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/20">
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

                <!-- Back Link -->
                <NuxtLink to="/login"
                    class="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 transition-colors mb-8"
                    id="forgot-back-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to login
                </NuxtLink>

                <!-- Not Submitted State -->
                <template v-if="!submitted">
                    <h1 class="text-2xl font-bold text-surface-900 mb-1.5">Forgot your password?</h1>
                    <p class="text-sm text-surface-500 mb-8">No worries. Enter your email and we'll send you a reset
                        link.</p>

                    <form @submit.prevent="handleSubmit" class="space-y-5">
                        <div>
                            <label for="forgot-email" class="block text-sm font-medium text-surface-700 mb-1.5">Email
                                address</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3"
                                        stroke-width="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <input id="forgot-email" v-model="email" type="email" required
                                    placeholder="you@example.com"
                                    class="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
                            </div>
                        </div>

                        <button type="submit" id="forgot-submit" :disabled="isLoading"
                            class="w-full py-2.5 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <div v-if="isLoading"
                                class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {{ isLoading ? 'Sending...' : 'Send reset link' }}
                        </button>
                    </form>
                </template>

                <!-- Success State -->
                <template v-else>
                    <div class="text-center">
                        <div
                            class="w-14 h-14 mx-auto mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669"
                                stroke-width="2.5" stroke-linecap="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h1 class="text-2xl font-bold text-surface-900 mb-2">Check your email</h1>
                        <p class="text-sm text-surface-500 mb-6">
                            We've sent a password reset link to<br />
                            <strong class="text-surface-700">{{ email }}</strong>
                        </p>
                        <p class="text-xs text-surface-400 mb-8">
                            Didn't receive the email? Check your spam folder, or
                            <button @click="handleSubmit" class="text-brand-600 hover:underline font-medium">try
                                again</button>.
                        </p>
                        <NuxtLink to="/login" id="forgot-back-login"
                            class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all shadow-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Back to login
                        </NuxtLink>
                    </div>
                </template>
            </div>
        </div>

        <!-- Right — Decorative Panel -->
        <div class="hidden lg:flex flex-1 items-center justify-center bg-surface-50 relative overflow-hidden">
            <div class="absolute inset-0 opacity-[0.3]"
                style="background-image: radial-linear(circle, #d4d4d4 1px, transparent 1px); background-size: 24px 24px;">
            </div>
            <div class="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-amber-200/20 rounded-full blur-[70px]"></div>
            <div class="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-brand-100/30 rounded-full blur-[80px]">
            </div>

            <div class="relative text-center max-w-sm px-8">
                <div
                    class="w-48 h-48 mx-auto mb-8 bg-white rounded-3xl border border-surface-200 shadow-lg shadow-surface-900/5 flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                        <!-- Lock -->
                        <rect x="30" y="45" width="40" height="32" rx="6" fill="#fafafa" stroke="#d4d4d4"
                            stroke-width="2" />
                        <path d="M38 45 V35 a12 12 0 0 1 24 0 v10" fill="none" stroke="#d4d4d4" stroke-width="2.5"
                            stroke-linecap="round" />
                        <!-- Keyhole -->
                        <circle cx="50" cy="58" r="5" fill="#04c8ac" opacity="0.3" stroke="#04c8ac"
                            stroke-width="1.5" />
                        <rect x="48" y="61" width="4" height="8" rx="2" fill="#04c8ac" opacity="0.3" />
                        <!-- Sparkle -->
                        <path d="M72 28 L74 32 L78 34 L74 36 L72 40 L70 36 L66 34 L70 32 Z" fill="#fbbf24"
                            opacity="0.5" />
                        <path d="M28 22 L29 25 L32 26 L29 27 L28 30 L27 27 L24 26 L27 25 Z" fill="#04c8ac"
                            opacity="0.4" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-surface-900 mb-2">Secure & private</h2>
                <p class="text-sm text-surface-500 leading-relaxed">Your account is protected with industry-standard
                    encryption.
                    We take your security seriously.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
    title: 'Reset Password — Highlightly',
    meta: [
        { name: 'description', content: 'Reset your Highlightly account password. We\'ll send you a secure link to create a new password.' },
        { name: 'robots', content: 'noindex, nofollow' },
    ],
})

const email = ref('')
const isLoading = ref(false)
const submitted = ref(false)

function handleSubmit() {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        submitted.value = true
    }, 1200)
}
</script>
