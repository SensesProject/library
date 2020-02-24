<template>
  <div class="senses-menu">
    <senses-logo color="black"/>
    <span v-if="message" class="message">{{ message }}</span>
    <senses-falafel color="black"/>
  </div>
</template>

<script>
import SensesLogo from './SensesLogo.vue'
import SensesFalafel from './SensesFalafel.vue'
export default {
  name: 'SensesMenu',
  components: {
    SensesLogo,
    SensesFalafel
  },
  props: {
    message: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.senses-menu {
  width: 100%;
  height: $spacing * 2;
  background: transparentize($color-white, 0.02);
  display: flex;
  align-items: center;
  padding: 0 $spacing / 2;
  position: sticky;
  top: 0;
  z-index: 100;

  @supports ((-webkit-backdrop-filter: saturate(180%) blur(20px)) or(backdrop-filter: saturate(180%) blur(20px))) {
    background: transparentize($color-white, 0.15);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter:saturate(180%) blur(10px)
  }

  .message {
    margin-left: $spacing / 2;
    font-size: 1em;
    font-weight: $font-weight-regular;
    letter-spacing: 1em / 3.5 * 0.125;
    text-transform: uppercase;
    color: $color-red;
  }

  & > *:last-child {
    margin-left: auto;
  }
}
</style>
