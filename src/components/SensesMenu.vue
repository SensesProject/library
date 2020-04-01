<template>
  <div class="senses-menu">
    <ResizeObserver @notify="onResize"/>
    <div class="bar" :class="{ darkmode }">
      <senses-logo :color="logo && logo.color ? logo.color : darkmode ? 'white' : 'black'" href="/" v-bind="logo"/>
      <div class="falafel" @click="toggleMenu()">
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
        <div class="menu" id="senses-menu">
          <div class="about">
            <section v-if="module != null">
              <h3>{{ module.title }}</h3>
              <div class="gray tiny uppercase">{{ module.authors.join(', ').replace(/,\s([^,]+)$/, ' & $1') }}</div>
              <!-- <div class="gray tiny">{{ module.description }}</div> -->
            </section>
            <slot name="about"/>
            <section>
              <h3>About</h3>
              <div class="gray tiny">
               The SENSES <strong><a href="/">Toolkit</a></strong> offers a range of modules to learn about and explore climate change scenarios. The <strong>policy</strong> and <strong>finance portals</strong> will offer a dedicated entry point with a curated selection of modules soon.
              </div>
              <a href="/about">
                <div class="button">
                  Learn to navigate the toolkit →
                </div>
              </a>
            </section>
            <section>
              <h3>
                Funding
              </h3>
              <div class="gray tiny">
                 The project SENSES is part of the European Research Area for Climate Services (ERA4CS), an ERA-NET initiated by JPI Climate. It is funded by BMBF (DE), BMWFW (AT), NWO (NL), FORMAS (SE) with co-funding by the European Union (Grant 690462). (ERA4CS).
              </div>
            </section>
          </div>
          <nav class="nav">
            <a href="/" class="neon wrapper">
              <span class="glyph glyph-gems" />
              <span class="link uppercase">Toolkit</span>
            </a>
            <span class="disabled tiny">coming soon:</span>
            <a href="/policy-portal" class="disabled green wrapper">
                <span class="green glyph glyph-policies" />
                <span class="link">Policy Portal</span>
            </a>
            <a href="/finance-portal" class="disabled purple wrapper">
                <span class="purple glyph glyph-hurricanes" />
                <span class="link">Finance Portal</span>
            </a>
          </nav>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import 'vue-resize/dist/vue-resize.css'
import { ResizeObserver } from 'vue-resize'
import SensesLogo from './SensesLogo.vue'
import SensesFalafel from './SensesFalafel.vue'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { getUrlToResources } from '../assets/js/utils.js'
export default {
  name: 'SensesMenu',
  components: {
    SensesLogo,
    SensesFalafel,
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
    }
  },
  data () {
    return {
      open: false,
      showScreenWarning: false,
      closeScreenWarning: false,
      closeBrowserWarning: false,
      modules: []
    }
  },
  computed: {
    module () {
      return this.modules.find(m => m.id === this.id)
    }
  },
  methods: {
    onResize () {
      this.showScreenWarning = this.minWidth != null && this.minWidth >= window.innerWidth
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
    }
  },
  mounted () {
    this.onResize()
    fetch(getUrlToResources('settings/modules.json')).then(r => r.json()).then(data => {
      this.modules = data.modules
    }).catch(e => {
      this.modules = []
    })
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
    top: $spacing * 2;
    left: 0;
    height: calc(100vh - #{$spacing * 2});
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    padding: 0 $spacing / 2;

    background: transparentize($color-white, 0.02);
    @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
      background: transparentize($color-white, 0.15);
      -webkit-backdrop-filter: saturate(180%) blur(10px);
      backdrop-filter:saturate(180%) blur(10px)
    }
    --border-color: #{getColor(gray, 90)};
    --policy-color: #{getColor(green, 50)};
    --finance-color: #{getColor(purple, 50)};
    --toolkit-color: #{getColor(neon, 50)};

    &.fade-enter-active, &.fade-leave-active {
      transition: opacity $transition;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }

    .menu {
      display: grid;
      overflow: auto;
      grid-template-columns: 2fr 1fr;
      gap: 0 $spacing * 2;
      max-width: 800px;
      width: 100%;

      @include max-width($narrow) {
        grid-template-columns: auto;
        grid-template-rows: auto 1fr;
      }

      .about {
        width: 100%;
        padding: $spacing / 2 0;
        section {
          margin: $spacing / 2 0 $spacing;
          h3 {
            text-transform: uppercase;
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
          }
        }
      }

      .nav {
        display: flex;
        flex-direction: column;
        margin-top: $spacing / 2;

        @include max-width($narrow) {
          grid-row: 1 / 2;
        }

        .disabled {
          opacity: 0.5;
          pointer-events: none;
          &.tiny {
            margin-top: $spacing / 2;
          }
        }

        a {
          background: none;
          display: flex;
          align-items: center;
          white-space: nowrap;

          &:hover {
            @include tint(color);
          }

          .glyph {
            transform: scale(2.6);
            // position: absolute;
            // padding: 0 $spacing 0 0;
            @include tint(color);

            @include max-width($narrow) {
              transform: scale(2);
              font-size: 1em;
            }
          }

          .link {
            padding: $spacing / 2 0 $spacing / 2 $spacing / 2;

            @include max-width($narrow) {
              padding: $spacing / 4 $spacing / 2 $spacing / 4 0;
            }
          }

          @include max-width($narrow) {
            justify-content: flex-end;
            align-items: center;
            flex-direction: row-reverse;
          }
        }
      }
    }
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
      .nav {
        a {
          color: $color-white;
        }
      }
    }
  }
}
</style>
