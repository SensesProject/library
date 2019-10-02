<template>
  <div class="style">
    <div class="section">
      <div class="mono">Fonts</div>
      <div class="font">
        <h1>Heading 1</h1><code>h1, .h1</code>
      </div>
      <div class="font">
        <h2>Heading 2</h2><code>h2, .h2</code>
      </div>
      <div class="font">
        <h3>Heading 3</h3><code>h3, .h3</code>
      </div>
      <div class="font">
        <p>Climate change and socioeconomic development are deeply intertwined. Social and economic activities are the main driver of climate change. In turn, climate change will have serious impacts on these activities, e.g., by rising sea levels and exposure to severe weather events.</p>
        <code>html, p, .p</code>
      </div>
      <div class="font">
        <p class="serif">Climate change and socioeconomic development are deeply intertwined. Social and economic activities are the main driver of climate change. In turn, climate change will have serious impacts on these activities, e.g., by rising sea levels and exposure to severe weather events.</p>
        <code>p.serif, .p.serif</code>
      </div>
      <div class="font">
        <p class="mono">Climate change and socioeconomic development are deeply intertwined. Social and economic activities are the main driver of climate change. In turn, climate change will have serious impacts on these activities, e.g., by rising sea levels and exposure to severe weather events.</p>
        <code>p.mono, .p.mono</code>
      </div>
      <div class="font">
        <span class="label">Label</span><code>.label, svg text</code>
      </div>
      <div class="font">
        <span class="label uppercase">Uppercase Label</span><code>.label.uppercase, svg text.uppercase</code>
      </div>
    </div>
    <div class="section">
      <div class="mono">Colors</div>
      <ColorTable />
    </div>
    <div class="section">
      <div class="mono">Units</div>
      <div class="unit">
        <div class="square"/>
        <div class="">
          <code>$spacing</code>
          <br>
          <code>2em</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorTable from '@/components/ColorTable.vue'
import style from '@/style/global.scss'
export default {
  name: 'home',
  data () {
    return {
      style
    }
  },
  computed: {
    colors () {
      const { style } = this
      return Object.keys(style).filter(k => k.indexOf('color') === 0).map(key => {
        const dashed = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
        return {
          color: style[key],
          name: `$${dashed}`
        }
      })
    }
  },
  components: { ColorTable }
}
</script>

<style lang="scss" scoped>
@import "../style/variables";
.style {
  width: 100%;
  .section {
    width: 100%;
    border-top: 1px solid $color-green;
    margin-bottom: $spacing;
    padding-top: $spacing / 4;

    .font {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing / 2;

      p {
        max-width: 480px;
      }

    }

    .color {
      display: flex;
      align-items: center;
      .square {
        width: $spacing * 4;
        height: $spacing * 2;
        margin: $spacing / 4 $spacing / 2 $spacing / 4 0;
      }
    }

    .unit {
      display: flex;
      align-items: center;
      .square {
        width: $spacing;
        height: $spacing;
        margin: $spacing / 4 $spacing / 2 $spacing / 4 0;
        border-top: 1px solid $color-black;
        border-left: 1px solid $color-black;
      }
    }

    code {
      font-family: $font-mono;
      font-size: 1rem;
      word-wrap: normal;
      padding: 0 $spacing / 8;
      background: $color-green;
      margin: $spacing / 16 0;
    }

  }
}

</style>
