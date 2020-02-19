<template>
  <modal
    :scrollable="scrollable"
    name="download"
    height="auto"
    :width="width"
  >
    <h1>Senses Download {{ test }}</h1>
  </modal>
</template>

<script>
export default {
  name: 'SensesDownload',
  props: {
    scrollable: {
      type: Boolean,
      default: true,
      docs: 'Is the modal scrollable'
    },
    width: {
      type: Number,
      default: 800,
      docs: 'Width of the modal in px'
    },
    test: {
      type: String,
      default: 'Foo'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";
</style>

<style lang="scss">
@import "../style/global.scss";
</style>
