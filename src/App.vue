<template>
  <div id="app">
    <div class="menu-bar">
      <nav>
        <router-link class="root index" to="/">Library</router-link>
        <router-link class="serif" to="/style">Style</router-link>
        <router-link class="mono" to="/components">Components</router-link>
      </nav>
      <SensesLogo color="green"/>
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

    nav {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: $spacing / 4;

      a {
        font-weight: $font-weight-bold;
        margin: $spacing / 2 0 $spacing / 2 $spacing / 2;

        &.router-link-active {
          $underline: $spacing * 0.185;
          background: linear-gradient(0deg,transparent,transparent $underline,$color-green $underline,$color-green calc(#{$underline} + 2px),transparent 0);
          &.index {
            background: none;
            &.router-link-exact-active {
              background: linear-gradient(0deg,transparent,transparent $underline,$color-green $underline,$color-green calc(#{$underline} + 2px),transparent 0);
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
