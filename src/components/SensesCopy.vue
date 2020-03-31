<template>
  <div class="sensesCopy">
    <input
      :class="['input', 'mono', { copied }]"
      :value="content"
      type="text"
      readonly
    >
    <button
      v-if="content"
      ref="referenceButton"
      @click="copyToClipboard"
      :class="['button', { copied }]"
    >
      {{ referenceLabel }}
    </button>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  name: 'SensesCopy',
  props: {
    content: {
      type: String,
      default: '',
      docs: 'String that is displayed and copied to the clipboard'
    }
  },
  data () {
    const copyReference = 'Click to copy'
    const copiedReference = 'Copied to clipboard'
    return {
      copyReference,
      copiedReference,
      copied: false,
      referenceLabel: copyReference
    }
  },
  methods: {
    copyToClipboard () {
      const { content, copiedReference, copyReference } = this
      if (content) {
        copy(content)
        this.referenceLabel = copiedReference
        this.copied = true
        setTimeout(() => {
          this.copied = false
          this.$refs.referenceButton.blur()
        }, 1000)
        setTimeout(() => {
          this.referenceLabel = copyReference
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/global.scss";

.sensesCopy {
  border-radius: $border-radius;
  margin-right: 8px;
  display: flex;
  width: 100%;
  align-content: stretch;
  grid-template-columns: 1fr auto;

  .input {
    flex-grow: 1;
    border: 0;
    padding: $spacing / 4;
    font-size: 0.8rem;
    border: 1px solid rgba($color-gray, 0.2);
    border-right-width: 0;
    box-shadow: 0 0 0 $color-neon;
    transition: color 2s, border-color 2s, box-shadow 2s, flex 2s;

    &.copied {
      color: $color-neon;
      border-color: $color-neon;
      transition: color 0.2s, border-color 0.2s, box-shadow 0.2s, flex 0.2s;
    }

    &:focus {
      outline: none;
    }

    &:last-child {
      // If button is not visible because there is no content
      border-right: 1px solid rgba($color-gray, 0.2);
    }
  }

  .button {
    border: 1px solid rgba($color-gray, 0.2);
    background-color: #fff;
    color: $color-neon;
    transition: color 0.2s, border-color 0.2s, box-shadow 0.2s, background-color 0.2s, flex 0.2s;
    padding: $spacing / 4 $spacing;
    border-radius: 0 $border-radius $border-radius 0;
    cursor: pointer;

    @include max-width($narrow) {
      padding: $spacing / 4 $spacing / 2;
    }

    &:hover, &:focus {
      background-color: $color-neon;
      color: #fff;
    }

    &:focus {
      outline: none;
    }

    &.copied {
      color: $color-neon;
      border-color: $color-neon;
      transition: color 2s, border-color 2s, box-shadow 2s, background-color 2s, flex 2s;

      &:hover, &:focus {
        color: #fff;
      }
    }
  }
}

</style>
