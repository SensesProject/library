<template>
  <div class="intersection-observer" ref="intersect" :class="[classes, { default: !noStyling }]">
    <div :class="[{ default: !noStyling, darkmode }, align]">
      <slot>
        <h2>Step {{ step }}</h2>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntersectionObserver',
  docs: 'This component is designed to be used inside the text slot of the LayoutScrollytelling component. When it intersects with the the rectangle defined as rootMargin in observerOptions it will emit the value of the property step',
  props: {
    step: {
      type: Number,
      default: 0,
      docs: 'Value that gets emitted when the component starts intersecting'
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
    },
    darkmode: {
      type: Boolean,
      default: false,
      docs: 'enable darkmode'
    },
    classes: {
      type: String,
      default: '',
      docs: 'classes to be added to the wrapper div'
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

    &.darkmode {
      background: transparentize($color-black, 0.02);
      color: $color-white;

      @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
        background: transparentize($color-black, 0.15);
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        backdrop-filter:saturate(180%) blur(10px)
      }
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
