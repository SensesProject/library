<template>
  <div class="typo-table" :class="{ invert }">
    <div class="options">
      <SensesRadio :options="[{label: 'default', value: false}, {label: '.invert', value: true}]" v-model="invert" stretch/>
    </div>
    <table>
      <thead>
        <tr>
          <th>1em</th>
          <th>2em</th>
          <th>4em</th>
          <th>8em</th>
          <th>Name</th>
          <th>Class</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(glyph, i) in glyphs"
          :key="`g-${i}`">
          <td><span :class="[`glyph-${glyph.css}`]"/></td>
          <td><span :class="[`glyph-${glyph.css}`]" :style="{'font-size': '2em'}"/></td>
          <td><span :class="[`glyph-${glyph.css}`]" :style="{'font-size': '4em'}"/></td>
          <td><span :class="[`glyph-${glyph.css}`]" :style="{'font-size': '8em'}"/></td>
          <td>{{ glyph.css }}</td>
          <td class="mono">.glyph-{{ glyph.css }}</td>
          <td>{{ glyph.src.replace(/custom_icons/, 'SENSES') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SensesRadio from '@/components/SensesRadio'
import glyphs from '@/assets/fonts/senses-glyphs.json'
export default {
  components: {
    SensesRadio
  },
  data () {
    return {
      glyphs: glyphs.glyphs,
      invert: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/style/global";

  .typo-table {
    .options {
      display: flex;
      justify-content: space-between;
      .senses-radio {
        width: 200px;
      }
      margin-bottom: $spacing;
    }
    padding: $spacing;
    table {
      width: 100%;

      thead th {
        font-weight: $font-weight-bold;
      }

      thead th {
        padding: 0 $spacing / 6 $spacing / 4;
        border-bottom: 1px solid getColor(gray, 80);
      }

      tbody td {
        border-bottom: 1px solid getColor(gray, 90);
        padding: $spacing / 12 $spacing / 12;
      }
    }
  }
</style>
