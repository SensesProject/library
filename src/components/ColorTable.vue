<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Circle</th>
        <th>Model</th>
        <th>Energy</th>
        <th>Semantics</th>
        <th>Tags</th>
        <th></th>
        <th>Variables</th>
        <th>Hex</th>
        <th>RGB</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <transition-group name="rows" tag="tbody">
      <tr
        v-for="color in filteredColors"
        :key="color.title">
        <td @click="toggleID(color.id)" class="clickable"><span v-if="color.type === 'main'" :class="color.klass">{{ open === color.id ? '–' : '+' }}</span></td>
        <td>{{ color.title }}</td>
        <td class="tags"><span class="bck" v-html="color.circle" v-if="color.circle" /></td>
        <td class="tags"><span class="bck" v-html="color.model" v-if="color.model" /></td>
        <td class="tags"><span class="bck" v-html="color.energy" v-if="color.energy" /></td>
        <td class="tags"><span
          class="bck"
          v-for="tag in color.semantics"
          :key="tag"
          v-html="tag" />
        </td>
        <td class="tags"><span
          class="bck"
          v-for="tag in color.tags"
          :key="tag"
          v-html="tag" />
        </td>
        <td><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" :class="color.klass"/></svg></td>
        <td><code v-html="color.code" /></td>
        <td><span :class="[color.klass, 'mono']" ref="hex" /></td>
        <td><span :class="[color.klass, 'mono']" ref="rgb" /></td>
        <td><span :class="[color.klass, 'bck']" v-if="color.area" v-html="'Background'" /></td>
        <td><span :class="[color.klass, 'btn']" v-if="color.area" v-html="'Button'" /></td>
        <td><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" :class="color.klass"/></svg></td>
      </tr>
    </transition-group>
  </table>
</template>

