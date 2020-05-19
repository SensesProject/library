<template>
  <client-only>
    <modal
      :scrollable="true"
      :width="900"
      @closed="closed"
      name="download"
      height="auto"
    >
      <div class="page-download">
        <header class="download-header">
          <h1 class="mono">
            {{ title }}
          </h1>
          <span v-if="downloadElements.length" class="caption">Available downloads</span>
          <ul v-if="downloadElements.length" class="list">
            <li
              v-for="element in downloadElements"
              :key="element.id"
              :class="{ isActive: element.isActive, clickable: !element.isActive }"
              @click="() => setActive(element.id)"
            >
              {{ element.label }}
            </li>
          </ul>
          <span v-else>No downloads available for this module</span>
        </header>
        <div v-if="activeID && item" class="download-content">
          <div class="download-download">
            <h2 class="download-title">{{ item.label }}</h2>
            <div>
              <a :href="item.link" class="btn btn--action">Download</a>
            </div>
            <p class="description">
              {{ item.description }}
            </p>
          </div>
          <dl class="download-details">
            <dt class="caption">
              Preview
            </dt>
            <dd class="gallery">
              <ul class="previews">
                <li
                  v-for="(element, i) in item.previews"
                  :key="i"
                  class="preview">
                  <img :src="`https://dev.climatescenarios.org/share/${element}`">
                </li>
              </ul>
            </dd>
            <dt class="caption">
              Authors
            </dt>
            <dd>{{ author }}</dd>
            <dt v-if="reference" class="caption">
              Reference
            </dt>
            <dd v-if="reference">
              <SensesCopy :content="item.reference" />
            </dd>
            <dt class="caption">
              Licence
            </dt>
            <dd>
              <span>Creative Commons Attribution-ShareAlike 4.0 International</span>
              <aside class="licence-details">
                <span>You are free to</span>
                <ul>
                  <li>Copy and redistribute the material in any medium or format</li>
                  <li>Remix, transform, and build upon the material for any purpose, even commercially</li>
                </ul>
                <span>Under the following terms</span>
                <ul>
                  <li>You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.</li>
                  <li>If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</li>
                  <li>You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.</li>
                </ul>
              </aside>
            </dd>
          </dl>
          <span @click="closed" class="close">&times;</span>
        </div>
        <div v-else class="download-error">
          <h2>Download can not be found</h2>
        </div>
      </div>
    </modal>
  </client-only>
</template>

<script>
// import Vue from 'vue'
import { get, map, includes, head, find, isNumber } from 'lodash'
import axios from 'axios'
// import VModal from 'vue-js-modal'
import SensesCopy from './SensesCopy.vue'
import { chain } from '../assets/js/utils.js'

// Vue.use(VModal)

