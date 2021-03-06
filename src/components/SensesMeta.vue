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
      <section>
        <span class="caption">Last update</span>
        <span>{{ lastUpdate }}</span>
      </section>
      <section class="sources" v-if="sources.length || localSources">
        <span class="caption">References</span>
        <slot>
          <ul>
            <li v-for="([label, link], n) in sources" :key="n" class="item">
              <a v-if="link" :href="link">{{ label }}</a>
              <span v-else>{{ label }}</span>
            </li>
          </ul>
        </slot>
      </section>
    </div>
    <footer class="meta-footer">
      <nav class="meta-nav">
        <section class="toolkit">
          <a :href="getUrlToResources('')" class="wrapper">
            <div>
              <span class="glyph glyph-toolkit-thick" />
            </div>
            <div>
              <span>Visit the <strong>toolkit</strong> to find all modules</span>
            </div>
          </a>
        </section>
        <section class="policy">
          <a class="wrapper">
            <div>
              <span class="glyph glyph-policies-thick" />
            </div>
            <div>
              <span>The <strong>Policy</strong> portal is launching soon&nbsp;&nearr;</span>
            </div>
          </a>
        </section>
        <section class="finance">
          <a class="wrapper">
            <div>
              <span class="glyph glyph-finance-thick" />
            </div>
            <div>
              <span>The <strong>Finance</strong> portal is launching soon&nbsp;&nearr;</span>
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
import SensesCopy from './SensesCopy.vue'
import SensesDownload from './SensesDownload.vue'
import { chain, getUrlToResources } from '../assets/js/utils.js'

export default {
  name: 'SensesMeta',
  docs: 'Since this component uses <code class="highlight gray no-hover">SensesDownload</code>, it’s important to set mode to <code class="highlight gray no-hover">spa</code> in <code class="highlight gray no-hover">nuxt.config.js</code>, when running in Nuxt.',
  components: {
    SensesCopy,
    SensesDownload
  },
  props: {
    id: {
      type: [String, Boolean],
      default: false,
      docs: 'ID of the module'
    },
    localSources: {
      type: Boolean,
      default: false,
      docs: 'set to true when providing sources by slot instead of global modules config'
    }
  },
  data () {
    return {
      modules: [],
      downloadVisible: false,
      getUrlToResources
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
      return getUrlToResources(get(this.module, 'path'), true)
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
      return get(this.module, 'sources', [])
    },
    lastUpdate () {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const d = new Date(get(this.module, 'lastUpdate'))
      if (d instanceof Date && !isNaN(d)) {
        return `${monthNames[d.getMonth()]} ${d.getFullYear()}`
      } else {
        return false
      }
    }
  },
  mounted () {
    // Load the list of downloads
    this.loadModules()
  },
  methods: {
    loadModules () {
      fetch(getUrlToResources('settings/modules.json'))
        .then(response => response.json())
        .then(data => {
          this.modules = get(data, ['modules'], [])
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

    .sources {
      grid-column-end: span 2;
    }

    @include max-width($medium) {
      grid-template-columns: repeat(1, 1fr);

      .sources {
        grid-column-end: span 1;
      }
    }

    a {
      background: none;
      color: $color-black;
    }

    .sources::v-deep {
      ul li {
        margin-left: $spacing;
        margin-bottom: $spacing / 4;

        a {
          background: none;
          color: $color-black;

          &:hover {
            color: $color-neon;
          }
        }
      }
    }

    .caption {
      display: block;
      color: getColor(grey, 50);
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      & + span {
        display: inline-block;
        margin-top: 0.3rem;
      }

      & + ul {
        margin-top: 0.5rem;
      }
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
        color: $color-black;
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
