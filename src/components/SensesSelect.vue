<template>
  <v-popover class="senses-select" offset="2" trigger="click" :popoverClass="['senses-tooltip senses-tooltip-select']" :placement="placement">
    <span class="highlight" :style="{width: isNaN(width) ? width : `${width}px`}"><span><slot>{{ label }}</slot></span><svg width="16" height="8"><g><path d="M-4,1.5 L0,-1.5 L4,1.5"/></g></svg></span>
    <slot name="tooltip" slot="popover">
      <div :style="{width: isNaN(width) ? width : `${width}px`}">
        <div v-for="(o, i) in options" :key="i"
          v-close-popover
          class="option"
          :class="[{active: (o.value != null ? o.value : o) === value}]"
          @click="$emit('input', o.value != null ? o.value : o)">
          {{ o.label || (o.value != null ? o.value : o) }}
        </div>
      </div>
    </slot>
  </v-popover>
</template>

<script>
import Vue from 'vue'
import { VPopover, VClosePopover } from 'v-tooltip'
Vue.directive('close-popover', VClosePopover)
export default {
  name: 'SensesSelect',
  components: {
    VPopover
  },
  props: {
    value: {
      default: 1,
      docs: 'To be used with v-model'
    },
    options: {
      type: Array,
      default () {
        return [{
          label: 'Option 1',
          value: 1
        }, {
          value: 'Option 2'
        },
        'Option 3']
      },
      docs: 'Array of available options. Options can be either strings or objects, with properties value (required) and label (optional)'
    },
    width: {
      type: String,
      default: null,
      docs: 'width of the dropdown menu either in pixels or css style. defaults to null: no fixed width'
    },
    placement: {
      type: String,
      default: 'bottom-start',
      docs: 'placement of tooltip, defualts to "bottom-start"'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    label () {
      const { options, value } = this
      const selected = options.find(o => (o.value != null ? o.value : o) === value)
      if (selected == null) return 'Choose Option'
      return selected.label || (selected.value != null ? selected.value : selected)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";
.senses-select {
  .highlight {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    svg {
      g {
        transform: translate(11px, 4px);
        path {
          stroke: getColor(neon, 40);
          stroke-width: 1.5;
          fill: none;
          transition: transform $transition;
          transform: rotate(180deg);
        }
      }
    }
    &:hover {
      path {
        stroke: getColor(neon, 20);
      }
    }
  }
  &.open {
    .highlight {
      svg {
        g {
          path {
            transform: rotate(0deg);
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "../style/global.scss";
</style>
