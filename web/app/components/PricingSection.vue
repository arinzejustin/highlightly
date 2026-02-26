<template>
    <section id="pricing" class="relative py-20 bg-white">
        <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-12">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-brand-200 bg-brand-50 text-xs font-medium text-brand-700 tracking-wider uppercase">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    Pricing
                </div>
                <h2 class="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-surface-900 leading-tight">
                    Start free. <span class="text-brand-700">Upgrade anytime.</span>
                </h2>
                <p class="mt-4 text-base text-surface-500">
                    Highlightly is free to use. Upgrade to Premium for unlimited lookups and exclusive features.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <!-- Free -->
                <div
                    class="relative p-7 rounded-2xl border border-surface-200 bg-white hover:shadow-lg hover:shadow-surface-900/5 transition-all duration-300">
                    <div class="mb-5">
                        <h3 class="text-lg font-semibold text-surface-900 mb-2">Free</h3>
                        <div class="flex items-baseline gap-1">
                            <span class="text-4xl font-bold text-surface-900">$0</span>
                            <span class="text-surface-400 text-sm">/ forever</span>
                        </div>
                    </div>
                    <p class="text-sm text-surface-500 mb-7">Perfect for casual readers who want to learn new words
                        while browsing.</p>
                    <ul class="space-y-2.5 mb-7">
                        <li v-for="f in freePlan" :key="f" class="flex items-start gap-2.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04c8ac"
                                stroke-width="2.5" class="shrink-0 mt-0.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span class="text-sm text-surface-600">{{ f }}</span>
                        </li>
                    </ul>
                    <a href="#download" id="pricing-free-cta"
                        class="block w-full text-center px-5 py-3 text-sm font-semibold text-surface-700 border border-surface-200 rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all duration-200">Get
                        Started Free</a>
                </div>

                <!-- Premium -->
                <div
                    class="relative p-7 rounded-2xl border border-brand-200 bg-brand-50/30 shadow-lg shadow-brand-500/5 hover:shadow-brand-500/10 transition-all duration-300">
                    <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span
                            class="px-4 py-1.5 text-xs font-semibold text-white bg-brand-600 rounded-full shadow-sm">Most
                            Popular</span>
                    </div>
                    <div class="mb-5">
                        <h3 class="text-lg font-semibold text-surface-900 mb-2">Premium</h3>
                        <div class="flex items-baseline gap-1">
                            <span class="text-4xl font-bold text-surface-900">$4</span>
                            <span class="text-surface-400 text-sm">/ month</span>
                        </div>
                    </div>
                    <p class="text-sm text-surface-500 mb-7">For avid readers and language learners who want the full
                        experience.</p>
                    <ul class="space-y-2.5 mb-7">
                        <li v-for="f in premiumPlan" :key="f" class="flex items-start gap-2.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04c8ac"
                                stroke-width="2.5" class="shrink-0 mt-0.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span class="text-sm text-surface-600">{{ f }}</span>
                        </li>
                    </ul>
                    <a href="#download" id="pricing-premium-cta"
                        class="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-sm">Start
                        Premium</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const freePlan = ['50 word lookups per 21 days', 'Instant definitions', 'Save words locally', 'Basic vocabulary dashboard', 'All supported browsers']
const premiumPlan = ['Unlimited word lookups', 'Audio pronunciation', 'Usage examples', 'Cloud sync across devices', 'Site disallow list', 'Export vocabulary (CSV, PDF)', 'Priority support']
</script>
