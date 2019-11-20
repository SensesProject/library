<template>
  <div class="intersection-observer intersection-observer-fracture" ref="intersect" :class="{ default: !noStyling }">
    <div :class="[{ default: !noStyling, active }, align]">
      <slot>
        <h2>Step {{ step }} – {{ step + stepSize }}</h2>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntersectionObserverFracture',
  docs: 'This component is designed to be used inside the text slot of the LayoutScrollytelling component. While it intersects with the the rectangle defined as rootMargin in observerOptions it will emit the scroll-progress as a range between the property step and step + stepSize.',
  props: {
    step: {
      type: Number,
      default: 0,
      docs: 'Lower bound of the values emitted while intersecting'
    },
    stepSize: {
      type: Number,
      default: 1,
      docs: 'Size of the step. step + stepSize equals the upper bound of the values emitted while intersecting'
    },
    observerOptions: {
      type: Object,
      default () {
        return {
          rootMargin: `-${0.5 * 100}% 0% -${100 - 0.5 * 100}% 0%`
        }
      },
      docs: 'Options passed to the intersection observer. → https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API'
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
      active: false
    }
  },
  mounted () {
    this.$emit('step', 'start')
    const { step, $refs, observerOptions } = this
    const observer = new window.IntersectionObserver(entries => {
      if (entries.filter(entry => entry.isIntersecting).length < 1) {
        this.active = false
        return
      }
      this.$parent.$emit('step', step)
      requestAnimationFrame(this.watch)
      this.active = true
    }, observerOptions)

    observer.observe($refs.intersect)
  },
  methods: {
    watch () {
      const { active, $refs, step, stepSize } = this
      const rect = $refs.intersect.getBoundingClientRect()
      const offset = innerHeight * 0.5
      const scroll = Math.max(Math.min((offset - rect.top) / rect.height, 1), 0)
      this.$parent.$emit('step', step + scroll * stepSize)
      if (active) requestAnimationFrame(this.watch)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.intersection-observer {
  display: flex;
  flex-direction: column;
  .default {
    pointer-events: all;
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

  // &.default {
  //   padding: 80vh 0 50vh;
  // }
  // + .default {
  //   padding: 30vh 0 50vh;
  // }
}
</style>
