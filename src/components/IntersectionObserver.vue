<template>
  <div class="intersection-observer" ref="intersect" :class="{ default: !noStyling }">
    <div :class="[{ default: !noStyling }, align]">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntersectionObserver',
  docs: 'This component only works within LayoutScrollytelling.vue<br>It is used to commit its property <code>step</code> to vuex <code>scrollytelling/step</code> when it becomes visible.',
  props: {
    step: Number,
    offset: {
      type: Number,
      default: 0.5
    },
    observerOptions: {
      type: Object,
      default () {
        return {
          rootMargin: `-${0.5 * 100}% 0% -${100 - 0.5 * 100}% 0%`
        }
      }
    },
    noStyling: {
      type: Boolean,
      default: false,
      docs: 'Setting this to false disables the default styling (e.g., background-color, border, …)'
    },
    align: {
      type: String,
      default: 'center',
      docs: `horizontally position the content, either 'left', 'center', or 'right'. has no effect if noStyling is set to true.`
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$emit('step', 'start')
    const { step, $refs, observerOptions } = this
    const observer = new window.IntersectionObserver(entries => {
      if (entries.filter(entry => entry.isIntersecting).length < 1) return
      this.$parent.$emit('step', step)
    }, observerOptions)

    observer.observe($refs.intersect)
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.intersection-observer {
  display: flex;
  flex-direction: column;
  .default {
    hyphens: auto;
    max-width: 460px;
    background: transparentize($color-white, 0.02);
    padding: $spacing / 2;

    @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
      background: transparentize($color-white, 0.15);
      -webkit-backdrop-filter: saturate(180%) blur(10px);
      backdrop-filter:saturate(180%) blur(10px)
    }

    &.left {
      align-self: flex-start;
    }

    &.center {
      align-self: center;
    }

    &.right {
      align-self: flex-end;
    }
  }

  &.default {
    padding: 80vh 0 50vh;
  }
  + .default {
    padding: 30vh 0 50vh;
  }
}
</style>
