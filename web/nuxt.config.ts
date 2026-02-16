// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },
  app: {
    head: {
      title: 'Highlightly — Instant Word Definitions While You Browse',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Highlightly is a fast, privacy-first browser extension that instantly defines any word you highlight on any webpage. Build your personal vocabulary as you browse — no tab-switching required.'
        },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
        { name: 'author', content: 'Arinze Justin' },
        { name: 'keywords', content: 'vocabulary builder, browser extension, word definitions, dictionary extension, Chrome extension, highlight words, learn vocabulary, privacy first extension, Manifest V3, word meaning' },

        // Open Graph
        { property: 'og:title', content: 'Highlightly — Instant Word Definitions While You Browse' },
        { property: 'og:description', content: 'A fast, privacy-first browser extension. Highlight any word on any webpage to get instant definitions, pronunciation and examples. Build your vocabulary as you browse.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://highlightly.app' },
        { property: 'og:site_name', content: 'Highlightly' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Highlightly — Instant Word Definitions While You Browse' },
        { name: 'twitter:description', content: 'Highlight any word, get instant definitions. A privacy-first browser extension for curious readers.' },
        { name: 'twitter:creator', content: '@arinzejustin' },
      ],
      link: [
        { rel: 'canonical', href: 'https://highlightly.app' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap'
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Highlightly',
            applicationCategory: 'BrowserApplication',
            operatingSystem: 'Chrome, Edge, Brave, Arc',
            description: 'A fast, privacy-first browser extension that instantly defines any word you highlight on any webpage. Build your personal vocabulary as you browse.',
            url: 'https://highlightly.app',
            author: {
              '@type': 'Person',
              name: 'Arinze Justin',
              email: 'codewitharinzejustin@gmail.com',
            },
            offers: [
              {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                name: 'Free Plan',
                description: '50 word lookups per 21 days',
              },
              {
                '@type': 'Offer',
                price: '4.00',
                priceCurrency: 'USD',
                name: 'Premium Plan',
                description: 'Unlimited lookups, audio pronunciation, cloud sync',
              },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '1200',
              bestRating: '5',
            },
          }),
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Highlightly',
            url: 'https://highlightly.app',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://highlightly.app/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Highlightly',
            url: 'https://highlightly.app',
            logo: 'https://highlightly.app/logo.png',
            sameAs: [
              'https://github.com/arinzejustin/highlight',
              'https://twitter.com/arinzejustin',
            ],
          }),
        },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
