<template>
  <div class="components">
    <div class="component-list">
      <div v-for="c in components" :key="c.name">
        <router-link class="mono" :to="`/components/${c.name}`">{{ c.name }}</router-link>
      </div>
    </div>
    <div class="component-message" v-if="componentMessage" v-html="componentMessage"/>
    <div class="component-view">
      <router-view v-bind="bindings"/>
      <div class="component-options" v-if="componentOptions.length > 0">
        <div class="option" v-for="o in componentOptions" :key="o.label">
          <span class="label">{{ o.label }} </span>
          <select class="input" v-if="o.type === 'select'" v-model="o.value">
            <option v-for="(option, i) in o.options" :key="`${o.label}-${i}`" :value="option.value">
              {{ option.label || option.value }}
            </option>
          </select>
          <input v-if="o.type === 'range'" :value="o.value" @change="o.value = +$event.target.value" type="range" :max="o.max" :min="o.min" :step="o.step"/>
          <span class="range-value" v-if="o.type === 'range'">{{ o.value }}</span>
          <input v-if="o.type !== 'select' && o.type !== 'range'" v-model="o.value" :type="o.type"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import components from '@/assets/library'

export default {
  name: 'home',
  data () {
    return {
      components,
      options: components.map(c => {
        const options = c.options
        return {
          name: c.name,
          options: Object.keys(options).map(label => {
            return {
              label,
              ...options[label],
              value: options[label].type === 'select' ? options[label].options[0].value : options[label].default
            }
          })
        }
      })
    }
  },
  computed: {
    componentOptions () {
      return this.options.find(o => o.name === this.$route.name).options
    },
    componentMessage () {
      return this.components.find(c => c.name === this.$route.name).message
    },
    bindings () {
      const bindings = {}
      this.componentOptions.forEach(o => {
        bindings[o.label] = o.value
      })
      return bindings
    }
  }
}
</script>
<style scoped lang="scss">
@import "../style/variables";

.components {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;

  .component-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $spacing / 2;
    a {
      display: inline-block;
      flex: 1;
      margin-right: $spacing / 2;

      &.router-link-active {
        color: $color-green;
      }
    }
  }
  .component-message {
    max-width: 640px;
    align-self: center;
    background: transparentize($color-yellow, .98);
    padding: $spacing / 2;
    border: 1px solid $color-yellow;
  }
  .component-view {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .component-options {
    font-family: $font-mono;
    margin-left: $spacing / 2;
    width: 320px;
    flex: 1;
    text-align: right;
    .range-value {
      position: absolute;
      pointer-events: none;
      transform: translate(-100%);
    }
    .input, input {
      width: 140px;

      &[type=range]{
        width: 140px;
      }
    }
  }
}
</style>
