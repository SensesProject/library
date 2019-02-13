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
    height: 4rem;
    border-bottom: 1px solid $color-pale-gray;
  }
}
</style>
