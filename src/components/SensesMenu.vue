<template>
  <div class="senses-menu">
    <div class="bar">
      <senses-logo color="black" href="https://dev.climatescenarios.org/"/>
      <span v-if="message" class="message">{{ message }}</span>
      <div class="falafel" @click="open = !open">
        <senses-falafel color="black" :symbol="open ? 'close' : 'vertical'"/>
      </div>
    </div>
    <transition name="fade">
      <div class="overlay" v-if="open">
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
import SensesLogo from './SensesLogo.vue'
import SensesFalafel from './SensesFalafel.vue'
export default {
  name: 'SensesMenu',
  components: {
    SensesLogo,
    SensesFalafel
  },
  props: {
    message: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.senses-menu {
  width: 100%;
  // height: $spacing * 2;
  background: transparentize($color-white, 0.02);
  top: 0;
  z-index: 100;
  position: sticky;

  @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
    background: transparentize($color-white, 0.15);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter:saturate(180%) blur(10px)
  }

  .bar {
    width: 100%;
    height: $spacing * 2;
    background: transparentize($color-white, 0.02);
    display: flex;
    align-items: center;
    padding: 0 $spacing / 2;

    .message {
      margin-left: $spacing / 2;
      font-size: 1em;
      font-weight: $font-weight-regular;
      letter-spacing: 1em / 3.5 * 0.125;
      text-transform: uppercase;
      color: $color-red;
    }

    & > *:last-child {
      margin-left: auto;
    }

    .falafel {
      display: flex;
      align-items: center;
    }
  }

  .overlay {
    position: fixed;
    top: $spacing * 2;
    height: calc(100vh - #{$spacing * 2});
    width: 100vw;
    left: 0;
    background: red;

    display: flex;
    justify-content: center;
    align-items: center;

    background: transparentize($color-white, 0.02);
    z-index: 100;

    @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
      background: transparentize($color-white, 0.15);
      -webkit-backdrop-filter: saturate(180%) blur(10px);
      backdrop-filter:saturate(180%) blur(10px)
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
        // background-color: #fff;
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
          border-bottom: 1px solid #F0F0FF;
          min-width: 280px;

          @include media-query($narrow) {
            border: 1px solid #F0F0FF;
            border-right: none;
            // border-right: 1px solid #F0F0FF;
            &:last-child {
              border-right: 1px solid #F0F0FF;
            }
          }

          [class^="glyph-"]:before, [class*=" glyph-"]:before {
            margin: 0;
          }

          a {
            background: none;
            color: #000;
          }

          .glyph {
            font-size: 2.6rem;
            margin-right: $spacing / 2;
          }

          &.policy {
            strong, .glyph {
              color: $color-green;
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
              color: $color-purple;
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
              color: $color-black;
            }

            a:hover, a:focus {
              background-color: $color-deep-gray;

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
