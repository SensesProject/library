<template>
  <div class="layout-scrollytelling">
    <ResizeObserver @notify="setDimensions"/>
      <!-- <header>
        <SensesLogo color="white"/>
      </header> -->
    <div class="vis" ref="vis" :class="{'ignore-menu-bar': ignoreMenuBar}">
      <div class="debug" v-if="debug"></div>
      <slot name="vis" :width="width" :height="height" :step="step">
        <div
          class="vis-demo"
          :style="{
            background: step === 1 ? style.colorBlue : style.colorGreen}">
          <span class="step">{{ fStep }}</span><br/>
          <span>{{ width }}&thinsp;✕&thinsp;{{ height }}</span>
        </div>
      </slot>
    </div>
    <section class="text" :class="{ debug }">
      <!-- <article> -->
        <slot name="text" :width="width" :height="height" :step="step">
          <IntersectionObserver align="left" :step="0">
            <h2>Zero</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserver darkmode :step="1">
            <h2>One</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserverFracture align="right" :step="1">
            <h2>One to Two</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserverFracture>
          <IntersectionObserver :step="2">
            <h2>Two</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
        </slot>
      <!-- </article> -->
    </section>
  </div>
</template>

<script>
import 'vue-resize/dist/vue-resize.css'
import { ResizeObserver } from 'vue-resize'
// import { mapState } from 'vuex'

import IntersectionObserver from './IntersectionObserver'
import IntersectionObserverFracture from './IntersectionObserverFracture'
// import SensesLogo from './SensesLogo.vue'
import style from '../style/global.scss'

export default {
  name: 'LayoutScrollytelling',
  components: {
    // SensesLogo,
    ResizeObserver,
    IntersectionObserver,
    IntersectionObserverFracture
  },
  props: {
    debug: {
      type: Boolean,
      default: false,
      docs: 'set to true to help you finetune transitions between steps'
    },
    ignoreMenuBar: {
      type: Boolean,
      default: false,
      docs: 'set to true to ignore the height of the menu bar.'
    }
  },
  data () {
    return {
      width: 100,
      height: 600,
      style,
      step: 0
    }
  },
  computed: {
    fStep () {
      return +this.step.toPrecision(4)
    }
  },
  methods: {
    setDimensions () {
      const { width, height } = this.$refs.vis.getBoundingClientRect()
      this.width = width
      this.height = height
    }
  },
  mounted () {
    this.setDimensions()
    // this.$store.registerModule('scrollytelling', {
    //   namespaced: true,
    //   state: {
    //     step: 0
    //   },
    //   mutations: {
    //     setStep (state, step) {
    //       state.step = step
    //     }
    //   }
    // })
    this.$on('step', step => { this.step = step })
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.layout-scrollytelling {
  width: 100%;
  z-index: 1;
  position: relative;

  .text {
    margin-top: -100vh;
    z-index: 1;
    min-height: 100vh;
    pointer-events: none;

    @include max-width($narrow) {
      z-index: 1;
      background: none;
      padding: 0;
    }

    &.debug {
      .intersection-observer {
        background: repeating-linear-gradient(45deg, $color-black, $color-black 2px, $color-white 2px, $color-white 4px, transparent 4px, transparent 16px);

        &:nth-child(even) {
          background: repeating-linear-gradient(-45deg, $color-white, $color-white 2px, $color-black 2px, $color-black 4px, transparent 4px, transparent 16px);
        }
      }
    }
  }
  .vis {
    width: 100%;
    height: calc(100vh - #{$spacing * 2});
    z-index: -1;
    position: sticky;
    top: $spacing * 2;
    left: 0;

    &.ignore-menu-bar {
      top: 0;
      height: 100vh;
    }

    .debug {
      position: fixed;
      height: 4px;
      width: 100vw;
      background: repeating-linear-gradient(0deg, $color-black, $color-black 2px, $color-white 2px, $color-white 4px);
      top: calc(50vh - 2px);
      z-index: 1000;
    }

    > .vis-demo {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content:  center;
      align-items: center;
      flex-direction: column;
      position: relative;
      transition: background .4s;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color-white;
      position: absolute;
      left: 0;

      .step {
        font-size: 16em;
        font-weight: $font-weight-bold;
        line-height: 1;
      }
    }
  }
}
</style>
