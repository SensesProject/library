<template>
  <div class="senses-menu">
    <senses-logo color="white"/>
    <senses-falafel color="white"/>
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
  background: $color-black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $spacing / 2;
}
</style>
