<template>
  <v-popover class="senses-select" offset="2" trigger="click" :popoverClass="['senses-tooltip senses-tooltip-select']" placement="auto">
    <span class="highlight"><span><slot>{{ label }}</slot></span><svg width="16" height="8"><g><path d="M-4,1.5 L0,-1.5 L4,1.5"/></g></svg></span>
    <slot name="tooltip" slot="popover">
      <div v-for="(o, i) in options" :key="i"
        v-close-popover
        class="option"
        :class="[{active: (o.value != null ? o.value : o) === value}]"
        @click="$emit('input', o.value != null ? o.value : o)">
        {{ o.label || (o.value != null ? o.value : o) }}
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
      default: 1
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
      }
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
    svg {
      g {
        transform: translate(11px, 3px);
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
