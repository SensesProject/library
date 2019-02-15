<template>
  <div id="app">
    <div class="menu-bar">
      <nav>
        <router-link class="root index" to="/">Library</router-link>
        <router-link class="serif" to="/style">Style</router-link>
        <router-link class="mono" to="/components">Components</router-link>
      </nav>
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
@import "/style/base";
</style>
<style scoped lang="scss">
@import "/style/variables";
#app {
  .menu-bar {
    width: 100vw;
    display: flex;
    justify-content: space-between;
  }
  nav {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: $spacing / 4;

    a {
      color: $color-black;
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

  .page {
    padding: 0 $spacing / 2;
    display: flex;
    justify-content: center;
  }
}
</style>
