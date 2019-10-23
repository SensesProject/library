<template>
  <div class="senses-radio">
    <span v-if="label" class="tiny">{{ label }}&nbsp;</span>
    <div class="radio">
      <label v-for="(o, i) in options" :key="i">
        <input
          type="radio"
          :name="_uid"
          :checked="(o.value != null ? o.value : o) === value"
          :value="o.value != null ? o.value : o"
          @change="$emit('input', o.value != null ? o.value : o)">
          <span class="highlight" :class="[{active: (o.value != null ? o.value : o) === value}, o.color]">{{ o.label || (o.value != null ? o.value : o) }}</span>
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
        'Option 4']
      },
      docs: 'Array of available options. Options can be either strings or objects, with properties value (required), label (optional), and color (optional)'
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
    display: inline-flex;
    position: relative;
    flex-wrap: wrap;
    width: 100%;

    label {
      color: getColor(neon, 40);
      margin-bottom: 1px;
      flex: 1;

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
          border-radius: 0;
        }
      }
      &:first-child {
        input+span {
          border-radius: 2px 0 0 2px;
        }
      }

      &:last-child {
        input+span {
          border-radius: 0 2px 2px 0;
        }
      }
    }
    label + label {
      margin-left: 1px;
    }
  }
}

</style>
