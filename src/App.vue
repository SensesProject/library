<template>
  <div id="app">
    <nav>
      Library
      <router-link to="/">Style</router-link> |
      <router-link to="/components">Components</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "/style/base";
#app {
  font-family: 'IBM Plex Sans', sans-serif;
}
</style>
<style scoped lang="scss">
@import "/style/variables";
#app {
  nav {
    width: 100vw;
    height: 4rem;
    border-bottom: 1px solid $color-pale-gray;
  }
}
</style>
