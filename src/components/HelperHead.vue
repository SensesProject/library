<template>
  <pre class="helper-head tiny">{{ head }}</pre>
</template>

<script>
export default {
  name: 'HelperHead',
  props: {
    title: {
      type: String,
      default: 'Senses Project'
    },
    description: {
      type: String,
      default: 'The Senses Project make climate change scenarios more understandable through visualisation'
    },
    type: {
      type: String,
      default: 'website'
    },
    card: {
      type: String,
      default: 'summary'
    }
  },
  computed: {
    head () {
      const { title, description, type, card } = this
      return `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title}</title>
<meta name="description" content="${description}">

<link rel="icon" sizes="192x192" href="https://dev.climatescenarios.org/favicon-192.png">
<link rel="apple-touch-icon" href="https://dev.climatescenarios.org/favicon-192.png">
<link rel="mask-icon" href="https://dev.climatescenarios.org/favicon-svg.png" color="#5263ff">

<meta property="og:type" content="${type}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<meta name="twitter:card" content="${card}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
`.trim()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";
.helper-head {
  padding: $spacing;
  background: getColor(neon, 100);
  overflow: auto;
  color: getColor(neon, 20);
}
</style>