<script>
function componentToHex (c) {
  const hex = parseInt(c, 10).toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

function rgbToHex (rgb) {
  const [, r, g, b] = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export default {
  data () {
    const colors = [
      { id: 'violet', title: '100 Violet', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(violet, 100)', klass: 'color--violet-100', type: 'aside' },
      { id: 'violet', title: '80 Violet', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(violet, 80)', klass: 'color--violet-80', type: 'aside' },
      { id: 'violet', title: '60 Violet', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(violet, 60)', klass: 'color--violet-60', type: 'aside' },
      { id: 'violet', title: 'Accent, Violet', circle: 'Climate Change', model: '', energy: '', semantics: [], tags: ['Transition'], area: true, code: '$color-accent, $color-violet', klass: 'color--accent', type: 'main' },
      { id: 'violet', title: '40 Violet', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(violet, 40)', klass: 'color--violet-40', type: 'aside' },
      { id: 'violet', title: '20 Violet', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(violet, 20)', klass: 'color--violet-20', type: 'aside' },
      { id: 'violet', title: '0 Violet', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(violet, 0)', klass: 'color--violet-0', type: 'aside' },
      { id: 'red', title: '100 Red', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(red, 100)', klass: 'color--red-100', type: 'aside' },
      { id: 'red', title: '80 Red', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(red, 80)', klass: 'color--red-80', type: 'aside' },
      { id: 'red', title: '60 Red', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(red, 60)', klass: 'color--red-60', type: 'aside' },
      { id: 'red', title: 'Red', circle: 'Emissions', model: '', energy: 'Gas', semantics: ['“Bad”'], tags: [], area: true, code: '$color-red', klass: 'color--red', type: 'main' },
      { id: 'red', title: '40 Red', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(red, 40)', klass: 'color--red-40', type: 'aside' },
      { id: 'red', title: '20 Red', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(red, 20)', klass: 'color--red-20', type: 'aside' },
      { id: 'red', title: '0 Red', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(red, 0)', klass: 'color--red-0', type: 'aside' },
      { id: 'orange', title: '100 Orange', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(orange, 100)', klass: 'color--orange-100', type: 'aside' },
      { id: 'orange', title: '80 Orange', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(orange, 80)', klass: 'color--orange-80', type: 'aside' },
      { id: 'orange', title: '60 Orange', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(orange, 60)', klass: 'color--orange-60', type: 'aside' },
      { id: 'orange', title: 'Orange', circle: '', model: '', energy: 'Oil', semantics: [], tags: [], area: true, code: '$color-orange', klass: 'color--orange', type: 'main' },
      { id: 'orange', title: '40 Orange', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(orange, 40)', klass: 'color--orange-40', type: 'aside' },
      { id: 'orange', title: '20 Orange', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(orange, 20)', klass: 'color--orange-20', type: 'aside' },
      { id: 'orange', title: '0 Orange', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(orange, 0)', klass: 'color--orange-0', type: 'aside' },
      { id: 'yellow', title: '100 Yellow', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(yellow, 100)', klass: 'color--yellow-100', type: 'aside' },
      { id: 'yellow', title: '80 Yellow', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(yellow, 80)', klass: 'color--yellow-80', type: 'aside' },
      { id: 'yellow', title: '60 Yellow', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(yellow, 60)', klass: 'color--yellow-60', type: 'aside' },
      { id: 'yellow', title: 'Yellow', circle: 'Energy & Land Use', model: 'Energy', energy: 'Nuclear', semantics: [], tags: ['Electrification'], area: true, code: '$color-yellow', klass: 'color--yellow', type: 'main' },
      { id: 'yellow', title: '40 Yellow', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(yellow, 40)', klass: 'color--yellow-40', type: 'aside' },
      { id: 'yellow', title: '20 Yellow', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(yellow, 20)', klass: 'color--yellow-20', type: 'aside' },
      { id: 'yellow', title: '0 Yellow', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(yellow, 0)', klass: 'color--yellow-0', type: 'aside' },
      { id: 'green', title: '100 Green', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(green, 100)', klass: 'color--green-100', type: 'aside' },
      { id: 'green', title: '80 Green', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(green, 80)', klass: 'color--green-80', type: 'aside' },
      { id: 'green', title: '60 Green', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(green, 60)', klass: 'color--green-60', type: 'aside' },
      { id: 'green', title: 'Green', circle: 'Socioec. Develop.', model: 'Labor', energy: 'Renewables', semantics: ['“Good”'], tags: [], area: true, code: '$color-green', klass: 'color--green', type: 'main' },
      { id: 'green', title: '40 Green', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(green, 40)', klass: 'color--green-40', type: 'aside' },
      { id: 'green', title: '20 Green', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(green, 20)', klass: 'color--green-20', type: 'aside' },
      { id: 'green', title: '0 Green', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(green, 0)', klass: 'color--green-0', type: 'aside' },
      { id: 'blue', title: '100 Blue', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(blue, 100)', klass: 'color--blue-100', type: 'aside' },
      { id: 'blue', title: '80 Blue', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(blue, 80)', klass: 'color--blue-80', type: 'aside' },
      { id: 'blue', title: '60 Blue', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(blue, 60)', klass: 'color--blue-60', type: 'aside' },
      { id: 'blue', title: 'Blue', circle: 'Climate Impacts', model: 'Capital stock', energy: '', semantics: ['Interactive'], tags: ['Mitigation'], area: true, code: '$color-blue', klass: 'color--blue', type: 'main' },
      { id: 'blue', title: '40 Blue', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(blue, 40)', klass: 'color--blue-40', type: 'aside' },
      { id: 'blue', title: '20 Blue', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(blue, 20)', klass: 'color--blue-20', type: 'aside' },
      { id: 'blue', title: '0 Blue', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(blue, 0)', klass: 'color--blue-0', type: 'aside' },
      { id: 'purple', title: '100 Purple', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(purple, 100)', klass: 'color--purple-100', type: 'aside' },
      { id: 'purple', title: '80 Purple', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(purple, 80)', klass: 'color--purple-80', type: 'aside' },
      { id: 'purple', title: '60 Purple', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(purple, 60)', klass: 'color--purple-60', type: 'aside' },
      { id: 'purple', title: 'Purple', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: '$color-purple', klass: 'color--purple', type: 'main' },
      { id: 'purple', title: '40 Purple', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(purple, 40)', klass: 'color--purple-40', type: 'aside' },
      { id: 'purple', title: '20 Purple', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(purple, 20)', klass: 'color--purple-20', type: 'aside' },
      { id: 'purple', title: '0 Purple', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(purple, 0)', klass: 'color--purple-0', type: 'aside' },
      { id: 'neon', title: '100 Neon', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(neon, 100)', klass: 'color--neon-100', type: 'aside' },
      { id: 'neon', title: '80 Neon', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(neon, 80)', klass: 'color--neon-80', type: 'aside' },
      { id: 'neon', title: '60 Neon', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(neon, 60)', klass: 'color--neon-60', type: 'aside' },
      { id: 'neon', title: 'Neon', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: '$color-neon', klass: 'color--neon', type: 'main' },
      { id: 'neon', title: '40 Neon', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(neon, 40)', klass: 'color--neon-40', type: 'aside' },
      { id: 'neon', title: '20 Neon', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(neon, 20)', klass: 'color--neon-20', type: 'aside' },
      { id: 'neon', title: '0 Neon', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(neon, 0)', klass: 'color--neon-0', type: 'aside' },
      { title: 'White', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 100), $color-white', klass: 'color--white' },
      { title: '90% White', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 90)', klass: 'color--gray-90' },
      { title: 'Pale Gray', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 80), $color-pale-gray', klass: 'color--pale-gray' },
      { title: '70% White', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 70)', klass: 'color--gray-70' },
      { title: 'Light Gray', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 60), $color-light-gray', klass: 'color--light-gray' },
      { title: 'Gray', circle: '', model: '', energy: 'Coal', semantics: [], tags: [], area: false, code: 'palette(gray, 50), $color-gray', klass: 'color--gray' },
      { title: 'Dark Gray', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 40), $color-dark-gray', klass: 'color--dark-gray' },
      { title: '30% White', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 30)', klass: 'color--gray-30' },
      { title: 'Deep Gray', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 20), $color-deep-gray', klass: 'color--deep-gray' },
      { title: '10% White', circle: '', model: '', energy: '', semantics: [], tags: [], area: false, code: 'palette(gray, 10)', klass: 'color--gray-10' },
      { title: 'Default, Black', circle: '', model: '', energy: '', semantics: [], tags: [], area: true, code: 'palette(gray, 0), $color-black', klass: 'color--default' }
    ]
    return {
      colors,
      open: false
    }
  },
  computed: {
    filteredColors () {
      const { colors, open } = this
      return colors.filter(color => color.type !== 'aside' || (color.type === 'aside' && open === color.id))
    }
  },
  methods: {
    toggleID: function (id) {
      if (this.open === id) {
        this.open = false
      } else {
        this.open = id
      }
    },
    getColors: function () {
      const { hex } = this.$refs
      for (let i = 0; i < hex.length; i++) {
        const color = window.getComputedStyle(hex[i]).getPropertyValue('color')
        hex[i].innerHTML = rgbToHex(color)
      }

      const { rgb } = this.$refs

      for (let i = 0; i < rgb.length; i++) {
        const color = window.getComputedStyle(rgb[i]).getPropertyValue('color')
        rgb[i].innerHTML = color
      }
    }
  },
  updated: function () {
    this.getColors()
  },
  mounted: function () {
    this.getColors()
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/global";

  table {
    min-width: calc(100% - 2 * #{$spacing});
    margin: $spacing;
    font-size: 0.7rem;

    .rows-item {
      transition: all 1s;
      display: inline-block;
      margin-right: 10px;
    }
    .rows-enter, .rows-leave-to
    /* .rows-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }
    .rows-leave-active {
      position: absolute;
    }

    thead th, tbody td:first-child {
      font-weight: $font-weight-bold;
    }

    thead th {
      padding: 0 $spacing / 6 $spacing / 4;
      border-bottom: 1px solid palette(gray, 80);
    }

    tbody td {
      border-bottom: 1px solid palette(gray, 90);
      padding: $spacing / 6 $spacing / 6;
    }

    .tags span {
      background-color: palette(gray, 90);
    }

    $dot-size: 15px;

    svg {
      width: $dot-size;
    }

    .bck, .btn, .mono {
      line-height: 1;
      white-space: nowrap;
    }
  }

  .bck, .btn {
    border-radius: 2px;
    padding: 2px 4px;
    margin: 2px 4px 2px 0;
    display: inline-block;
  }

  @mixin color-variable($color) {
    & {
      color: $color;
      fill: $color;

      &.bck {
        color: $color-default;
        background-color: rgba($color, 0.2);
      }

      &.btn {
        color: $color-white;
        background-color: $color;
      }
    }
  }

  .color--default { @include color-variable($color-default) }
  .color--accent { @include color-variable($color-accent) }
  .color--violet { @include color-variable($color-violet) }
  .color--purple { @include color-variable($color-purple) }
  .color--neon { @include color-variable($color-neon) }
  .color--red { @include color-variable($color-red) }
  .color--orange { @include color-variable($color-orange) }
  .color--yellow { @include color-variable($color-yellow) }
  .color--green { @include color-variable($color-green) }
  .color--blue { @include color-variable($color-blue) }

  @mixin color-palette($color, $value) {
    & {
      color: palette($color, $value);
      fill: palette($color, $value);

      &.bck {
        color: $color-default;
        background-color: rgba(palette($color, $value), 0.2);
      }

      &.btn {
        color: $color-white;
        background-color: palette($color, $value);
      }
    }
  }

  .color--violet-100 { @include color-palette(violet, 100) }
  .color--violet-80 { @include color-palette(violet, 80) }
  .color--violet-60 { @include color-palette(violet, 60) }
  .color--violet-40 { @include color-palette(violet, 40) }
  .color--violet-20 { @include color-palette(violet, 20) }
  .color--violet-0 { @include color-palette(violet, 0) }

  .color--red-100 { @include color-palette(red, 100) }
  .color--red-80 { @include color-palette(red, 80) }
  .color--red-60 { @include color-palette(red, 60) }
  .color--red-40 { @include color-palette(red, 40) }
  .color--red-20 { @include color-palette(red, 20) }
  .color--red-0 { @include color-palette(red, 0) }

  .color--orange-100 { @include color-palette(orange, 100) }
  .color--orange-80 { @include color-palette(orange, 80) }
  .color--orange-60 { @include color-palette(orange, 60) }
  .color--orange-40 { @include color-palette(orange, 40) }
  .color--orange-20 { @include color-palette(orange, 20) }
  .color--orange-0 { @include color-palette(orange, 0) }

  .color--yellow-100 { @include color-palette(yellow, 100) }
  .color--yellow-80 { @include color-palette(yellow, 80) }
  .color--yellow-60 { @include color-palette(yellow, 60) }
  .color--yellow-40 { @include color-palette(yellow, 40) }
  .color--yellow-20 { @include color-palette(yellow, 20) }
  .color--yellow-0 { @include color-palette(yellow, 0) }

  .color--green-100 { @include color-palette(green, 100) }
  .color--green-80 { @include color-palette(green, 80) }
  .color--green-60 { @include color-palette(green, 60) }
  .color--green-40 { @include color-palette(green, 40) }
  .color--green-20 { @include color-palette(green, 20) }
  .color--green-0 { @include color-palette(green, 0) }

  .color--blue-100 { @include color-palette(blue, 100) }
  .color--blue-80 { @include color-palette(blue, 80) }
  .color--blue-60 { @include color-palette(blue, 60) }
  .color--blue-40 { @include color-palette(blue, 40) }
  .color--blue-20 { @include color-palette(blue, 20) }
  .color--blue-0 { @include color-palette(blue, 0) }

  .color--purple-100 { @include color-palette(purple, 100) }
  .color--purple-80 { @include color-palette(purple, 80) }
  .color--purple-60 { @include color-palette(purple, 60) }
  .color--purple-40 { @include color-palette(purple, 40) }
  .color--purple-20 { @include color-palette(purple, 20) }
  .color--purple-0 { @include color-palette(purple, 0) }

  .color--neon-100 { @include color-palette(neon, 100) }
  .color--neon-80 { @include color-palette(neon, 80) }
  .color--neon-60 { @include color-palette(neon, 60) }
  .color--neon-40 { @include color-palette(neon, 40) }
  .color--neon-20 { @include color-palette(neon, 20) }
  .color--neon-0 { @include color-palette(neon, 0) }

  @mixin color-simple($color) {
    & {
      color: $color;
      fill: $color;
    }
  }

  .color--white { @include color-simple($color-white) }
  .color--gray-90 { @include color-simple(palette(gray, 90)) }
  .color--pale-gray { @include color-simple($color-pale-gray) }
  .color--gray-70 { @include color-simple(palette(gray, 70)) }
  .color--light-gray { @include color-simple($color-light-gray) }
  .color--gray { @include color-simple($color-gray) }
  .color--dark-gray { @include color-simple($color-dark-gray) }
  .color--gray-30 { @include color-simple(palette(gray, 30)) }
  .color--deep-gray { @include color-simple($color-deep-gray) }
  .color--gray-10 { @include color-simple(palette(gray, 10)) }
</style>
