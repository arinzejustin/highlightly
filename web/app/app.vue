<template>
  <div class="min-h-screen bg-white text-surface-900 font-sans antialiased overflow-x-hidden">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
  background-color: #ffffff;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: rgba(4, 200, 172, 0.2);
  color: #0d544c;
}
</style>
