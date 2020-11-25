<template>
  <div id="app">
    <div class="menu-bar">
      <nav>
        <router-link class="root index" to="/">Library</router-link>
        <router-link to="/style">Style</router-link>
        <router-link to="/components">Components</router-link>
      </nav>
      <SensesLogo color="black"/>
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>
<script>
import SensesLogo from '@/components/SensesLogo.vue'
export default {
  components: { SensesLogo }
}
</script>
<style lang="scss">
$font-prefix: './assets/fonts';
@import "/style/base";
a {
  color: $color-black;
}
// .invert {
//   color: $color-white;
//   background: $color-black;
//
//   a {
//     color: $color-white;
//   }
// }
</style>
<style scoped lang="scss">
@import "/style/variables";
#app {
  min-height: 100vh;
  .menu-bar {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding-right: $spacing / 2;
    border-bottom: 1px solid $color-neon;
    margin-bottom: $spacing / 2;

    nav {
      display: flex;
      align-items: flex-start;
      justify-content: center;

      a {
        font-weight: $font-weight-bold;
        margin: $spacing / 2 0 $spacing / 2 $spacing / 2;
        background: none;
        &.router-link-active {
          color: $color-neon;
          &.index {
            color: $color-default;
            &.router-link-exact-active {
              color: $color-neon;
            }
          }
        }
      }
    }
  }

  .page {
    padding: 0 $spacing / 2;
    display: flex;
    justify-content: center;
  }
}
</style>
