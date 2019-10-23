<template>
  <div class="senses-radio">
    <span v-if="label" class="tiny">{{ label }}&nbsp;</span>
    <div class="radio" :class="{ isEqualWidth, isHorizontal }">
      <label
        v-for="(o, i) in options"
        :key="i"
        class="highlight"
        :class="[{active: (o.value != null ? o.value : o) === value}, o.color]">
        <input
          type="radio"
          :name="_uid"
          :checked="(o.value != null ? o.value : o) === value"
          :value="o.value != null ? o.value : o"
          @change="$emit('input', o.value != null ? o.value : o)">
          <span>{{ o.label || (o.value != null ? o.value : o) }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SensesRadio',
  props: {
    label: {
      type: [String, Number],
      default: '',
      docs: 'Text to show above input'
    },
    value: {
      docs: 'To be used with v-model'
    },
    options: {
      type: Array,
      default () {
        return [{
          value: 1,
          label: 'Option 1'
        }, {
          value: 'Option 2'
        }, {
          value: 3,
          label: 'Option 3',
          color: 'green'
        },
        'Long Option 4']
      },
      docs: 'Array of available options. Options can be either strings or objects, with properties value (required), label (optional), and color (optional)'
    },
    isEqualWidth: {
      type: Boolean,
      default: true,
      docs: 'Defines if items have the same width'
    },
    isHorizontal: {
      type: Boolean,
      default: true,
      docs: 'Defines if orientation is horizontal or vertical'
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
.senses-radio {
  display: inline-block;
  .radio {
    display: inline-grid;
    grid-column-gap: 1px;
    position: relative;
    width: 100%;

    &.isEqualWidth {
      grid-auto-columns: 1fr;
    }

    label {
      &:first-child {
        border-radius: $border-radius $border-radius 0 0;
      }

      &:last-child {
        border-radius: 0 0 $border-radius $border-radius;
      }
    }

    &.isHorizontal {
      grid-auto-flow: column;

      label {
        &:first-child {
          border-radius: $border-radius 0 0 $border-radius;
        }

        &:last-child {
          border-radius: 0 $border-radius $border-radius 0;
        }
      }
    }

    label {
      color: getColor(neon, 40);
      margin-bottom: 1px;
      border-radius: 0; // Because highlight class has border radius
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        opacity: 0;
        appearance: none;
        -webkit-appearance: none;

        &:checked+span {
          color: $color-white;
          cursor: default;
        }

        +span {
          width: 100%;
          display: inline-block;
          line-height: 1.2;
          padding: $spacing * 0.1 $spacing * 0.25;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}

</style>
