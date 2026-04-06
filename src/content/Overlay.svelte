<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { addWord, addRequestedWord } from "$lib/utils/wordDB";
  import { fetchMeaning } from "$lib/utils/api";
  import { authStore } from "$lib/stores/auth";
  import { recordsStore } from "$lib/stores/records";
  import { retriveId } from "$lib/utils/Device";
  import { Loader, Bookmark, Volume2, ChevronDown, X } from "@lucide/svelte";
  import "./content-style.css";

  interface Props {
    word: string;
    x: number;
    y: number;
    arrowX?: number;
    placement?: "top" | "bottom";
    isVisible?: boolean;
    onClose: () => void;
  }

  let { word, x, y, arrowX, placement, isVisible, onClose }: Props = $props();
  let meaning = $state<string | null>(null);
  let phonetics = $state<string | null>(null);
  let audioUrl = $state<string | null>(null);
  let examples = $state<string[]>([]);
  let isLoading = $state(true);
  let error = $state<string | null>(null);
  let isSaving = $state(false);
  let saved = $state(false);
  let showExamples = $state(false);
  let errorBookMark = $state<string | null>(null);

  const authToken = $derived($authStore.authToken);

  let isMounted = true;
  let closeTimeoutId: ReturnType<typeof setTimeout> | null = null;

  onMount(async () => {
    try {
      if (!isMounted) return;

      const deviceId = await retriveId();
      const result = await fetchMeaning(word, authToken, deviceId);

      if (typeof result === "string") {
        error = result;
        return;
      }

      if (result.error) {
        recordsStore.incrementFailure();
        error =
          result.errorType === "not_found"
            ? "Meaning not found"
            : result.errorType === "exceed_limit"
              ? "Usage limit exceeded"
              : "Failed to fetch meaning";
      } else {
        meaning = result.meaning;
        phonetics = result.phonetics || null;
        audioUrl = result.audioUrl || null;
        examples = result.examples || [];
        recordsStore.incrementSuccess();
      }
    } catch {
      if (isMounted) error = "Failed to fetch meaning";
    } finally {
      if (isMounted) isLoading = false;
      addRequestedWord(word, error ? "failed" : "success");
    }
  });

  onDestroy(() => {
    isMounted = false;
    if (closeTimeoutId) clearTimeout(closeTimeoutId);
  });

  async function handleSave() {
    if (!meaning || isSaving || saved) return;

    let timeOut: ReturnType<typeof setTimeout> | null = null;

    isSaving = true;
    try {
      await addWord({
        word,
        meaning,
        url: window.location.href,
        createdAt: Date.now(),
        synced: false,
      });
      saved = true;
      closeTimeoutId = setTimeout(onClose, 1200);
    } catch {
      errorBookMark = "Failed to save word";
    } finally {
      isSaving = false;
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        errorBookMark = null;
      }, 2000);
    }
  }

  function playAudio() {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }
</script>

<div
  class="overlay-popup"
  style="left:{x}px; top:{y}px; overflow-y: auto;"
  class:hidden={!isVisible}
