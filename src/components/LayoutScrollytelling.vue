<template>
  <div class="layout-scrollytelling">
    <ResizeObserver @notify="setDimensions"/>
    <div class="text">
      <header>
        <SensesLogo color="white"/>
      </header>
      <article>
        <slot name="text">
          <IntersectionObserver :step="0">
            <h2>Zero</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserver :step="1">
            <h2>One</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
          <IntersectionObserver :step="2">
            <h2>Two</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </IntersectionObserver>
        </slot>
      </article>
    </div>
    <div class="vis">
      <div ref="vis">
        <div>
          <slot name="vis" :width="width" :height="height" :step="step">
            <div
              class="vis-inner"
              :style="{
                width: `${width}px`,
                height: `${height}px`,
                background: step === 1 ? style.colorBlue : style.colorGreen}">
              <div>{{ step }}</div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-resize/dist/vue-resize.css'
import { ResizeObserver } from 'vue-resize'
import { mapState } from 'vuex'

import IntersectionObserver from './IntersectionObserver'
import SensesLogo from './SensesLogo.vue'
import style from '../style/global.scss'

export default {
  name: 'LayoutScrollytelling',
  components: {
    SensesLogo,
    ResizeObserver,
    IntersectionObserver
  },
  data () {
    return {
      width: 100,
      height: 600,
      style
    }
  },
  computed: {
    ...mapState({
      step: state => state.scrollytelling ? state.scrollytelling.step : null
    })
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
    this.$store.registerModule('scrollytelling', {
      namespaced: true,
      state: {
        step: 0
      },
      mutations: {
        setStep (state, step) {
          state.step = step
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.layout-scrollytelling {
  width: 100%;
  display: flex;
  justify-content: center;

  @include max-width($narrow) {
    flex-direction: column;
    align-items: center;
  }

  .text {
    width: 100%;
    max-width: 360px;
    min-height: 100vh;
    flex: 1;
    padding: 0 $spacing / 2;
    background: $color-black;
    color: $color-white;

    p {
      color: $color-white;
    }

    @include max-width($narrow) {
      z-index: 1;
      background: none;
      padding: 0;
    }

    header {
      padding: $spacing / 2 0;
      position: sticky;
      top: 0;
      background: linear-gradient(to top, transparentize($color-black, 1), transparentize($color-black, 0) $spacing / 3);

      @include max-width($narrow) {
        padding: $spacing / 2;
        background: $color-black;
      }
    }

    article {
      @include max-width($narrow) {
        margin-top: -$spacing / 2;
      }
    }

    .intersection-observer {
      min-height: calc( 100vh - #{$spacing * 1.8});
      padding-bottom: $spacing;
      hyphens: auto;
      @include max-width($narrow) {
        padding: $spacing / 2;
        background: $color-black;
        min-height: auto;
        margin-bottom: calc( 100vh - #{$spacing * 2.8});

        &:last-of-type {
          margin-bottom: calc( 100vh - #{$spacing * 1.8});
        }
      }
    }
  }
  .vis {
    width: 100%;
    max-width: 960px;
    flex: 1.5;
    height: 100vh;
    padding: $spacing / 2;
    position: sticky;
    top: 0;

    @include max-width($narrow) {
      position: fixed;
      background: $color-white;
      height: calc( 100vh - #{$spacing * 1.8});
      top: $spacing * 1.8;
    }

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content:  center;
      align-items: center;
      position: relative;

      > div {
        position: absolute;
        width: 100%;
        height: 100%;

        > .vis-inner {
          transition: background .4s;
          font-size: 16em;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $color-white;
        }
      }
    }
  }
}
</style>
