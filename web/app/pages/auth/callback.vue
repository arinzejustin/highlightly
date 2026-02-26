<template>
    <div class="min-h-screen flex items-center justify-center bg-white">
        <div class="text-center">
            <div v-if="!authError" class="space-y-4">
                <div class="w-12 h-12 mx-auto border-3 border-surface-200 border-t-brand-500 rounded-full animate-spin">
                </div>
                <p class="text-sm text-surface-500">Completing sign in...</p>
            </div>
            <div v-else class="max-w-sm mx-auto px-6">
                <div
                    class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </div>
                <h1 class="text-xl font-bold text-surface-900 mb-2">Authentication Failed</h1>
                <p class="text-sm text-surface-500 mb-6">{{ authError }}</p>
                <NuxtLink to="/auth/login"
                    class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all">
                    Back to login
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app"
definePageMeta({ layout: false })

const { handleGoogleCallback, error: authError } = useAuth()

onMounted(async () => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken || !refreshToken) {
        authError.value = 'Missing authentication tokens. Please try again.'
        return
    }

    const result = await handleGoogleCallback(accessToken, refreshToken)

    if (result.success) {
        navigateTo('/dashboard')
    }
})
</script>