>
  <div class="overlay-content">
    <button class="overlay-close" onclick={onClose} aria-label="Close">
      <X />
    </button>

    <div class="overlay-header">
      <div class="overlay-word-section">
        <div class="overlay-word">{word}</div>
        {#if phonetics && !error && !isLoading}
          <div class="overlay-phonetics">{phonetics}</div>
        {/if}
      </div>
    </div>

    {#if isLoading}
      <div class="overlay-loading">
        <Loader class="spinner svelte-1nbeieh" style="margin-right: 4px;" />
        <span class=""
          >Looking up for <b
            ><p
              style="text-transform: uppercase; font-weight: 700; padding: 0 1px; display: inline-flex; color:var(--highlight-extension-highlighted)"
            >
              {word}
            </p></b
          > meaning</span
        >
      </div>
    {:else if error}
      <div class="overlay-error">{error}</div>
    {:else}
      <div class="overlay-meaning">{meaning}</div>

      {#if errorBookMark}
        <div class="overlay-error errorBookmark">{errorBookMark}</div>
      {/if}

      {#if examples.length > 0}
        <button
          class="overlay-examples-toggle"
          onclick={() => (showExamples = !showExamples)}
        >
          <span>Examples</span>
          <ChevronDown class="chevron {showExamples ? 'expanded' : ''}" />
        </button>

        {#if showExamples}
          <div class="overlay-examples">
            {#each examples as example}
              <div class="overlay-example">• {example}</div>
            {/each}
          </div>
        {/if}
      {/if}

      <div class="overlay-actions">
        {#if audioUrl && audioUrl !== "free_user"}
          <button
            class="overlay-action-btn audio-btn"
            onclick={playAudio}
            aria-label="Play word pronunciation"
            title="Play word pronunciation"
          >
            <Volume2 />
          </button>
        {:else}
          <button
            class="overlay-action-btn audio-btn"
            disabled
            aria-label="Subscribe to play pronunciation"
            title="Subscribe to play pronunciation"
          >
            <Volume2 />
          </button>
        {/if}

        <button
          class="overlay-action-btn bookmark-btn"
          class:saved
          disabled={saved || isSaving}
          onclick={handleSave}
          aria-label={saved ? "Saved" : "Save word"}
        >
          {#if isSaving}
            <Loader class="spinner svelte-1nbeieh" />
          {:else}
            <Bookmark class={saved ? "filled" : ""} />
          {/if}
        </button>
      </div>
    {/if}
    <div class="arrow {placement}" style="left: {arrowX}%"></div>
  </div>
</div>
<p style="display: none" class="spinner">hidden</p>

<style>
  :root {
    --highlight-extension-radius: 12px;
    --highlight-extension-highlighted: rgb(0, 206, 206);
    --highlight-extension-card: oklch(1 0 0 / 96%);
    --highlight-extension-border: oklch(0.922 0 0);
    --highlight-extension-hover: oklch(0.97 0 0);
    --highlight-extension-foreground: oklch(0.145 0 0);
    --highlight-extension-muted: oklch(0.97 0 0);
    --highlight-extension-primary: oklch(0.205 0 0);
    --highlight-extension-success: #10b981;
    --highlight-extension-error: oklch(0.577 0.245 27.325);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --highlight-extension-card: oklch(0.205 0 0 / 96%);
      --highlight-extension-border: oklch(1 0 0 / 10%);
      --highlight-extension-hover: oklch(0.269 0 0);
      --highlight-extension-foreground: oklch(0.985 0 0);
      --highlight-extension-muted: oklch(0.269 0 0);
      --highlight-extension-primary: oklch(0.922 0 0);
      --highlight-extension-success: #34d399;
      --highlight-extension-error: oklch(0.704 0.191 22.216);
    }
  }

  .overlay-popup {
    position: absolute;
    z-index: 2147483647;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
    pointer-events: auto;
    will-change: transform, opacity;
    transition:
      opacity 0.2s ease,
      transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      left 0.1s linear,
      top 0.1s linear;
    transform: scale(1);
    animation: highlightExtensionSlideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .overlay-popup.hidden {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.95);
  }

  @keyframes highlightExtensionSlideIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .overlay-content {
    background: var(--highlight-extension-card);
    border-radius: var(--highlight-extension-radius);
    padding: 20px;
    min-width: 320px;
    max-width: 400px;
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    position: relative;
    border: 1px solid var(--highlight-extension-border);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(8px);
  }

  .overlay-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: calc(999 * 1px);
    padding: 6px;
    color: var(--highlight-extension-primary);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--highlight-extension-border);
  }

  .overlay-close:hover {
    background: var(--highlight-extension-hover);
    color: var(--highlight-extension-foreground);
  }

  .overlay-header {
    margin-bottom: 16px;
    padding-right: 32px;
  }

  .overlay-word-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-transform: capitalize;
  }

  .overlay-word {
    font-size: 20px;
    font-weight: 600;
    color: var(--highlight-extension-foreground);
    line-height: 1.2;
  }

  .overlay-phonetics {
    font-size: 14px;
    color: var(--highlight-extension-primary);
    font-style: italic;
  }

  .overlay-loading {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: var(--highlight-extension-foreground);
    padding: 12px 0;
  }

  .spinner {
    width: 25px;
    height: 25px;
    color: var(--highlight-extension-foreground);
    animation: highlightExtensionSpin 0.8s linear infinite;
    will-change: transform;
  }

  @keyframes highlightExtensionSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .overlay-error {
    color: var(--highlight-extension-error);
    font-size: 14px;
    padding: 12px 0;
  }

  .errorBookmark {
    text-align: center;
    padding-top: 6px;
  }

  .overlay-meaning {
    font-size: 15px;
    line-height: 1.6;
    color: var(--highlight-extension-foreground);
    margin-bottom: 16px;
  }

  .overlay-examples-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px 12px;
    background: var(--highlight-extension-hover);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: var(--highlight-extension-foreground);
    margin-bottom: 8px;
    transition: background 0.2s ease;
  }

  .overlay-examples-toggle:hover {
    background: var(--highlight-extension-border);
  }

  .chevron {
    width: 16px;
    height: 16px;
    color: var(--highlight-extension-foreground);
    transition: transform 0.2s ease;
  }

  .chevron.expanded {
    transform: rotate(180deg);
  }

  .overlay-examples {
    margin-bottom: 16px;
    padding: 12px;
    background: var(--highlight-extension-hover);
    border-radius: 6px;
    animation: expandIn 0.2s ease-out;
  }

  @keyframes expandIn {
    from {
      opacity: 0;
      max-height: 0;
    }
    to {
      opacity: 1;
      max-height: 500px;
    }
  }

  .overlay-example {
    font-size: 14px;
    line-height: 1.5;
    color: var(--highlight-extension-primary);
    padding: 4px 0;
  }

  .overlay-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 8px;
    border-top: 1px solid var(--highlight-extension-border);
  }

  .overlay-action-btn {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid var(--highlight-extension-border);
    cursor: pointer;
    background: transparent;
    color: var(--highlight-extension-primary);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay-action-btn:hover:not(:disabled) {
    background: var(--highlight-extension-hover);
    color: var(--highlight-extension-foreground);
  }

  .audio-btn:hover:not(:disabled) {
    color: var(--highlight-extension-primary);
  }

  .audio-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    color: var(--highlight-extension-error);
  }

  .bookmark-btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .bookmark-btn.saved {
    color: var(--highlight-extension-success);
  }

  .bookmark-btn.saved:hover {
    color: var(--highlight-extension-success);
  }

  .filled {
    fill: currentColor;
  }

  .arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--highlight-extension-card);
    transform: translateX(-50%) rotate(45deg);
    border: 1px solid var(--highlight-extension-border);
  }
  .arrow.top {
    bottom: -6px;
    border-top: none;
    border-left: none;
  }

  .arrow.bottom {
    top: -6px;
    border-bottom: none;
    border-right: none;
  }
</style>
