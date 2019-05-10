<template>
  <div class="vis-scatter-demo">
    <VisScatter
      :raw-data="data[0]"
      plot-title="United Arab Emirates"
      vs="year"
      y-axis-label="Land area affected by crop failure (relative changes)"/>
    <VisScatter
      :raw-data="data[0]"
      vs="change"
      y-axis-label="Land area affected by crop failure (relative changes)"/>
    <VisScatter
      :raw-data="data[1]"
      plot-title="Italy"
      vs="year"
      y-axis-label="Land area affected by crop failure (relative changes)"/>
    <VisScatter
      :raw-data="data[1]"
      vs="change"
      y-axis-label="Land area affected by crop failure (relative changes)"/>
    <VisScatter
      :raw-data="data[2]"
      plot-title="Italy"
      vs="year"
      y-axis-label="Land area affected by heatwaves (relative changes)"/>
    <VisScatter
      :raw-data="data[2]"
      vs="change"
      y-axis-label="Land area affected by heatwaves (relative changes)"/>
  </div>
</template>

<script>
import data from '../assets/library/data/json_importer'
import VisScatter from './VisScatter'

export default {
  name: 'VisScatterDemo',
  components: {
    VisScatter
  },
  data () {
    return {
      data
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";
</style>
