<template>
  <div class="index">
    <h1>SENSES Library</h1>
    <p>The foundation of every SENSES module. Also known as living style guide and component library.</p>
    <h2>Using the Library</h2>
    <h3>Installation</h3>
    <p>In your project directory run:</p>
    <pre><code>npm i github:SensesProject/library</code></pre>
    <h3>Use Styles</h3>
    <p>Import base style – You generally want to do that once at the root of your app</p>
    <pre><code>@import "library/src/style/base.scss";</code></pre>
    <p>Import variables and mixins – You generally want to import them wherever you need them, likely in all your components</p>
    <pre><code>@import "library/src/style/global.scss";</code></pre>

    <p>If you run into issues with font imports you might need to explicitly set the path to the font files before importing the base style</p>
    <pre><code>$font-prefix: "../../node_modules/library/src/assets/fonts";</code></pre>

    <h3>Components</h3>
    <p>Import Components individually wherever you need them, e.g.</p>
    <pre><code>import SensesMenu from 'library/src/components/SensesMenu.vue'</code></pre>

    <h2>Guides</h2>
    <h3>Colors</h3>
    <p>Colors generally follow this naming convention <code>$color-red</code>. You can acces different shades of said color like <code>getColor(red, 20)</code>. Refer to <router-link to="style">/style</router-link> for available colors and shades</p>
    <h3>Tinting elements</h3>
    <p>`global.scss` provides a mixin to tint css attributes based on class names, particularly useful for visualisations. Use it like this:</p>
    <pre><code>@include tint(stroke, 50)</code></pre>
    <p>And it will be translated into this:</p>
    <pre>
<code>&.violet {
  stroke: getColor(violet, 50);
}
&.red {
  stroke: getColor(red, 50);
}
&.orange {
  stroke: getColor(orange, 50);
},
…
</code>
    </pre>
    <h3>Glyphs</h3>
    <p>You can easily use glyphs like this <code>&lt;span class="glyph-toolkit"/&gt;</code> which wll be displayed as <span class="glyph-toolkit"/>. Refer to <router-link to="style">/style</router-link> for available glyphs and class names</p>

    <h3>Meta tags</h3>
    <p>You can <router-link to="components/HelperHead">use this helper component</router-link> to create meta tags for your module, which you then can copy and paste</p>
    <h3>Meta tags for Nuxt.js projects</h3>
    <p>Add this to your <code>nuxt.config.js</code></p>
    <pre>
<code>const { getHead } = require('library/src/assets/js/head.js')
…
head: getHead({
  title: 'Senses Toolkit',
  description: 'The Senses Toolkit offers a wide range of modules to help you understand and communicate climate change scenarios'
})</code>
    </pre>
    <p>You can pass a object to the <code>getHead</code> function to overwrite the default settings</p>
    <pre>
<code>{
  title: 'Senses Project',
  description: 'The Senses Project make climate change scenarios more understandable through visualisation',
  type: 'website',
  card: 'summary'
}</code>
    </pre>
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
  h1 {
    font-size: 5rem;
    text-transform: uppercase;
    margin: $spacing / 2 0 $spacing / 4;
  }
  h2 {
    font-size: 1.5rem;
    margin: $spacing 0 0;
  }
  h3 {
    margin: $spacing / 2 0 0;
  }
  pre {
    background: $color-neon;
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
    background: getColor(gray, 90);
    font-family: $font-mono;
    color: getColor(neon, 20);
    word-wrap: normal;
    padding: 0 $spacing / 8;
  }
}
</style>
