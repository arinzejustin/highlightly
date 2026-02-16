<template>
  <section id="demo" class="relative py-20 bg-surface-50">
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-brand-200 bg-brand-50 text-xs font-medium text-brand-700 tracking-wider uppercase">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Interactive Demo
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-surface-900 leading-tight">
          Try it <span class="text-brand-700">right now</span>
        </h2>
        <p class="mt-4 text-base text-surface-500">
          Double-click any highlighted word below to see Highlightly in action.
        </p>
      </div>

      <!-- Demo Area -->
      <div class="relative max-w-3xl mx-auto">
        <div class="relative bg-white rounded-2xl border border-surface-200 overflow-hidden shadow-lg shadow-surface-900/5">
          <!-- Tab bar -->
          <div class="flex items-center gap-2 px-5 py-2.5 bg-surface-50 border-b border-surface-200">
            <div class="flex gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-surface-300"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-surface-300"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-surface-300"></div>
            </div>
            <div class="flex-1 text-center text-xs text-surface-400">Interactive Demo</div>
          </div>

          <!-- Content -->
          <div class="p-8 sm:p-10 relative select-text" ref="demoContainer">
            <p class="text-[17px] leading-loose text-surface-600">
              The art of reading is both a
              <span class="demo-word" :class="{ active: activeWord === 'pragmatic' }" @dblclick="showDefinition('pragmatic', $event)">pragmatic</span>
              and deeply personal endeavor. Every great novel is an exercise in
              <span class="demo-word" :class="{ active: activeWord === 'empathy' }" @dblclick="showDefinition('empathy', $event)">empathy</span>, allowing us to experience lives vastly different from our own. The
              <span class="demo-word" :class="{ active: activeWord === 'ephemeral' }" @dblclick="showDefinition('ephemeral', $event)">ephemeral</span>
              nature of our attention makes it all the more important to be
              <span class="demo-word" :class="{ active: activeWord === 'deliberate' }" @dblclick="showDefinition('deliberate', $event)">deliberate</span>
              about what we consume. A truly
              <span class="demo-word" :class="{ active: activeWord === 'voracious' }" @dblclick="showDefinition('voracious', $event)">voracious</span>
              reader develops an
              <span class="demo-word" :class="{ active: activeWord === 'intuitive' }" @dblclick="showDefinition('intuitive', $event)">intuitive</span>
              sense for language that transcends mere vocabulary.
            </p>

            <div class="mt-5 flex items-center gap-2 text-xs text-surface-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-brand-500"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg>
              Double-click any highlighted word
            </div>

            <!-- Popup -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-1"
            >
              <div
                v-if="showPopup && activeWord"
                class="absolute z-50"
                :style="{ top: popupPosition.y + 'px', left: popupPosition.x + 'px' }"
              >
                <div class="relative">
                  <div class="bg-white rounded-xl border border-surface-200 p-5 w-72 shadow-2xl shadow-surface-900/10">
                    <div class="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-surface-200 rotate-45"></div>
                    <button @click="closePopup" class="absolute top-3 right-3 p-1 rounded-full border border-surface-200 text-surface-400 hover:text-surface-700 hover:bg-surface-50 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                    <div class="mb-2.5">
                      <h3 class="text-[15px] font-semibold text-surface-900 capitalize">{{ activeWord }}</h3>
                      <p class="text-xs text-surface-400 italic">{{ definitions[activeWord]?.phonetic }}</p>
                    </div>
                    <div v-if="isLoadingDef" class="flex items-center gap-2 py-2">
                      <div class="w-4 h-4 border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin"></div>
                      <span class="text-sm text-surface-500">Looking up <strong class="text-brand-600 uppercase">{{ activeWord }}</strong>...</span>
                    </div>
                    <p v-else class="text-sm text-surface-600 leading-relaxed">{{ definitions[activeWord]?.meaning }}</p>
                    <div v-if="!isLoadingDef" class="flex items-center justify-between mt-3 pt-3 border-t border-surface-100">
                      <button class="p-1.5 rounded-lg border border-surface-200 text-surface-400 hover:text-surface-600 transition-colors" title="Pronunciation">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                      </button>
                      <button
                        class="p-1.5 rounded-lg border transition-all duration-200"
                        :class="savedWords.has(activeWord) ? 'border-brand-200 text-brand-600 bg-brand-50' : 'border-surface-200 text-surface-400 hover:text-brand-600 hover:border-brand-200'"
                        @click="toggleSave"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" :fill="savedWords.has(activeWord) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeWord = ref<string | null>(null)
const showPopup = ref(false)
const isLoadingDef = ref(false)
const savedWords = ref(new Set<string>())
const popupPosition = ref({ x: 0, y: 0 })
const demoContainer = ref<HTMLElement | null>(null)

const definitions: Record<string, { meaning: string; phonetic: string }> = {
  pragmatic: { meaning: 'Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.', phonetic: '/præɡˈmætɪk/' },
  empathy: { meaning: 'The ability to understand and share the feelings of another person.', phonetic: '/ˈempəθi/' },
  ephemeral: { meaning: 'Lasting for a very short time; transient and fleeting.', phonetic: '/ɪˈfemərəl/' },
  deliberate: { meaning: 'Done consciously and intentionally; careful and unhurried.', phonetic: '/dɪˈlɪbərət/' },
  voracious: { meaning: 'Wanting or devouring great quantities of something; having a very eager approach.', phonetic: '/vəˈreɪʃəs/' },
  intuitive: { meaning: 'Using or based on what one feels to be true even without conscious reasoning; instinctive.', phonetic: '/ɪnˈtjuːɪtɪv/' },
}

function showDefinition(word: string, event: MouseEvent) {
  const target = event.target as HTMLElement
  const containerRect = demoContainer.value?.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  if (!containerRect) return
  const x = targetRect.left - containerRect.left
  const y = targetRect.bottom - containerRect.top + 12
  popupPosition.value = { x: Math.max(0, Math.min(x, containerRect.width - 300)), y }
  activeWord.value = word
  isLoadingDef.value = true
  showPopup.value = true
  setTimeout(() => { isLoadingDef.value = false }, 500)
}

function closePopup() {
  showPopup.value = false
  setTimeout(() => { activeWord.value = null }, 200)
}

function toggleSave() {
  if (!activeWord.value) return
  if (savedWords.value.has(activeWord.value)) {
    savedWords.value.delete(activeWord.value)
  } else {
    savedWords.value.add(activeWord.value)
  }
  savedWords.value = new Set(savedWords.value)
}
</script>

<style scoped>
.demo-word {
  position: relative;
  cursor: pointer;
  color: #0d544c;
  font-weight: 600;
  padding: 1px 4px;
  border-radius: 4px;
  background: rgba(4, 200, 172, 0.08);
  border-bottom: 2px solid rgba(4, 200, 172, 0.3);
  transition: all 0.2s ease;
}
.demo-word:hover {
  background: rgba(4, 200, 172, 0.14);
  border-bottom-color: rgba(4, 200, 172, 0.6);
}
.demo-word.active {
  background: rgba(4, 200, 172, 0.18);
  border-bottom-color: #04c8ac;
}
</style>
