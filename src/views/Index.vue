<template>
  <div class="index">
    <p>Here lives the <a href="https://climatescenarios.org">climatescenarios.org</a> styleguide & component library.</p>
    <h2>usage</h2>
    <p>In your project directory run to install the current release / latest version:</p>
    <pre><code>npm i github:SensesProject/library#{{ pkg.version }}</code></pre>
    <pre><code>npm i github:SensesProject/library</code></pre>
    <h3>Style</h3>
    <p>Embedd base style:</p>
    <pre><code>@import "library/src/style/base.scss";</code></pre>
    <p>Use variables:</p>
    <pre><code>@import "library/src/style/variables.scss";</code></pre>
    <p>Use mixins:</p>
    <pre><code>@import "library/src/style/mixins.scss";</code></pre>
    <p>Use variables and mixins:</p>
    <pre><code>@import "library/src/style/global.scss";</code></pre>
    <p>It is recommended to import the library’s <code>base.scss</code> into your <code>base.scss</code>. And to import the library’s <code>global.scss</code> into your global scss file that you load into every component.</p>
    <br>
    <p>To use fonts you might have to set the font prefix before importing the base style. The exact path depends on your setup, but might look something like that:</p>
    <pre><code>$font-prefix: "../../node_modules/library/src/assets/fonts";</code></pre>
    <br>
    <pre><code>@import "library/src/style/mixins.scss";</code></pre>
    <p>Example local <code>base.scss</code>:</p>
    <pre>
      <code>@import "library/src/style/base.scss";
@import "./global";</code>
    </pre>
    <p>Example local <code>global.scss</code>:</p>
    <pre>
      <code>@import "library/src/style/global.scss";
@import "./variables";
@import "./mixins";</code>
    </pre>
    <h3>Components</h3>
    <p>Import Components individually</p>
    <pre><code>import SensesLogo from 'library/src/components/SensesLogo.vue'</code></pre>
    <h2>Updating Styles</h2>
    <p>needs to be discussed</p>
    <h2>Adding Components</h2>
    <p>Needs to be updated</p>
    <p>Update version in  <code>/package.json</code></p>
    <p>Commit and tag version</p>
  </div>
</template>
<script>
import pkg from '../../package.json'
export default {
  data () {
    return {
      pkg
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
  h3 {
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
      // color: $color-white;
      word-wrap: normal;
    }
  }

  p code {
    background: rgba($color-green, 0.2);
    font-family: $font-mono;
    // color: $color-white;
    word-wrap: normal;
    padding: 0 $spacing / 8;
  }
}
</style>
