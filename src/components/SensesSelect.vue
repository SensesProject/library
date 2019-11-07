<template>
  <v-popover
    class="senses-select"
    offset="2"
    trigger="click"
    :popoverClass="['senses-tooltip senses-tooltip-select']"
    :placement="placement"
    @show="isVisible = true"
    @hide="isVisible = false">
    <button
      class="highlight"
      aria-haspopup="listbox"
      :aria-expanded="isVisible"
      :aria-labelledby="`btn_${uniqID}`"
      :id="`btn_${uniqID}`"
      :style="{'min-width': isNaN(width) ? width : `${width}px`}">
      <span><slot>{{ label }}</slot></span><svg width="16" height="8"><g><path d="M-4,1.5 L0,-1.5 L4,1.5"/></g></svg>
    </button>
    <slot name="tooltip" slot="popover">
      <ul
        :style="{'min-width': isNaN(width) ? width : `${width}px`}"
        role="listbox"
        class="senses-select-list"
        :aria-labelledby="`btn_${uniqID}`"
        :aria-activedescendant="`option_${value}`">
        <li
          v-for="(o, i) in options"
          :key="i"
          role="option"
          v-close-popover
          :id="`option_${(o.value != null ? o.value : o)}`"
          :aria-selected="(o.value != null ? o.value : o) === value"
          class="option"
          :class="[{active: (o.value != null ? o.value : o) === value, focused: (o.value != null ? o.value : o) === value}]"
          @click="$emit('input', o.value != null ? o.value : o)">
          {{ o.label || (o.value != null ? o.value : o) }}
        </li>
      </ul>
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
      isVisible: false,
      uniqID: '_' + Math.random().toString(36).substr(2, 9)
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
  display: inline-block;
  .highlight {
    border: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding-left: $spacing / 6;
    padding-right: $spacing / 4;
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

.senses-tooltip-select {
  box-shadow: 1px 1px 3px rgba($color-white, 1);
  outline: none;
  .senses-select-list {
    list-style: none;
  }
}

</style>
