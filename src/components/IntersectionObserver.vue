<template>
  <div class="intersection-observer" ref="intersect">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'IntersectionObserver',
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
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    const { step, $refs, $store, observerOptions } = this
    const observer = new window.IntersectionObserver(entries => {
      if (entries.filter(entry => entry.isIntersecting).length < 1) return
      $store.commit('scrollytelling/setStep', step)
    }, observerOptions)

    observer.observe($refs.intersect)
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.layout-scrollytelling {
  display: flex;
  justify-content: center;

  .text {
    width: 100%;
    max-width: 480px;
    min-height: 100vh;
    flex: 1;
    padding: 0 $spacing / 2 $spacing / 2 $spacing / 2;
    background: $color-black;
    color: $color-white;

    header {
      padding: $spacing / 2 0;
      position: sticky;
      top: 0;
      background: linear-gradient(to top, transparentize($color-black, 1), transparentize($color-black, 0.2) $spacing / 3);
      // backdrop-filter: blur(10px);
    }
  }
  .vis {
    width: 100%;
    max-width: 960px;
    flex: 1.5;
    height: 100vh;
    padding: $spacing / 2;
    position: sticky;
    top: 0;

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content:  center;
      align-items: center;
      position: relative;

      > div {
        position: absolute;
        // width: 100%;
        // height: 100%;
      }
    }
  }

}
</style>
