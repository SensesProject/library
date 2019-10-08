<template>
  <v-popover offset="2" :trigger="trigger" :popoverClass="['senses-tooltip', ...tooltipClass]" :placement="placement">
    <span :class="textClass"><slot>{{ text }}</slot></span>
    <slot name="tooltip" slot="popover">
      {{ tooltip }}
    </slot>
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip'
export default {
  name: 'SensesTooltip',
  components: {
    VPopover
  },
  props: {
    text: {
      type: String,
      default: 'text'
    },
    textClass: {
      type: Array,
      default () {
        return ['dotted']
      }
    },
    tooltip: {
      type: String,
      default: 'tooltip'
    },
    tooltipClass: {
      type: Array,
      default () {
        return ['tiny']
      }
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";
</style>
<style lang="scss">
@import "../style/global.scss";
</style>
