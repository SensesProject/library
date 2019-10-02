<template>
  <div class="-test-component" :class="[color, { invert }]" :style="{'border-top-width': offset ? `${offset}rem` : '1px', opacity}">
    <h1>{{ heading }}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</template>

<script>
export default {
  name: '_TestComponent',
  props: {
    offset: Number,
    color: String,
    invert: Boolean,
    opacity: Number,
    heading: String
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";
.-test-component {
  padding: $spacing / 4;
  border: 1px solid;

  h1 {
    margin-bottom: $spacing / 2;
  }

  &.violet {
    color: $color-violet;
    border-color: $color-violet;
  }
  &.blue {
    color: $color-blue;
    border-color: $color-blue;
  }
  &.green {
    color: $color-green;
    border-color: $color-green;
  }
  &.yellow {
    color: $color-yellow;
    border-color: $color-yellow;
  }
  &.purple {
    color: $color-purple;
    border-color: $color-purple;
  }
  &.black {
    color: $color-black;
    border-color: $color-black;
  }

  &.invert {
    color: $color-white;

    &.violet {
      background: $color-violet;
    }
    &.blue {
      background: $color-blue;
    }
    &.green {
      background: $color-green;
    }
    &.yellow {
      background: $color-yellow;
    }
    &.purple {
      background: $color-purple;
    }
    &.black {
      background: $color-black;
    }
  }

}
</style>
