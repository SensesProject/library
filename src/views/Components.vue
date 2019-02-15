<template>
  <div class="components">
    <div class="select">
      <select>
        <option value="SensesLogo">SensesLogo</option>
      </select>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
// const HelloWorld = () => import('@/components/HelloWorld.vue')
// import asyncComponent from '@/components/asyncComponent'

export default {
  name: 'home',
  components: {
    // HelloWorld: () => import(/* webpackChunkName: "view-[request2]" */ `@/components/${this.component}.vue`)
  },
  data () {
    return {
      // component: 'HelloWorld'
    }
  }
}
</script>
<style scoped lang="scss">
@import "../style/variables";

.components {
  display: flex;
  justify-content: center;
  flex-direction: column;

  select {
    font-size: 1rem;
    color: $color-black;
    font-family: $font-sans;
  }
}
</style>
