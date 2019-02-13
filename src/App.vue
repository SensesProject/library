<template>
  <div id="app">
    <nav>
      <router-link class="index" to="/"><h1>Library</h1></router-link>
      <router-link class="subpage" to="/style">Style</router-link>
      <router-link class="subpage" to="/components">Components</router-link>
    </nav>
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
  nav {
    width: 100vw;
    padding: 0 $spacing * 0.75;
    // background: $color-pale-gray;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 1rem;
    }

    a {
      color: $color-black;
      text-decoration: none;
      padding: $spacing / 2 $spacing / 4;

      &.index.router-link-exact-active {
        color: $color-accent;
        border-bottom: 2px solid $color-accent;
        padding-bottom: calc(#{$spacing / 2} - 2px);
      }

      &.subpage.router-link-active {
        color: $color-accent;
        border-bottom: 2px solid $color-accent;
        padding-bottom: calc(#{$spacing / 2} - 2px);
      }
    }
  }

  .page {
    padding: $spacing / 2 $spacing;
    display: flex;
    justify-content: center;
  }
}
</style>
