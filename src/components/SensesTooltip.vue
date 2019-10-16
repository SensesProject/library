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
      default: 'text',
      docs: 'text that triggers the tooltip. can also be set by using the default slot i.e., <SensesTooltip>Text</SensesTooltip>'
    },
    textClass: {
      type: [Array, Object, String],
      default () {
        return ['dotted']
      },
      docs: 'class or classes to add to the text. defaults to "dotted"'
    },
    tooltip: {
      type: String,
      default: 'tooltip',
      docs: 'text that shows up in the tooltip. can also be set using the popover slot i.e., <SensesTooltip>Text<span slot="popover">tooltip text</span></SensesTooltip>'
    },
    tooltipClass: {
      type: [Array, Object, String],
      default () {
        return ['tiny']
      },
      docs: 'class or classes to add to the text. defaults to "tiny"'
    },
    trigger: {
      type: String,
      default: 'hover',
      docs: 'event to trigger tooltip. defaults to "hover"'
    },
    placement: {
      type: String,
      default: 'top',
      docs: 'placement of tooltip. defaults to "top"'
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
