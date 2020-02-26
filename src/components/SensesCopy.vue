<template>
  <div class="readonly">
    <input
      :class="{ copied }"
      :value="content"
      type="text"
      readonly
    >
    <button
      ref="referenceButton"
      @click="copyToClipboard"
      class="btn"
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
      if (this.content) {
        copy(this.content)
        this.referenceLabel = this.copiedReference
        this.copied = true
        setTimeout(() => {
          this.copied = false
          this.$refs.referenceButton.blur()
        }, 1000)
        setTimeout(() => {
          this.referenceLabel = this.copyReference
        }, 2000)
      } else {
        console.log('No string to copy to clipboard')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/global.scss";

.readonly {
  border-radius: $border-radius;
  margin-right: 8px;
  display: grid;
  grid-template-columns: 1fr auto;

  .btn {
    border: 1px solid rgba($color-gray, 0.2);
    background-color: #fff;
    color: $color-neon;
    transition: color 2s, border-color 2s, box-shadow 2s;

    &:hover, &:focus {
      color: #000;
      transition: color 0.1s;
    }

    &.copied {
      color: $color-neon;
      border-color: $color-neon;
      transition: color 0.1s, border-color 0.1s, box-shadow 0.1s;
    }
  }

  input {
    border: 0;
    padding: $spacing / 4;
    font-size: 0.8rem;
    border: 1px solid rgba($color-gray, 0.2);
    border-right: 0;
    box-shadow: 0 0 0 $color-neon;
    transition: color 2s, border-color 2s, box-shadow 2s;

    &.copied {
      color: $color-neon;
      border-color: $color-neon;
      transition: color 0.1s, border-color 0.1s, box-shadow 0.1s;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    padding: $spacing / 4 $spacing;
    border-radius: 0 $border-radius $border-radius 0;

    &:focus {
      outline: none;
    }
  }
}

</style>
