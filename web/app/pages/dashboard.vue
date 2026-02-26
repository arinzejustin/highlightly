<template>
    <div class="min-h-screen bg-surface-50">
        <!-- Top Nav -->
        <nav class="bg-white border-b border-surface-200">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <NuxtLink to="/" class="flex items-center gap-2.5">
                        <div class="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center shadow-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-white">
                                <path d="M9 11L12 2L15 11H9Z" fill="currentColor" opacity="0.7" />
                                <path d="M5 13H19L18 17H6L5 13Z" fill="currentColor" />
                                <path d="M7 19H17L16.5 21H7.5L7 19Z" fill="currentColor" opacity="0.8" />
                            </svg>
                        </div>
                        <span class="text-lg font-bold tracking-tight">
                            <span class="text-surface-900">Highlight</span><span class="text-brand-600">ly</span>
                        </span>
                    </NuxtLink>

                    <div class="flex items-center gap-4">
                        <span class="text-sm text-surface-500">{{ user?.email }}</span>
                        <button @click="handleLogout"
                            class="px-4 py-2 text-sm font-medium text-surface-600 border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all">
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <!-- Welcome Header -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-surface-900 mb-1">Welcome back, {{ user?.username || 'there' }}
                </h1>
                <p class="text-sm text-surface-500">Manage your account, vocabulary, and subscription.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main Content -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Stats Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="bg-white rounded-2xl border border-surface-200 p-5">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center border border-brand-200">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#04c8ac"
                                        stroke-width="2">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-surface-900">{{ words.length }}</p>
                                    <p class="text-xs text-surface-400">Saved Words</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-2xl border border-surface-200 p-5">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-200">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669"
                                        stroke-width="2">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-surface-900 capitalize">{{ user?.plan || 'free'
                                        }}</p>
                                    <p class="text-xs text-surface-400">Current Plan</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-2xl border border-surface-200 p-5">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center border border-violet-200">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed"
                                        stroke-width="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-surface-900">{{ memberSince }}</p>
                                    <p class="text-xs text-surface-400">Member Since</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Saved Words -->
                    <div class="bg-white rounded-2xl border border-surface-200">
                        <div class="flex items-center justify-between p-5 border-b border-surface-100">
                            <h2 class="text-lg font-semibold text-surface-900">Saved Words</h2>
                            <div class="relative">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3"
                                    stroke-width="2"
                                    class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input v-model="searchQuery" type="text" placeholder="Search words..."
                                    class="pl-9 pr-4 py-2 text-sm rounded-xl border border-surface-200 bg-surface-50 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 w-56" />
                            </div>
                        </div>

                        <div v-if="filteredWords.length > 0" class="divide-y divide-surface-100">
                            <div v-for="word in filteredWords" :key="word.id"
                                class="flex items-center justify-between p-5 hover:bg-surface-50 transition-colors">
                                <div>
                                    <h3 class="text-sm font-semibold text-surface-900 capitalize">{{ word.word }}</h3>
                                    <p class="text-xs text-surface-500 mt-0.5 line-clamp-1 max-w-md">{{ word.meaning
                                        }}</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-xs text-surface-400">{{ formatDate(word.createdAt) }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-else class="p-12 text-center">
                            <div
                                class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-surface-100 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3"
                                    stroke-width="2">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <p class="text-sm font-medium text-surface-600 mb-1">No saved words yet</p>
                            <p class="text-xs text-surface-400">Words you save with the extension will appear here.</p>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Plan Card -->
                    <div class="bg-white rounded-2xl border border-surface-200 p-5">
                        <h3 class="text-sm font-semibold text-surface-900 mb-4">Your Plan</h3>

                        <div v-if="user?.plan === 'premium'"
                            class="p-4 rounded-xl bg-brand-50 border border-brand-200 mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#04c8ac" stroke="#04c8ac"
                                    stroke-width="1">
                                    <polygon
                                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                <span class="text-sm font-semibold text-brand-800">Premium Active</span>
                            </div>
                            <p class="text-xs text-brand-600">Unlimited lookups, audio, cloud sync, and more.</p>
                        </div>

                        <div v-else class="space-y-4">
                            <div class="p-4 rounded-xl bg-surface-50 border border-surface-200">
                                <p class="text-sm font-medium text-surface-900 mb-1">Free Plan</p>
                                <p class="text-xs text-surface-500">50 lookups per 21 days</p>
                            </div>

                            <div class="p-4 rounded-xl border-2 border-brand-200 bg-brand-50/30">
                                <div class="flex items-baseline gap-1 mb-1">
                                    <span class="text-2xl font-bold text-surface-900">$4</span>
                                    <span class="text-surface-400 text-xs">/month</span>
                                </div>
                                <p class="text-xs text-surface-500 mb-3">Unlimited lookups, audio, cloud sync.</p>
                                <ul class="space-y-1.5 mb-4">
                                    <li v-for="feature in premiumFeatures" :key="feature"
                                        class="flex items-center gap-2 text-xs text-surface-600">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#04c8ac"
                                            stroke-width="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {{ feature }}
                                    </li>
                                </ul>
                                <button @click="handleUpgrade" :disabled="isUpgrading"
                                    class="w-full py-2.5 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    <div v-if="isUpgrading"
                                        class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin">
                                    </div>
                                    {{ isUpgrading ? 'Processing...' : 'Upgrade to Premium' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Success -->
                    <div v-if="paymentSuccess"
                        class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669"
                            stroke-width="2.5" stroke-linecap="round" class="mx-auto mb-2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <p class="text-sm font-medium text-emerald-800 mb-1">Payment Successful!</p>
                        <p class="text-xs text-emerald-600">Your account has been upgraded to Premium.</p>
                    </div>

                    <!-- Account Info -->
                    <div class="bg-white rounded-2xl border border-surface-200 p-5">
                        <h3 class="text-sm font-semibold text-surface-900 mb-4">Account</h3>
                        <div class="space-y-3">
                            <div>
                                <p class="text-xs text-surface-400 mb-0.5">Email</p>
                                <p class="text-sm text-surface-700">{{ user?.email || '—' }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-surface-400 mb-0.5">Username</p>
                                <p class="text-sm text-surface-700">{{ user?.username || '—' }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-surface-400 mb-0.5">Status</p>
                                <span
                                    class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full"
                                    :class="user?.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-surface-100 text-surface-500'">
                                    <span class="w-1.5 h-1.5 rounded-full"
                                        :class="user?.status === 'active' ? 'bg-emerald-500' : 'bg-surface-400'"></span>
                                    {{ user?.status || 'active' }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="bg-white rounded-2xl border border-surface-200 p-5">
                        <h3 class="text-sm font-semibold text-surface-900 mb-4">Quick Links</h3>
                        <div class="space-y-2">
                            <a href="https://chrome.google.com/webstore" target="_blank"
                                class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors group">
                                <div
                                    class="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center group-hover:bg-surface-200 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#525252"
                                        stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </div>
                                <span class="text-sm text-surface-600 group-hover:text-surface-900">Install Extension</span>
                            </a>
                            <NuxtLink to="/"
                                class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors group">
                                <div
                                    class="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center group-hover:bg-surface-200 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#525252"
                                        stroke-width="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    </svg>
                                </div>
                                <span class="text-sm text-surface-600 group-hover:text-surface-900">Back to Homepage</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
    title: 'Dashboard — Highlightly',
    meta: [
        { name: 'description', content: 'Manage your Highlightly vocabulary, subscription, and account settings.' },
        { name: 'robots', content: 'noindex, nofollow' },
    ],
})

const router = useRouter()
const route = useRoute()
const { authState, initAuth, logout, fetchUser, initializePayment, verifyPayment, API_BASE_URL } = useAuth()

const user = computed(() => authState.value.user)
const words = ref<Array<{ id: string; word: string; meaning: string; createdAt: number }>>([])
const searchQuery = ref('')
const isUpgrading = ref(false)
const paymentSuccess = ref(false)

const premiumFeatures = [
    'Unlimited word lookups',
    'Audio pronunciation',
    'Cloud sync across devices',
    'Export vocabulary (CSV, PDF)',
    'Priority support',
]

const filteredWords = computed(() => {
    if (!searchQuery.value) return words.value
    const q = searchQuery.value.toLowerCase()
    return words.value.filter(w => w.word.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q))
})

const memberSince = computed(() => {
    if (!user.value?.createdAt) return '—'
    const d = new Date(user.value.createdAt)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
})

function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

async function loadWords() {
    if (!authState.value.token || !authState.value.userId) return

    try {
        const res = await $fetch<{ words: any[] }>(`${API_BASE_URL}/api/words/${authState.value.userId}`, {
            headers: { Authorization: `Bearer ${authState.value.token}` },
        })
        words.value = res.words || []
    } catch {
        words.value = []
    }
}

async function handleUpgrade() {
    isUpgrading.value = true
    try {
        const data = await initializePayment('premium')
        if (data?.authorization_url) {
            window.location.href = data.authorization_url
        }
    } finally {
        isUpgrading.value = false
    }
}

function handleLogout() {
    logout()
    router.push('/auth/login')
}

onMounted(async () => {
    initAuth()

    // Check if not authenticated, redirect to login
    // if (!authState.value.isAuthenticated) {
    //     router.push('/auth/login')
    //     return
    // }

    // Check for payment success callback
    const paymentParam = route.query.payment
    const reference = route.query.reference || route.query.trxref

    if (paymentParam === 'success' && reference) {
        const result = await verifyPayment(reference as string)
        if (result?.success) {
            paymentSuccess.value = true
            await fetchUser()
        }
    }

    await fetchUser()
    await loadWords()
})
</script>
