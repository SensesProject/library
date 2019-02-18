<template>
  <div class="components">
    <div class="component-list">
      <div v-for="c in components" :key="c.name">
        <router-link class="mono" :to="`/components/${c.name}`">{{ c.name }}</router-link>
      </div>
    </div>
    <div class="component-view">
      <router-view v-bind="bindings"/>
    </div>
    <div class="component-options">
      <div class="option" v-for="o in componentOptions" :key="o.label">
        <span class="label">{{ o.label }} </span>
        <select class="input" v-if="o.type === 'select'" v-model="o.value">
          <option v-for="(option, i) in o.options" :key="`${o.label}-${i}`" :value="option.value">
            {{ option.label || option.value }}
          </option>
        </select>
        <input v-if="o.type === 'range'" :value="o.value" @change="o.value = +$event.target.value" type="range" :max="o.max" :min="o.min" :step="o.step"/>
        <input v-if="o.type !== 'select' && o.type !== 'range'" v-model="o.value" :type="o.type"/>
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

  .component-list {
    width: 320px;
    a {
      display: inline-block;
      flex: 1;

      &.router-link-active {
        $underline: $spacing * 0.185;
        background: linear-gradient(0deg,transparent,transparent $underline,$color-green $underline,$color-green calc(#{$underline} + 2px),transparent 0);
      }
    }
  }
  .component-view {
    width: calc(100% - 640px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .component-options {
    width: 320px;
    flex: 1;
    text-align: right;

    .input, input {
      width: 140px;
    }
  }
}
</style>
