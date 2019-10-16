<template>
  <div class="typo-table" :class="{ invert }">
    <div class="options">
      <SensesRadio :options="[{label: 'default', value: false}, {label: '.invert', value: true}]" v-model="invert" stretch/>
      <SensesRadio :options="[{label: '.sans', value: 'sans'}, {label: '.serif', value: 'serif'}, {label: '.mono', value: 'mono'}]" v-model="font" stretch/>
      <SensesRadio :options="[{label: '.narrow', value: 'narrow'}, {label: '.wide', value: 'wide'}]" v-model="scale" stretch/>
    </div>
    <table>
      <thead>
        <tr>
          <th>CSS</th>
          <th>Size/Line-Height</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(style, i) in styles"
          :key="`s-${i}`">
          <td class="mono">{{ style.css }}</td>
          <td class="mono">{{ style.size }}</td>
          <td :class="[scale, font]"><span :class="style.class">{{ style.example }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SensesRadio from '@/components/SensesRadio'
export default {
  components: {
    SensesRadio
  },
  data () {
    const heading = 'Climate Change Scenarios'
    const paragraph = 'Climate change and socioeconomic development are deeply intertwined. Social and economic activities are the main driver of climate change. In turn, climate change will have serious impacts on these activities, e.g., by rising sea levels and exposure to severe weather events.'
    const styles = [
      { css: 'h1, .h1', size: '2em/1.2', class: 'h1', example: heading },
      { css: 'h2, .h2', size: '1.5em/1.25', class: 'h2', example: heading },
      { css: 'h3, .h3', size: '1em/1.5', class: 'h3', example: heading },
      { css: 'html, p, .p', size: '1em/1.5', class: 'p', example: paragraph },
      { css: 'svg text, table, .tiny', size: '0.8em/1.375', class: 'tiny', example: heading },
      { css: 'a, .a', size: '', class: 'a', example: heading },
      { css: 'a.extern, .a.extern', size: '', class: 'a extern', example: heading },
      { css: '.dotted', size: '', class: 'dotted', example: heading },
      { css: '.highlight', size: '', class: 'highlight', example: heading },
      { css: '.button', size: '', class: 'button', example: heading },
      { css: '.uppercase', size: '', class: 'uppercase', example: heading }
    ]
    return {
      styles,
      invert: false,
      scale: 'narrow',
      font: 'sans'
    }
  },
  computed: {
  },
  methods: {
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
        padding: $spacing / 6 $spacing / 6;

        &:nth-child(3) {
          width: 512px;
        }
      }
    }
  }
</style>
