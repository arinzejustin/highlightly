<template>
  <section id="hero" ref="heroRef"
    class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white"
    @mousemove="onMouseMove" @mouseleave="onMouseLeave">

    <!-- Classic Light Background Pattern -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Subtle dot grid -->
      <div class="absolute inset-0 opacity-[0.35]"
        style="background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1px); background-size: 32px 32px;">
      </div>
      <!-- Top-right accent -->
      <div class="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-100/20 blur-3xl">
      </div>
      <!-- Bottom-left accent -->
      <div class="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-50/30 blur-3xl">
      </div>
      <!-- Center gentle wash -->
      <div
        class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-50/15 blur-[100px]">
      </div>
    </div>

    <!-- Mouse Spotlight Glow -->
    <div ref="spotlightRef"
      class="pointer-events-none absolute w-[500px] h-[500px] rounded-full opacity-0 transition-opacity duration-700"
      :class="{ 'opacity-100': isMouseInside }"
      :style="{ left: spotlight.x + 'px', top: spotlight.y + 'px', transform: 'translate(-50%, -50%)' }">
      <div
        class="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(4,200,172,0.08)_0%,rgba(4,200,172,0.03)_35%,transparent_70%)]">
      </div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-brand-200 bg-white shadow-sm animate-fade-in-up"
        style="animation-delay: 0.1s">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
        </span>
        <span class="text-sm font-medium text-surface-600">Now available for Chrome, Edge & Brave</span>
      </div>

      <!-- Headline -->
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-surface-900 animate-fade-in-up"
        style="animation-delay: 0.2s">
        Understand any word,
        <br />
        <span class="relative inline-block mt-1">
          <span class="text-brand-700">instantly.</span>
          <!-- Hand-drawn underline accent -->
          <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
            <path d="M2 8 C50 2, 100 10, 150 5 S250 8, 298 4" stroke="#04c8ac" stroke-width="3" stroke-linecap="round"
              fill="none" opacity="0.4" />
          </svg>
        </span>
      </h1>

      <!-- Subheading -->
      <p class="mt-6 text-lg sm:text-xl text-surface-500 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
        style="animation-delay: 0.35s">
        Highlight any word on any webpage and get instant definitions, pronunciation,
        and examples. Build your personal vocabulary effortlessly.
      </p>

      <!-- CTA Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up"
        style="animation-delay: 0.5s">
        <a href="#download" id="hero-cta-primary"
          class="group inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] font-semibold text-white bg-surface-900 rounded-xl hover:bg-surface-800 transition-all duration-200 shadow-md hover:shadow-lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Add to Browser — Free
        </a>
        <a href="#demo" id="hero-cta-secondary"
          class="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium text-surface-600 border border-surface-200 bg-white rounded-xl hover:bg-surface-50 hover:border-surface-300 transition-all duration-200">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-surface-400">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          See it in action
        </a>
      </div>

      <!-- Stats -->
      <div class="mt-12 flex items-center justify-center gap-8 sm:gap-12 animate-fade-in-up"
        style="animation-delay: 0.65s">
        <div v-for="(stat, i) in stats" :key="stat.label" class="flex items-center gap-3">
          <div v-if="i > 0" class="w-px h-8 bg-surface-200 -ml-4 sm:-ml-6 mr-1 sm:mr-0"></div>
          <div class="text-center">
            <div class="text-xl sm:text-2xl font-bold text-surface-800">{{ stat.value }}</div>
            <div class="text-xs text-surface-400 mt-0.5">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Browser Mockup -->
      <div class="mt-16 relative max-w-4xl mx-auto animate-fade-in-up" style="animation-delay: 0.8s">
        <!-- Shadow under mockup -->
        <div class="absolute -bottom-4 left-8 right-8 h-8 bg-surface-900/5 rounded-[40px] blur-2xl"></div>

        <!-- Browser Window -->
        <div
          class="relative bg-white rounded-2xl border border-surface-200 overflow-hidden shadow-xl shadow-surface-900/5">
          <!-- Browser Chrome -->
          <div class="flex items-center gap-2 px-4 py-2.5 bg-surface-50 border-b border-surface-200">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="flex-1 mx-8">
              <div
                class="bg-white border border-surface-200 rounded-lg px-4 py-1.5 text-xs text-surface-400 flex items-center gap-2 max-w-md mx-auto">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  class="text-surface-400">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                medium.com/the-startup/vocabulary-building
              </div>
            </div>
          </div>

          <!-- Page Content -->
          <div class="p-8 sm:p-10 space-y-3 text-left relative">
            <div class="h-2.5 bg-surface-100 rounded-full w-2/3"></div>
            <div class="h-2.5 bg-surface-100 rounded-full w-full"></div>
            <div class="flex items-center gap-1 flex-wrap">
              <div class="h-2.5 bg-surface-100 rounded-full w-28"></div>
              <div class="h-2.5 bg-surface-100 rounded-full w-16"></div>
              <span
                class="px-1.5 py-0.5 text-sm font-semibold text-brand-800 bg-brand-100 rounded border-b-2 border-brand-400">serendipity</span>
              <div class="h-2.5 bg-surface-100 rounded-full w-20"></div>
              <div class="h-2.5 bg-surface-100 rounded-full w-14"></div>
            </div>
            <div class="h-2.5 bg-surface-100 rounded-full w-5/6"></div>
            <div class="h-2.5 bg-surface-100 rounded-full w-1/2"></div>

            <!-- Floating Definition Card -->
            <div class="absolute top-[50%] left-1/2 -translate-x-1/2 sm:left-[50%] animate-float-card">
              <div class="bg-white rounded-xl border border-surface-200 p-5 w-[280px] shadow-2xl shadow-surface-900/10">
                <div class="absolute -top-2 left-[42%] w-4 h-4 bg-white border-l border-t border-surface-200 rotate-45">
                </div>
                <div class="flex items-start justify-between mb-2.5">
                  <div>
                    <h3 class="text-[15px] font-semibold text-surface-900 capitalize">Serendipity</h3>
                    <p class="text-xs text-surface-400 italic">/ˌserənˈdipədē/</p>
                  </div>
                  <button class="p-1.5 rounded-lg border border-surface-200 text-surface-400 hover:text-surface-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  </button>
                </div>
                <p class="text-sm text-surface-600 leading-relaxed">The occurrence of events by chance in a happy or
                  beneficial way.</p>
                <div class="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
                  <button class="p-1.5 rounded-lg border border-surface-200 text-surface-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    </svg>
                  </button>
                  <button class="p-1.5 rounded-lg border border-brand-200 text-brand-600 bg-brand-50">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"
                      stroke-width="1">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const heroRef = ref<HTMLElement | null>(null)
const spotlightRef = ref<HTMLElement | null>(null)
const isMouseInside = ref(false)

const spotlight = reactive({ x: 0, y: 0 })
const target = reactive({ x: 0, y: 0 })

let animationFrame: number | null = null

const stats = [
  { value: '200+', label: 'Active Users' },
  { value: '2M+', label: 'Words Defined' },
  { value: '4.3★', label: 'Chrome Store' },
]

function onMouseMove(e: MouseEvent) {
  if (!heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  target.x = e.clientX - rect.left
  target.y = e.clientY - rect.top
  isMouseInside.value = true
}

function onMouseLeave() {
  isMouseInside.value = false
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function animate() {
  spotlight.x = lerp(spotlight.x, target.x, 0.08)
  spotlight.y = lerp(spotlight.y, target.y, 0.08)
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  animationFrame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
@keyframes float-card {

  0%,
  100% {
    transform: translateY(0px) translateX(-50%);
  }

  50% {
    transform: translateY(-6px) translateX(-50%);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float-card {
  animation: float-card 5s ease-in-out infinite;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.7s ease-out forwards;
}
</style>
