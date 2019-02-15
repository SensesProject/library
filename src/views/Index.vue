<template>
  <div class="index">
    <p>Here lives the <a href="https://climatescenarios.org">climatescenarios.org</a> styleguide & component library.</p>
    <h2>usage</h2>
    <p>In your project directory run:</p>
    <pre><code>npm i github/SensesProject/library</code></pre>
    <p>Embedd base style:</p>
    <pre><code>@import "library/style/base";</code></pre>
    <p>Import Components individually</p>
    <pre><code>import SensesLogo from 'library/components/SensesLogo.vue'</code></pre>
    <h2>Updating Styles</h2>
    <p>needs to be discussed</p>
    <h2>Adding Components</h2>
    <p>needs to be defined</p>
  </div>
</template>
<style scoped lang="scss">
@import "../style/variables";

.index {
  width: 100%;
  max-width: 800px;
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
}
</style>
