<template>
  <div class="senses-menu">
    <ResizeObserver @notify="onResize"/>
    <div class="bar" :class="{ darkmode, open, transparent }">
      <senses-logo rootElement="span" :color="logo && logo.color ? logo.color : darkmode ? 'white' : 'neon'" v-bind="logo" no-hover :animate="false">
      </senses-logo>
      <!-- <span class="to-the-toolkit">
        <a href="/" class="button uppercase no-mobile" v-if="!mobile && !narrow">
          <span>→ to the toolkit</span>
        </a>
      </span> -->
      <div class="falafel">
        <a href="../de"><div class="button" :class="{active: lang === 'de'}">DE</div></a>
        <a href="../en"><div class="button" :class="{active: lang === 'en'}">EN</div></a>
      </div>
      <div class="warnings" v-if="!open">
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
  </div>
</template>

<script>
import 'vue-resize/dist/vue-resize.css'
import { ResizeObserver } from 'vue-resize'
import SensesLogo from './SensesLogo.vue'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
export default {
  name: 'SensesMenu',
  components: {
    SensesLogo,
    ResizeObserver
  },
  props: {
    id: {
      type: String,
      default: null,
      docs: 'module id to show metadata'
    },
    logo: {
      type: Object,
      default: null,
      docs: 'properties to pass down to <SensesLogo/>'
    },
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
    },
    disableScrollLock: {
      type: Boolean,
      default: false
    },
    narrow: {
      type: Boolean,
      default: false,
      docs: 'force narrow/mobile layout'
    },
    transparent: {
      type: Boolean,
      default: false
    },
    toolkit: {
      type: Boolean,
      default: false,
      docs: 'Hide the toolkit link. (Probably because you are already in the toolkit)'
    }
  },
  data () {
    return {
      open: false,
      showScreenWarning: false,
      closeScreenWarning: false,
      closeBrowserWarning: false,
      modules: [],
      mobile: false
    }
  },
  computed: {
    lang () {
      return (location.pathname.split('/').filter(frag => frag.length > 0).find((frag, i, fragments) => i === fragments.length - 1) || 'en').toLowerCase()
    },
    module () {
      return this.modules.find(m => m.id === this.id)
    },
    aboutOffset () {
      if (this.logo == null) return 10 / 3.5
      const { sx, mx, lx } = this.logo
      if (sx == null || mx == null || lx == null) return 10 / 3.5
      return (Math.max(sx + 2, mx + 4, lx + 6) + 2) / 3.5
    }
  },
  watch: {
    disableScrollLock () {
      clearAllBodyScrollLocks()
    }
  },
  methods: {
    onResize () {
      this.showScreenWarning =
        this.minWidth != null && this.minWidth >= window.innerWidth
      this.mobile = window.innerWidth < 600
    },
    toggleMenu () {
      this.open = !this.open
      if (this.disableScrollLock) return
      const el = document.querySelector('#senses-menu')
      if (this.open) {
        disableBodyScroll(el)
      } else {
        clearAllBodyScrollLocks()
      }
    },
    closeMenu () {
      this.open = false
      if (this.disableScrollLock) return
      clearAllBodyScrollLocks()
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
    grid-template-columns: auto 1fr auto auto;
    position: relative;

    transition: background $transition;
    background: transparentize($color-white, 0.02);
    @supports (
      (-webkit-backdrop-filter: saturate(180%) blur(20px)) or
        (backdrop-filter: saturate(180%) blur(20px))
    ) {
      background: transparentize($color-white, 0.15);
      -webkit-backdrop-filter: saturate(180%) blur(10px);
      backdrop-filter: saturate(180%) blur(10px);
    }

    &.darkmode {
      background: transparentize(getColor(neon, 0), 0.02);
      @supports (
        (-webkit-backdrop-filter: saturate(180%) blur(20px)) or
          (backdrop-filter: saturate(180%) blur(20px))
      ) {
        background: transparentize($color-black, 0.15);
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter: saturate(180%) blur(10px);
      }
    }

    &.transparent {
      background: transparent;
      @supports (
        (-webkit-backdrop-filter: saturate(180%) blur(20px)) or
          (backdrop-filter: saturate(180%) blur(20px))
      ) {
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
      }
    }

    &.open {
      background: transparent;
    }

    .to-the-toolkit {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      // margin-left: $spacing / 4;
      .button {
        padding: $spacing / 4 $spacing / 2 $spacing / 4 $spacing * 0.375;
        margin-right: $spacing / 4;
        display: flex;
        cursor: pointer;
        background: none;
        color: inherit;
        transition: color $transition;
        .glyph {
          transform: scale(2);
          margin-right: $spacing / 4;
        }
        .arrow {
          padding-right: $spacing / 4;
        }
        &.no-mobile {
          @include max-width($narrow) {
            display: none;
          }
        }
      }
    }

    .falafel {
      justify-self: end;
      display: flex;
      align-items: center;
      a:first-of-type {
        margin-right: $spacing / 4;
      }
      .button {
        // padding: $spacing / 8;
        // text-align: center;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;

        &.active {
          text-decoration: underline;
        }
      }
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
            background: linear-gradient(
              to top,
              transparent 0.1em,
              getColor(orange, 20) 0.1em,
              $color-orange 0.2em,
              transparent 0.2em
            );
          }
          @media all and (-ms-high-contrast: none),
            (-ms-high-contrast: active) {
            display: block;
            z-index: 10;
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

  .background {
    background: transparentize($color-white, 0.02);
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    z-index: -10;
    pointer-events: all;
    @supports (
      (-webkit-backdrop-filter: saturate(180%) blur(20px)) or
        (backdrop-filter: saturate(180%) blur(20px))
    ) {
      background: transparentize($color-white, 0.15);
      -webkit-backdrop-filter: saturate(180%) blur(10px);
      backdrop-filter: saturate(180%) blur(10px);
    }
    &.darkmode {
      background: transparentize(getColor(neon, 0), 0.02);
      @supports (
        (-webkit-backdrop-filter: saturate(180%) blur(20px)) or
          (backdrop-filter: saturate(180%) blur(20px))
      ) {
        background: transparentize($color-black, 0.15);
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter: saturate(180%) blur(10px);
      }
    }
    &.transparent {
      @supports (
        (-webkit-backdrop-filter: saturate(180%) blur(20px)) or
          (backdrop-filter: saturate(180%) blur(20px))
      ) {
        background: transparent;
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter: saturate(180%) blur(10px);
      }
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100vh);
    width: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;

    --border-color: #{getColor(gray, 90)};
    --policy-color: #{getColor(green, 50)};
    --finance-color: #{getColor(purple, 50)};
    --toolkit-color: #{getColor(neon, 50)};

    .menu {
      display: grid;
      overflow: auto;
      padding: $spacing * 3 $spacing / 2 0;
      grid-template-columns: 1fr auto;
      gap: 0 $spacing * 2;
      width: 100%;

      @include max-width($medium) {
        gap: 0 $spacing;
      }

      @include max-width($narrow) {
        grid-template-columns: auto;
        grid-template-rows: auto 1fr;
      }

      .about {
        max-width: 460px;
        pointer-events: all;
        justify-self: end;
        margin-top: - $spacing / 8;
        @include max-width($narrow) {
          margin-left: 0 !important;
          justify-self: start;
        }
        section {
          margin: 0 0 $spacing;
          @include max-width($narrow) {
            margin: $spacing * 0.75 0 $spacing;
          }
          h3 {
            text-transform: uppercase;
            // font-weight: $font-weight-regular;
          }
          div {
            margin: $spacing / 4 0;
          }
          .gray {
            color: $color-deep-gray;
            a {
              color: $color-deep-gray;
              background: none;
            }
          }
          .button {
            padding: $spacing / 4 $spacing / 2;
            cursor: pointer;
            white-space: nowrap;
          }
        }
      }

      .nav {
        display: flex;
        flex-direction: column;
        margin-top: -$spacing / 2;
        // margin-right: $spacing * 1.5;
        align-items: flex-start;
        z-index: 10;
        pointer-events: all;

        .disabled {
          opacity: 0.5;
          pointer-events: none;
          &.tiny {
            margin-top: $spacing / 4;
            height: $spacing / 2;
          }
        }

        @include max-width($narrow) {
          grid-row: 1 / 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 $spacing / 4;
          margin-right: 0;
          .disabled {
            &.tiny {
              grid-column: 1 / 3;
              // text-align: center;
            }
          }
        }

        a {
          display: flex;
          align-items: center;
          white-space: nowrap;
          padding: $spacing / 4 $spacing $spacing / 4 $spacing / 2;
          margin: $spacing / 8 0;
          width: 100%;

          @include max-width($narrow) {
            padding: $spacing / 4 $spacing / 4 $spacing / 4 $spacing / 8;
            justify-content: center;
          }

          &.button {
            color: $color-white;
          }
          cursor: pointer;

          .glyph {
            transform: scale(2);
            margin-right: $spacing / 4;

            @include max-width($narrow) {
              transform: scale(1.8);
              margin-right: $spacing / 8;
            }
          }
        }
      }
    }
    &.darkmode {
      --border-color: #{getColor(gray, 80)};
      --policy-color: #{getColor(green, 50)};
      --finance-color: #{getColor(purple, 50)};
      --toolkit-color: #{getColor(neon, 50)};

      color: $color-white;
      .menu {
        .about {
          section {
            .gray {
              color: $color-light-gray;
              a {
                color: $color-light-gray;
              }
            }
          }
        }
      }
    }

    &.narrow {
      .menu {
        grid-template-columns: auto;
        grid-template-rows: auto 1fr;
        .about {
          margin-left: 0;

          section {
            margin: $spacing * 0.75 0 $spacing;
          }
        }
        .nav {
          grid-row: 1 / 2;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0 $spacing / 4;
          margin-right: 0;
          .disabled {
            &.tiny {
              margin-top: $spacing / 8;
            }
          }

          a {
            padding: $spacing / 4 $spacing / 4 $spacing / 4 $spacing / 8;
            justify-content: center;

            .glyph {
              transform: scale(1.8);
              margin-right: $spacing / 8;
            }
          }
        }
      }
    }
  }

  > .fade-enter-active,
  > .fade-leave-active {
    transition: opacity $transition;
  }
  > .fade-enter,
  > .fade-leave-to {
    opacity: 0;
  }
}
</style>
