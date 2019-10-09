<template>
  <div class="components">
    <SensesSelect :options="componentNames" width="240px" v-model="componentName"/>
    <div class="import">
      <pre><code class="highlight yellow no-hover">import {{componentName}} from 'library/src/components/{{componentName}}.vue'</code></pre>
      <pre><code class="highlight yellow no-hover">&lt;{{componentName}}/&gt;</code></pre>
    </div>
    <div v-if="component.docs" class="docs" v-html="component.docs"/>
    <hr>
    <router-view v-bind="props" v-model="model"/>
    <hr>
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Example</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(prop, i) in componentProps"
          :key="i">
          <td class="mono">{{ prop.name }}</td>
          <td class="mono">{{ prop.type.join(', ') }}</td>
          <td class="mono example">
            <input class="mono" v-if="prop.type[0] === 'String'" v-model="props[prop.name]"/>
            <input class="mono" v-if="prop.type[0] === 'Number'" type="number" v-model.number="props[prop.name]"/>
            <textarea class="mono" :class="{ warn: !jsonValids[prop.name] }" v-if="prop.type[0] === 'Array' || prop.type[0] === 'Object'" v-model="jsonProps[prop.name]"/>
            <SensesRadio v-if="prop.type[0] === 'Boolean'" v-model="props[prop.name]" :options="[true, false]"/>
          </td>
          <td>{{ prop.docs }}</td>
          <!-- <td :class="[scale, font]"><span :class="style.class">{{ style.example }}</span></td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import components from '@/assets/library'
import SensesSelect from '@/components/SensesSelect.vue'
import SensesRadio from '@/components/SensesRadio.vue'
// import { isFunction } from 'util'
// import { isArray } from 'util'

export default {
  name: 'Components',
  components: { SensesSelect, SensesRadio },
  data () {
    return {
      components,
      componentName: null,
      model: 1,
      props: {},
      jsonProps: {}
      // options: components.map(c => {
      //   const options = c.options
      //   return {
      //     name: c.name,
      //     options: Object.keys(options).map(label => {
      //       return {
      //         label,
      //         ...options[label],
      //         value: options[label].type === 'select' ? options[label].options[0].value : options[label].default
      //       }
      //     })
      //   }
      // }),
      // input: null
    }
  },
  computed: {
    componentNames () {
      return this.components.map(c => c.name)
    },
    component () {
      return this.components.find(c => c.name === this.$route.name)
    },
    componentProps () {
      if (this.component.props == null) return []
      return Object.keys(this.component.props).map(k => {
        const prop = this.component.props[k]
        const value = typeof (prop.default) === 'function' ? prop.default() : prop.default
        return {
          name: k,
          type: prop.type ? [prop.type].flat().map(f => f.name) : [],
          example: JSON.stringify(value, null, 2),
          default: value,
          docs: prop.docs
        }
      })
    }
    // componentOptions () {
    //   return this.options.find(o => o.name === this.$route.name).options
    // },
    // componentMessage () {
    //   return this.components.find(c => c.name === this.$route.name).message
    // },
    // componentInput () {
    //   return this.options.find(o => o.name === this.$route.name).input
    // },
    // bindings () {
    //   const bindings = {}
    //   this.componentOptions.forEach(o => {
    //     if (this.componentInput && o.label === 'input') return
    //     bindings[o.label] = o.value
    //   })
    //   if (this.componentInput) {
    //     bindings['v-model'] = 'input'
    //   }
    //   return bindings
    // }
  },
  watch: {
    componentName (componentName) {
      this.$router.push(`/components/${componentName}`)
      this.model = 1
    },
    '$route.name': {
      handler (componentName) {
        this.componentName = componentName
      },
      immediate: true
    },
    componentProps: {
      handler (componentProps) {
        const props = {}
        const jsonProps = {}
        const jsonValids = {}
        componentProps.forEach(p => {
          if (p.name === 'value') return
          if (p.type[0] === 'Array' || p.type[0] === 'Object') {
            jsonProps[p.name] = p.example
            jsonValids[p.name] = true
          }
          props[p.name] = p.default
        })
        this.props = props
        this.jsonProps = jsonProps
        this.jsonValids = jsonValids
      },
      immediate: true
    },
    jsonProps: {
      handler (jsonProps) {
        Object.keys(jsonProps).forEach(p => {
          try {
            const parsed = JSON.parse(jsonProps[p])
            this.props[p] = parsed
            this.jsonValids[p] = true
          } catch (error) {
            this.jsonValids[p] = false
          }
        })
      },
      deep: true
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

  .import {
    margin: $spacing 0 0 0;

    pre + pre {
      margin-top: $spacing / 4;
    }
  }

  .docs {
    margin: $spacing / 4 0 0 0;
  }

  hr {
    border: none;
    border-bottom: 1px solid getColor(gray, 80);
    margin: $spacing / 2 0;
  }

  .example {
    input, textarea, .senses-radio {
      width: 240px;
    }
    input {
      border: 1px solid getColor(gray, 80);
      padding: $spacing / 4;
      font-size: 1em;
    }
    textarea {
      padding: $spacing / 4;
      height: 120px;
      border: 1px solid getColor(gray, 80);
      font-size: 1em;
      &.warn {
        border: 1px solid $color-red;
      }
    }
  }
  // .component-list {
  //   display: flex;
  //   flex-wrap: wrap;
  //   margin-bottom: $spacing / 2;
  //   a {
  //     display: inline-block;
  //     flex: 1;
  //     margin-right: $spacing / 2;

  //     &.router-link-active {
  //       color: $color-green;
  //     }
  //   }
  // }
  // .component-message {
  //   max-width: 640px;
  //   align-self: center;
  //   background: transparentize($color-yellow, .98);
  //   padding: $spacing / 2;
  //   border: 1px solid $color-yellow;
  // }
  // .component-view {
  //   width: 100%;
  //   display: flex;
  //   justify-content: center;
  //   align-items: flex-start;
  // }
  // .component-options {
  //   font-family: $font-mono;
  //   margin-left: $spacing / 2;
  //   width: 320px;
  //   flex: 1;
  //   text-align: right;
  //   .range-value {
  //     position: absolute;
  //     pointer-events: none;
  //     transform: translate(-100%);
  //   }
  //   .input, input {
  //     width: 140px;

  //     &[type=range]{
  //       width: 140px;
  //     }
  //   }
  // }
    table {
      width: 100%;

      thead th {
        font-weight: $font-weight-bold;
      }

      thead th {
        padding: 0 $spacing / 6 $spacing / 4;
        border-bottom: 1px solid getColor(gray, 80);
      }

      tbody td {
        border-bottom: 1px solid getColor(gray, 90);
        padding: $spacing / 6 $spacing / 6;
      }
    }
}
</style>
