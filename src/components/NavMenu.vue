<template>
  <div class="nav-menu">
    <senses-logo color="white"/>
    <nav-falafel color="white"/>
  </div>
</template>

<script>
import SensesLogo from './SensesLogo.vue'
import NavFalafel from './NavFalafel.vue'
export default {
  name: 'NavMenu',
  components: {
    SensesLogo,
    NavFalafel
  },
  props: {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.nav-menu {
  width: 100%;
  height: $spacing * 2;
  background: $color-black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $spacing / 2;
}
</style>