export default {
  name: 'SensesDownload',
  docs: 'In regular Vue and SPA Nuxt you need to add the modal with these lines:<br /><code class="highlight">import Vue from \'vue\'<br />import VModal from \'vue-js-modal\'<br />Vue.use(VModal)</code><br /><br />Universal Nuxt projects need to create plugin called <code class="highlight">vue-js-modal.js</code> witht this content:<br /><code class="highlight">import Vue from \'vue\'<br />import VModal from \'vue-js-modal/dist/ssr.index\'<br />Vue.use(VModal)</code><br /><br />And add these lines to <code class="highlight">nuxt.config.js</code>:<br /><code class="highlight">plugins: [<br />\'~plugins/vue-js-modal.js\'<br />]',
  components: {
    SensesCopy
  },
  props: {
    visible: {
      type: [Boolean, Number],
      default: false,
      docs: 'Is the modal visible or nor. Or specify specific selected id'
    },
    title: {
      type: String,
      default: 'Untitled module',
      docs: 'Title of the module'
    },
    close: {
      type: Function,
      default: () => {},
      docs: 'Function that is called once the window closes'
    },
    ids: {
      type: Array,
      default: () => {
        return []
      },
      docs: 'List of ids of downloads for this module'
    }
  },
  data () {
    return {
      downloads: [], // A list of downloads fetched from external JSON file
      activeID: false
    }
  },
  computed: {
    availableIDS () {
      // Get a list of available download ids
      return map(this.downloads, 'id')
    },
    item () {
      // Find the download item in the list of downloads from the id
      return find(this.downloads, { id: this.activeID })
    },
    author () {
      // Extract the authors for this download
      return chain(get(this.item, 'authors', []))
    },
    reference () {
      // Extract the reference for this download
      return get(this.item, 'reference')
    },
    downloadElements () {
      // Create a list of download items for this module
      const { ids, activeID, downloads } = this
      if (ids && ids.length) {
        return map(ids, (id) => {
          const item = find(downloads, { id })
          const label = get(item, 'label', 'unnamed item')
          const isActive = id === activeID
          return {
            id,
            ...item,
            label,
            isActive
          }
        })
      }
      return []
    }
  },
  watch: {
    visible (v) {
      if (v) {
        this.setActive(isNumber(v) ? v : 0) // Call with id of download or 0 to display the first
        this.$modal.show('download')
      } else {
        this.setActive(false)
        this.$modal.hide('download')
      }
    }
  },
  mounted () {
    // Load the list of downloads
    this.loadDownloads()
  },
  methods: {
    closed () {
      // Triggered when the close button is clicked or the outer area
      this.$modal.hide('download')
      this.activeID = false
      // Exceute the function passed to the component
      this.close()
    },
    setActive (v) {
      if (v || v === 0) { // Something should be selected
        if (includes(this.availableIDS, v)) {
          // The id is present in the list of downloads
          this.activeID = v
        } else if (this.ids.length) {
          // The module has a list of downloads
          const first = head(this.ids) // Get the first in the list
          if (includes(this.availableIDS, first)) { // Check again if id present
            this.activeID = first // Select the first one
          } else {
            this.activeID = false // Set active element to false
          }
        } else {
          this.activeID = false // Set active element to false
        }
      } else {
        // Set the active element to false
        this.activeID = false
      }
    },
    loadDownloads () {
      axios.get('https://dev.climatescenarios.org/settings/downloads.json')
        .then((response) => {
          this.downloads = response.data.downloads
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/global.scss";

$spacing-horizontal: $spacing * 2;
$spacing-vertical: $spacing;
$spacing-vertical-small: $spacing-vertical / 3 * 2;

.page-download {
  display: grid;
  grid-row-gap: $spacing-vertical;
  position: relative;
  z-index: 10;

  .download-download, .download-details {
    margin: $spacing $spacing-horizontal;
    margin-bottom: 0;
    margin-top: 0;
  }

  .download-download {
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: $spacing;
    grid-row-gap: $spacing;
    margin-bottom: $spacing-vertical-small;
    align-items: start;

    .download-title {
      font-size: 1.8rem;
    }

    .btn--action {
      background-color: $color-neon;
      display: block;
      text-align: center;
      padding: $spacing / 3 0;
      color: #fff;
      border-radius: $border-radius;
      box-shadow: $box-shadow--weak;
      transition: transform $transition, background-color $transition, color $transition, box-shadow $transition;

      &:hover, &:focus {
        background: getColor(neon, 45);
        border: none;
      }
    }

    .description {
      grid-column-end: span 2;
    }
  }

  .download-header {
    padding: $spacing $spacing-horizontal;
    border-bottom: 1px solid getColor(gray, 80);

    h1 {
      font-size: 2.3rem;
      font-style: italic;
      line-height: 1;
      letter-spacing: -0.02em;
      margin-bottom: $spacing;
    }

    .list {
      list-style: none;

      li {
        padding: 0.2em 1em 0.2em 1.6em;
        list-style-position: inside;
        text-indent: -1.6em;
        line-height: 1.5em;
        color: $color-neon;

        &:hover, &:hover {
          color: getColor(neon, 40);
        }

        &.isActive {
          color: #000;
        }

        &:before {
          content: "— ";
          color: getColor(gray, 80);
          margin-right: 0.3em;
        }
      }
    }
  }

  .download-details {
    margin-bottom: $spacing-vertical;

    dd {
      margin-bottom: $spacing-vertical-small;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    .gallery {
      position: relative;
      height: 200px;

      .previews {
        width: 100%;
        overflow-y: scroll;
        display: flex;
        flex-direction: row;
        list-style: none;
        position: absolute;

        .preview {
          height: 200px;
          padding: $spacing / 4;

          img {
            height: 100%;
            width: auto;
            box-shadow: $box-shadow--default;
          }
        }
      }
    }

    .licence-details {
      padding-top: $spacing-vertical-small;

      ul {
        font-size: 0.8rem;
      }

      strong {
        font-size: 0.9rem;
      }

      ul {
        margin-left: $spacing;
        margin-bottom: $spacing / 2;
      }
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
    display: inline-block;
    color: $color-neon;
    cursor: pointer;
    speak: none;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-top: $spacing / 3;
    margin-right: $spacing / 2;

    &:hover, &:focus {
      color: getColor(neon, 40);
    }
  }

  .download-error {
    @include center();
    margin-bottom: $spacing;
  }
}

</style>
