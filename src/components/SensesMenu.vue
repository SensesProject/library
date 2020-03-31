<template>
  <div class="senses-menu">
    <ResizeObserver @notify="onResize"/>
    <div class="bar" :class="{ darkmode }">
      <senses-logo :color="darkmode ? 'white' : 'black'" href="/"/>
      <div class="falafel" @click="open = !open">
        <senses-falafel :color="darkmode ? 'white' : 'black'" :symbol="open ? 'close' : 'vertical'"/>
      </div>
      <div class="warnings">
        <div v-if="wip" class="wip highlight red mono tiny no-hover">
          <strong>work in progress – subject to change</strong>
        </div>
        <div v-if="!closeBrowserWarning" class="browser highlight orange mono tiny no-hover">
          <div class="close" @click="closeBrowserWarning = true">✕</div>
          <strong>Not optimized for this browser</strong><br>
          Please visit this page with a modern web browser or visit the <a href="/primer-legacy">legacy primer</a> for an introduction to climate change scenarios
        </div>
        <div v-if="showScreenWarning && !closeScreenWarning" class="screen highlight yellow mono tiny no-hover">
          <div class="close" @click="closeScreenWarning = true">✕</div>
          <strong>Not optimized for small screens</strong><br>
          Please visit this this module on a larger device
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="overlay" :class="{ darkmode }" v-if="open">
        <nav class="page-intro">
          <div class="page-intro-float">
            <section class="toolkit">
              <a href="https://dev.climatescenarios.org/" class="wrapper">
                <div>
                  <span class="glyph glyph-gems" />
                </div>
                <div>
                  <span><strong>Toolkit&nbsp;&nearr;</strong></span>
                </div>
              </a>
            </section>
            <section class="policy">
              <a href="https://dev.climatescenarios.org/policy-portal" class="wrapper">
                <div>
                  <span class="glyph glyph-policies" />
                </div>
                <div>
                  <span><strong>Policy Portal&nbsp;&nearr;</strong></span>
                </div>
              </a>
            </section>
            <section class="finance">
              <a href="#" class="wrapper">
                <div>
                  <span class="glyph glyph-hurricanes" />
                </div>
                <div>
                  <span><strong>Finance Portal&nbsp;&nearr;</strong></span>
                </div>
              </a>
            </section>
          </div>
        </nav>
      </div>
    </transition>
  </div>
</template>

<script>
import 'vue-resize/dist/vue-resize.css'
import { ResizeObserver } from 'vue-resize'
import SensesLogo from './SensesLogo.vue'
import SensesFalafel from './SensesFalafel.vue'
export default {
  name: 'SensesMenu',
  components: {
    SensesLogo,
    SensesFalafel,
    ResizeObserver
  },
  props: {
    wip: {
      type: Boolean,
      default: false,
      docs: 'set to true for work in progress modules'
    },
    minWidth: {
      type: Number,
      default: null,
      docs: 'only updates after resize'
    },
    darkmode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false,
      showScreenWarning: false,
      closeScreenWarning: false,
      closeBrowserWarning: false
    }
  },
  methods: {
    onResize () {
      this.showScreenWarning = this.minWidth != null && this.minWidth >= window.innerWidth
    }
  },
  mounted () {
    this.onResize()
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.senses-menu {
  width: 100%;
  top: 0;
  z-index: 100;
  position: sticky;

  .bar {
    width: 100%;
    height: $spacing * 2;
    padding: 0 $spacing / 2;
    display: grid;
    grid-template-columns: auto auto;
    position: relative;

    background: transparentize($color-white, 0.02);
    @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
      background: transparentize($color-white, 0.15);
      -webkit-backdrop-filter: saturate(180%) blur(10px);
      backdrop-filter:saturate(180%) blur(10px)
    }

    &.darkmode {
      background: transparentize($color-black, 0.02);
      @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
        background: transparentize($color-black, 0.15);
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter:saturate(180%) blur(10px)
      }
    }

    .falafel {
      justify-self: end;
      display: flex;
      align-items: center;
      z-index: 2;
    }
    .senses-logo {
      z-index: 2;
    }

    .warnings {
      position: absolute;
      top: $spacing * 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      // z-index: -1;

      > div {
        text-align: center;
        margin-top: $spacing / 4;
        width: 100%;
        max-width: $narrow;
        padding: $spacing / 4 $spacing / 2;
        position: relative;

        a {
          color: inherit;
        }

        &.browser {
          display: none;
          a {
            background: linear-gradient(to top, transparent 0.1em, getColor(orange, 20) 0.1em, $color-orange 0.2em, transparent 0.2em);
          }
          @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            display: block;
          }
        }

        .close {
          position: absolute;
          right: 0;
          top: 0;
          padding: $spacing / 4;
          font-weight: $font-weight-bold;
          cursor: pointer;
        }
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    height: calc(100vh);
    width: 100%;
    left: 0;
    // background: red;

    display: flex;
    justify-content: center;
    align-items: center;

    background: transparentize($color-white, 0.02);
    z-index: 1;

    @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
      background: transparentize($color-white, 0.15);
      -webkit-backdrop-filter: saturate(180%) blur(10px);
      backdrop-filter:saturate(180%) blur(10px)
    }
    --border-color: #{getColor(gray, 90)};
    --policy-color: #{getColor(green, 50)};
    --finance-color: #{getColor(purple, 50)};
    --toolkit-color: #{getColor(neon, 50)};

    &.darkmode {
      background: transparentize($color-black, 0.02);

      @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
        background: transparentize($color-black, 0.15);
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter:saturate(180%) blur(10px)
      }

      --border-color: #{getColor(gray, 80)};
      --policy-color: #{getColor(green, 50)};
      --finance-color: #{getColor(purple, 50)};
      --toolkit-color: #{getColor(neon, 50)};
    }

    &.fade-enter-active, &.fade-leave-active {
      transition: opacity $transition;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }

    .page-intro {
      z-index: 3;
      @include center();

      .page-intro-float {
        // background-color: $color-white;
        // box-shadow: $box-shadow--strong;
        margin-bottom: $spacing;

        @include media-query($narrow) {
          display: grid;
          max-width: $medium;
          grid-template-columns: repeat(3, 1fr);
          // transform: translateY(-50%);
          margin-bottom: 0;
        }

        .wrapper {
          padding: $spacing / 2;
          display: flex;
          height: 100%;

          @include media-query($medium) {
            padding: $spacing;
          }

          div {
            @include center();
          }
        }

        section {
          border-bottom: 1px solid var(--border-color);
          min-width: 280px;

          @include media-query($narrow) {
            border: 1px solid var(--border-color);
            border-right: none;
            // border-right: 1px solid var(--border-color);
            &:last-child {
              border-right: 1px solid var(--border-color);
            }
          }

          [class^="glyph-"]:before, [class*=" glyph-"]:before {
            margin: 0;
          }

          a {
            background: none;
          }

          .glyph {
            font-size: 2.6rem;
            margin-right: $spacing / 2;
          }

          &.policy {
            strong, .glyph {
              color: var(--policy-color);
            }

            a:hover, a:focus {
              background-color: $color-green;

              strong, .glyph, span {
                color: #fff;
              }
            }
          }

          &.finance {
            strong, .glyph {
              color: var(--finance-color);
            }

            a:hover, a:focus {
              background-color: $color-purple;

              strong, .glyph, span {
                color: #fff;
              }
            }
          }

          &.toolkit {
            strong, .glyph {
              color: var(--toolkit-color);
            }

            a:hover, a:focus {
              background-color: $color-neon;

              strong, .glyph, span {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
