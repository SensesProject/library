<template>
  <div class="index">
    <p>Here lives the <a href="https://climatescenarios.org">climatescenarios.org</a> styleguide & component library.</p>
    <h2>usage</h2>
    <p>In your project directory run:</p>
    <pre><code>npm i github:SensesProject/library#{{ pkg.version }}</code></pre>
    <p>Embedd base style:</p>
    <pre><code>@import "library/src/style/base.scss";</code></pre>
    <p>Use variables:</p>
    <pre><code>@import "library/src/style/variables.scss";</code></pre>
    <p>Import Components individually</p>
    <pre><code>import SensesLogo from 'library/src/components/SensesLogo.vue'</code></pre>
    <h2>Updating Styles</h2>
    <p>needs to be discussed</p>
    <h2>Adding Components</h2>
    <p>Move component to <code>/src/components/</code></p>
    <p>Create <code>/src/assets/library/[component].js</code>and specify name and options:</p>
    <pre><code>export default {{ spec }}</code></pre>
    <p>Import and export file in <code>/src/assets/library/index.js</code></p>
    <p>Update version in  <code>/package.json</code></p>
    <p>Commit and tag version</p>
  </div>
</template>
<script>
import pkg from '../../package.json'
import spec from '../assets/library/_TestComponent.js'
export default {
  data () {
    return {
      pkg
    }
  },
  computed: {
    spec () {
      return JSON.stringify(spec, null, 2)
    }
  }
}
</script>
<style scoped lang="scss">
@import "../style/variables";

.index {
  width: 100%;
  max-width: 800px;
  margin-bottom: $spacing;
  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    margin: $spacing / 2 0 0;
  }
  pre {
    background: $color-green;
    display: flex;
    padding: $spacing / 4;
    margin: $spacing * 0.125 0 $spacing * 0.25;
    word-wrap: normal;
    overflow: auto;
    code {
      font-family: $font-mono;
      color: $color-white;
      word-wrap: normal;
    }
  }

  p code {
    background: $color-green;
    font-family: $font-mono;
    color: $color-white;
    word-wrap: normal;
    padding: 0 $spacing / 8;
  }
}
</style>
