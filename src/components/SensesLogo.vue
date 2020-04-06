<template>
  <component :is="rootElement" v-bind="rootAttributes" class="senses-logo no-underline" :class="[color, {hover: !noHover, animate, invalid }]">
    <div class="circles" :style="{width: `${circlesWidth}em`, left: `${circlesOffset}em`, transform: `translateX(${-circlesOffset}em)`}">
      <div class="circle circle-s" :style="{transform: sTransform}"/>
      <div class="circle circle-m" :style="{transform: mTransform}"/>
      <div class="circle circle-l" :style="{transform: lTransform}"/>
    </div>
    <h1 class="sans">SENSES {{project}}</h1>
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'SensesLogo',
  props: {
    project: {
      type: String,
      default: null
    },
    rootElement: {
      type: String,
      default: 'a'
    },
    rootAttributes: {
      type: Object,
      default () {
        return {
          href: 'https://climatescenarios.org'
        }
      }
    },
    color: {
      type: String,
      default: 'violet'
    },
    animate: {
      type: Boolean,
      default: true
    },
    validate: {
      type: Boolean,
      default: true
    },
    sx: {
      type: Number,
      default: 2
    },
    sy: {
      type: Number,
      default: 0
    },
    mx: {
      type: Number,
      default: 4
    },
    my: {
      type: Number,
      default: -1
    },
    lx: {
      type: Number,
      default: 0
    },
    ly: {
      type: Number,
      default: 0
    },
    noHover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    unit () {
      return 1 / 3.5
    },
    circlesWidth () {
      const { sx, mx, lx, unit } = this
      return (Math.max(sx + 2, mx + 4, lx + 6) + 2) * unit
    },
    sTransform () {
      const { sx, sy, unit } = this
      return `translate(calc( ${sx} * ${unit}em ), calc( ${sy} * ${unit}em ))`
    },
    mTransform () {
      const { mx, my, unit } = this
      return `translate(calc( ${mx} * ${unit}em ), calc( ${my} * ${unit}em ))`
    },
    lTransform () {
      const { lx, ly, unit } = this
      return `translate(calc( ${lx} * ${unit}em ), calc( ${ly} * ${unit}em ))`
    },
    circlesOffset () {
      const { circlesWidth, unit } = this
      return circlesWidth - 10 * unit
    },
    invalid () {
      const { validate, sx, sy, mx, my, lx, ly } = this
      if (!validate) return false
      if (sx !== 0 && mx !== 0 && lx !== 0) return true
      if (Math.abs(sy) > 2 || Math.abs(my) > 1 || Math.abs(ly) > 0) return true
      return false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";
.senses-logo {
  cursor: default;
  $unit: 1em/3.5;
  display: flex;
  align-items: center;
  position: relative;
  .circles {
    position: relative;
    width: $unit * 8;
    transition: transform .6s;
    .circle {
      border: $unit * 0.25 solid;
      position: absolute;
      border-radius: 50%;

      &.circle-s {
        top: -$unit;
        height: $unit * 2;
        width: $unit * 2;
        transition: transform .4s .2s, border-color $transition;
      }

      &.circle-m {
        top: -$unit * 2;
        height: $unit * 4;
        width: $unit * 4;
        transition: transform .4s .1s, border-color $transition;
      }

      &.circle-l {
        top: -$unit * 3;
        height: $unit * 6;
        width: $unit * 6;
        transition: transform .4s, border-color $transition;
      }
    }
  }

  h1 {
    font-size: 1em;
    font-weight: $font-weight-regular;
    letter-spacing: $unit * 0.125;
  }

  &.violet {
    color: $color-violet;
    .circle {
      border-color: $color-violet;
    }
  }
  &.blue {
    color: $color-blue;
    .circle {
      border-color: $color-blue;
    }
  }
  &.green {
    color: $color-green;
    .circle {
      border-color: $color-green;
    }
  }
  &.yellow {
    color: $color-yellow;
    .circle {
      border-color: $color-yellow;
    }
  }
  &.purple {
    color: $color-purple;
    .circle {
      border-color: $color-purple;
    }
  }
  &.black {
    color: $color-black;
    .circle {
      border-color: $color-black;
    }
  }
  &.white {
    color: $color-white;
    .circle {
      border-color: $color-white;
    }
  }

  &.animate:hover {
    .circles {
      transform: translateX(0) !important;
      .circle-s {
        transform: translate($unit * 6, $unit * -2) !important;
      }
      .circle-m {
        transform: translate($unit * 4, $unit * 1) !important;
      }
      .circle-l {
        transform: translate($unit * 0, $unit * 0) !important;
      }
    }
  }

  &.hover:hover {
    color: $color-neon;
    .circle {
      border-color: $color-neon;
    }
  }

  &.invalid {
    background: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='4' width='4' viewBox='0 0 4 4'%3E%3Cpath stroke='%23F4CCDF' fill='none' d='M-1 3 L3 -1 M1 5 L5 1'/%3E%3C/svg%3E")
  }
}
</style>
