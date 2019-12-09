<template>
  <div class="style">
    <div class="section">
      <div class="mono">Typography</div>
      <TypoTable/>
    </div>
    <div class="section">
      <div class="mono">Colors</div>
      <ColorTable/>
    </div>
    <div class="section">
      <div class="mono">Glyphs</div>
      <GlyphsTable/>
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
import ColorTable from '@/components/library/ColorTable.vue'
import TypoTable from '@/components/library/TypoTable.vue'
import GlyphsTable from '@/components/library/GlyphsTable.vue'
import style from '@/style/global.scss'
export default {
  name: 'home',
  components: { ColorTable, TypoTable, GlyphsTable },
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
  }
}
</script>

<style lang="scss" scoped>
@import "../style/variables";
.style {
  width: 100%;
  .section {
    width: 100%;
    overflow: scroll;
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
