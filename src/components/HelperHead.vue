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
    img: {
      type: String,
      default: 'og-toolkit.jpg'
    }
  },
  computed: {
    head () {
      const { title, description, type, img } = this
      return `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title}</title>
<meta name="description" content="${description}">

<link rel="icon" sizes="192x192" href="https://climatescenarios.org/favicon-192.png">
<link rel="apple-touch-icon" href="https://climatescenarios.org/favicon-192.png">
<link rel="mask-icon" href="https://climatescenarios.org/favicon-svg.png" color="#5263ff">

<meta property="og:type" content="${type}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">

<meta name="og:image" content="https://climatescenarios.org/share/${img}">
<meta name="og:image:width" content="1200">
<meta name="og:image:height" content="630">
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
