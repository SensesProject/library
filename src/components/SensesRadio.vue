<template>
  <div class="senses-radio" :class="{ stretch, centered }">
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
  name: 'OptionRadio',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {},
    options: {
      type: Array,
      default () { return [] }
    },
    stretch: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
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
  .radio {
    display: flex;
    position: relative;
    display: flex;
    flex-wrap: wrap;

    label {
      color: getColor(neon, 40);
      margin-bottom: 1px;
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
          padding: 0 $spacing * 0.25;
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

  &.centered .radio{
    justify-content: center;
  }

  &.stretch {
    .radio label {
      flex: 1;
    }
  }
}

</style>
