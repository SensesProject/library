<template>
  <svg class="senses-falafel" viewBox="0 0 32 32">
    <g :class="[symbol, color]" transform="translate(16 16)">
      <circle r="1.5"/>
      <g class="circle top left"><circle r="1.5"/></g>
      <g class="circle top right"><circle r="1.5"/></g>
      <g class="circle bottom left"><circle r="1.5"/></g>
      <g class="circle bottom right"><circle r="1.5"/></g>
    </g>
  </svg>
</template>

<script>
import colors from '../style/global.scss'
export default {
  name: 'SensesFalafel',
  props: {
    color: {
      type: String,
      default: 'neon',
      docs: 'color of symbol, see style/colors for available colors'
    },
    symbol: {
      type: String,
      default: 'vertical',
      docs: 'symbol to show: vertical (default), horizontal, collapse, or close'
    }
  },
  computed: {
    fill () {
      console.log(colors)
      return colors[`color-${this.color.toLowerCase()}`]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.senses-falafel {
  width: $spacing;
  height: $spacing;

  g {
    @include tint(fill, 50);
    .circle {
      transition: transform .4s;
      &.top circle {
        transform: translateY(-6.5px)
      }
      &.bottom circle {
        transform: translateY(6.5px)
      }
    }

    &.horizontal {
      .top {
        transform: rotate(-90deg);
      }
      .bottom {
        transform: rotate(-90deg);
      }
    }

     &.close {
      .top.left {
        transform: rotate(-45deg);
      }
      .top.right {
        transform: rotate(45deg);
      }
      .bottom.left {
        transform: rotate(-45deg);
      }
      .bottom.right {
        transform: rotate(45deg);
      }
    }

    &.collapse {
      .top {
        transform: rotate(-135deg);
      }
      .bottom {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
