<template>
  <div class="module-meta" v-if="module">
    <header class="meta-header">
      <h1 class="mono">
        {{ title }}
      </h1>
    </header>
    <div class="meta-content">
      <section>
        <span class="caption">Authors</span>
        <span>{{ authors }}</span>
      </section>
      <section>
        <span class="caption">Link</span>
        <SensesCopy :content="link" />
      </section>
      <section v-if="downloads.length">
        <span class="caption">Printable resources</span>
        <span class="btn--link clickable" @click="() => downloadVisible = !downloadVisible">View {{ downloads.length }} {{ downloads.length > 1 ? 'packages' : 'package' }} for download</span>
      </section>
      <section v-if="gems">
        <span class="caption">Data used in this module</span>
        <a :href="gems" class="btn--link">View {{ gemsAmount ? gemsAmount : '' }} guided explore module{{ gemsAmount === 1 ? '' : 's' }}&nbsp;<i>&nearr;</i></a>
      </section>
      <section class="sources" v-if="sources">
        <span class="caption">Sources</span>
        <ul>
          <li v-for="([label, link], n) in sources" :key="n" class="item">
            <a v-if="link" :href="link">{{ label }}</a>
            <span v-else>{{ label }}</span>
          </li>
        </ul>
      </section>
    </div>
    <footer class="meta-footer">
      <nav class="meta-nav">
        <section class="toolkit">
          <a href="https://dev.climatescenarios.org" class="wrapper">
            <div>
              <span class="glyph glyph-gems" />
            </div>
            <div>
              <span>Visit the <strong>toolkit</strong> to find all modules</span>
            </div>
          </a>
        </section>
        <section class="policy">
          <a class="wrapper">
            <div>
              <span class="glyph glyph-policies" />
            </div>
            <div>
              <span>Visit the <strong>Policy</strong> portal for a curated path&nbsp;&nearr;</span>
            </div>
          </a>
        </section>
        <section class="finance">
          <a class="wrapper">
            <div>
              <span class="glyph glyph-hurricanes" />
            </div>
            <div>
              <span>Visit the <strong>Finance</strong> portal for a curated path&nbsp;&nearr;</span>
            </div>
          </a>
        </section>
      </nav>
    </footer>
    <SensesDownload
      :visible="downloadVisible"
      :ids="downloadIDs"
      :title="title"
      :close="() => downloadVisible = false" />
  </div>
</template>

<script>
import { get, find } from 'lodash'
import axios from 'axios'
import SensesCopy from './SensesCopy.vue'
import SensesDownload from './SensesDownload.vue'
import { chain } from '../assets/js/utils.js'

export default {
  name: 'SensesMeta',
  docs: 'In regular Vue and SPA Nuxt you need to add the modal with these lines:<br /><code class="highlight">import Vue from \'vue\'<br />import VModal from \'vue-js-modal\'<br />Vue.use(VModal)</code><br /><br />Universal Nuxt projects need to create plugin called <code class="highlight">vue-js-modal.js</code> witht this content:<br /><code class="highlight">import Vue from \'vue\'<br />import VModal from \'vue-js-modal/dist/ssr.index\'<br />Vue.use(VModal)</code><br /><br />And add these lines to <code class="highlight">nuxt.config.js</code>:<br /><code class="highlight">plugins: [<br />\'~plugins/vue-js-modal.js\'<br />]',
  components: {
    SensesCopy,
    SensesDownload
  },
  props: {
    id: {
      type: [String, Boolean],
      default: false,
      docs: 'ID of the module'
    }
  },
  data () {
    return {
      modules: [],
      downloadVisible: false
    }
  },
  computed: {
    module () {
      const { modules, id } = this
      return find(modules, { id })
    },
    title () {
      return get(this.module, 'title', 'unnamed module')
    },
    authors () {
      return chain(get(this.module, 'authors', []))
    },
    link () {
      return `https://dev.climatescenarios.org/${get(this.module, 'path')}`
    },
    downloads () {
      return get(this.module, 'downloadIDs', [])
    },
    gems () {
      return get(this.module, 'gems')
    },
    gemsAmount () {
      return get(this.module, 'gemsAmount')
    },
    downloadIDs () {
      return get(this.module, 'downloadIDs', [])
    },
    sources () {
      return get(this.module, 'sources')
    }
  },
  mounted () {
    // Load the list of downloads
    this.loadModules()
  },
  methods: {
    loadModules () {
      axios.get('https://dev.climatescenarios.org/settings/modules.json')
        .then((response) => {
          const modules = get(response, ['data', 'modules'], [])
          // console.info(`Fetched ${modules.length} modules`)
          this.modules = modules
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/global.scss";

.module-meta {
  background: #fff;
  border: 1px solid getColor(gray, 80);
  border-radius: $border-radius * 2;
  padding: $spacing;

  @include max-width($narrow) {
    padding: $spacing / 2;
  }
  display: grid;
  grid-row-gap: $spacing;

  .meta-content {
    display: grid;
    grid-gap: $spacing $spacing;
    grid-template-columns: repeat(2, 1fr);

    @include max-width($narrow) {
      grid-template-columns: repeat(1, 1fr);
    }

    a {
      background: none;
      color: #000;
    }

    .sources {
      ul li {
        margin-left: $spacing;
        margin-bottom: $spacing / 4;
      }
    }

    .caption {
      display: block;
      color: getColor(grey, 50);
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .item {
      a {
        &:hover {
          color: $color-neon;
        }
      }
    }

    .btn--link {
      background: #fff;
      border: 1px solid getColor(gray, 80);
      color: $color-deep-gray;
      border-radius: $border-radius * 2;
      padding: 4px 8px 4px;
      margin-top: $spacing / 8;
      display: inline-block;

      &:hover {
        color: $color-neon;
      }
    }
  }

  .meta-footer {
    @include center();
    flex-direction: column;
  }

  .meta-nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 1100px;
    margin-bottom: $spacing;

    @include max-width($narrow) {
      grid-template-columns: repeat(1, 1fr);
    }

    .wrapper {
      padding: $spacing / 2 $spacing / 1.5 $spacing / 2 0;
      display: flex;
      height: 100%;

      @include media-query($medium) {
        padding: $spacing;
      }
    }

    section {
      &, & > * {
        @include center();
      }

      a {
        background: none;
        color: #000;
      }

      .glyph {
        font-size: 2.6rem;
        margin-right: $spacing / 2;
      }

      &.toolkit {
        strong, .glyph {
          color: $color-neon;
        }

        a:hover, a:focus {
          color: $color-neon;
        }
      }

      &.policy {
        a {
          cursor: default;
        }

        strong, .glyph {
          color: $color-green;
        }

        a:hover, a:focus {
          strong, .glyph, span, & {
            color: $color-gray;
          }
        }
      }

      &.finance {
        a {
          cursor: default;
        }

        strong, .glyph {
          color: $color-purple;
        }

        a:hover, a:focus {
          strong, .glyph, span, & {
            color: $color-gray;
          }
        }
      }
    }
  }

  .footer-share {
    display: grid;
    list-style: none;
    justify-content: space-between;
    grid-gap: $spacing;
    grid-auto-flow: column;

    @include max-width($narrow) {
      grid-auto-flow: row;
    }
  }
}
</style>
