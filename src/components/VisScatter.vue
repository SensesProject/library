<template>
  <div class="vis-scatter">
    <svg :width="width" :height="height"
      :style="{'font-size': `${em}em`}">
      <defs>
      </defs>
      <text class="label x-label" ref="yAxisLabel" :y="height" :x="width">{{ xAxisLabel }}</text>
      <text class="label y-label" :y="textHeight">{{ yAxisLabel }}</text>
      <g class="values">
        <circle v-for="(v, i) in data" :key="`value-${i}`" :class="{active: tooltip && tooltip.x === v.x && tooltip.y === v.y}"
        :style="{transform: `translate(${v.x}px, ${v.y}px)`, fill: v.fill, opacity: v.opacity}"
        :r="circleRadius"/>
      </g>
      <g class="axes">
        <g class="axis x-axis" :transform="`translate(0 ${height - yBottomPadding + lineHeight / 2 + textPadding})`">
          <line :x1="circleRadius" :x2="width - circleRadius"/>
          <g class="tick x-tick"
            v-for="t in xAxisTicks"
            :key="`x-tick-${t.tick}`"
            :transform="`translate(${t.x} 0)`">
            <line :y2="tickSize"/>
            <text :x="t.textOffset" :y="yBottomPadding - lineHeight * 1.5 - textPadding">{{ t.tick }}</text>
          </g>
        </g>
        <g class="axis y-axis">
          <g class="tick y-tick"
            v-for="t in yAxisTicks"
            :key="`y-tick-${t.tick}`"
            :transform="`translate(0 ${t.y})`">
            <!-- <line :x2="tickSize"/> -->
            <text :y="lineHeight / 2 - textPadding">{{ t.tick }}</text>
          </g>
        </g>
      </g>
      <g class="voronoi">
        <polygon v-for="(p, i) in polygons.filter(p => p !== undefined)" :key="`p-${i}`"
          :points="p.points"
          @mouseover="showTooltip(p.data)"
          @mouseout="showTooltip(null)"/>
      </g>
    </svg>
    <div class="tooltip" :class="{left: tooltip.x > width / 2}" v-if="tooltip" :style="{'font-size': `${em}em`, left: `${tooltip.x + (tooltip.x > width / 2 ? -circleRadius : circleRadius)}px`, top: `${tooltip.y}px`}" >
      <div class="label">{{tooltip.value}}{{yUnit}}</div>
      <div class="triangle"></div>
    </div>
  </div>
</template>

<script>
import { csvParse } from 'd3-dsv'
import { scaleLinear } from 'd3-scale'
import { voronoi } from 'd3-voronoi'
export default {
  props: {
    circleRadius: {
      type: Number,
      default: 3
    },
    em: {
      type: Number,
      default: 0.8
    },
    height: {
      type: Number,
      default: 500
    },
    rawData: {
      type: String,
      default: null
    },
    tickSize: {
      type: Number,
      default: 5
    },
    vs: {
      type: String,
      default: 'change'
    },
    width: {
      type: Number,
      default: 500
    },
    yAxisLabel: {
      type: String,
      default: 'Y Axis Label'
    },
    xTicks: {
      type: Number,
      default: 5
    },
    yTicks: {
      type: Number,
      default: 5
    },
    yUnit: {
      type: String,
      default: '%'
    },
    highlight: {
      type: Array,
      default () {
        return []
      }
    },
    filter: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      lineHeight: 20,
      textHeight: 15.5,
      textPadding: 2.25,
      tooltip: null
    }
  },
  computed: {
    parsedData () {
      const { rawData } = this
      return csvParse(rawData).map(d => {
        return {
          ...d,
          year: +d.year,
          change: +d.change,
          value: +d.value
        }
      })
    },
    data () {
      const { parsedData, highlight, filter, xScale, yScale, vs } = this
      return parsedData.map(d => {
        let fill = null
        highlight.forEach(h => {
          const filters = Object.keys(h.filter).map(key => {
            return h.filter[key].filter(f => f === d[key]).length > 0
          })
          if (filters.every(Boolean)) {
            fill = h.color
          }
        })
        let opacity = filter.length === 0 ? 1 : 0
        filter.forEach(h => {
          const filters = Object.keys(h.filter).map(key => {
            return h.filter[key].filter(f => f === d[key]).length > 0
          })
          if (filters.every(Boolean)) {
            opacity = 1
          }
        })
        return {
          ...d,
          fill,
          opacity,
          x: xScale(d[vs]),
          y: yScale(d.value)
        }
      })
    },
    polygons () {
      const { data, width, height, yBottomPadding, lineHeight, textHeight, textPadding } = this
      // voronoi(data).x(d => d.x).y(d => d.y).extent([[0, 0], [1000, 1000]])
      const v = voronoi().x(d => d.x).y(d => d.y).extent([[0, textHeight + textPadding], [width, height - yBottomPadding + lineHeight / 2]])
      return v.polygons(data.filter(d => d.opacity !== 0)).map(polygon => {
        return {
          points: polygon.map(p => `${p[0]},${p[1]}`).join(' '),
          data: polygon.data
        }
      })
    },
    fontSize () {
      const { em } = this
      return em * 18.75
    },
    xDomain () {
      const { parsedData, vs } = this
      const values = parsedData.map(d => d[vs])
      return [Math.min(...values), Math.max(...values)]
    },
    xScale () {
      const { width, xDomain, xTicks, circleRadius } = this
      const scale = scaleLinear()
        .domain(xDomain)
        .range([circleRadius, width - circleRadius])
      scale.nice(xTicks)
      return scale
    },
    xAxisTicks () {
      const { xTicks, xScale, xUnit, circleRadius } = this
      return xScale.ticks(xTicks).map((tick, i, ticks) => ({
        x: xScale(tick),
        tick: i === ticks.length - 1 ? `${tick}${xUnit}` : tick,
        textOffset: i === 0 ? -circleRadius : i === ticks.length - 1 ? circleRadius : 0
      }))
    },
    xAxisLabel () {
      const { vs } = this
      return vs === 'change' ? ' Global warming level' : 'Year'
    },
    xUnit () {
      const { vs } = this
      return vs === 'change' ? '°C' : ''
    },
    yDomain () {
      const { parsedData } = this
      const values = parsedData.map(d => d.value)
      return [Math.min(...values), Math.max(...values)]
    },
    yBottomPadding () {
      const { lineHeight, tickSize } = this
      return lineHeight * 2.5 + tickSize
    },
    yScale () {
      const { height, yDomain, yTicks, yBottomPadding, lineHeight, textHeight, textPadding } = this
      const scale = scaleLinear()
        .domain(yDomain)
        .range([height - yBottomPadding, lineHeight / 2 + textHeight + textPadding])
      scale.nice(yTicks)
      return scale
    },
    yAxisTicks () {
      const { yTicks, yScale, yUnit } = this
      return yScale.ticks(yTicks).map((tick, i, ticks) => ({
        y: yScale(tick),
        tick: i === ticks.length - 1 ? `${tick}${yUnit}` : tick
      }))
    }
  },
  watch: {
    em: {
      handler () {
        this.$nextTick(() => {
          this.lineHeight = this.$refs.yAxisLabel.getBBox().height
          const offset = this.$refs.yAxisLabel.getAttribute('y') - this.$refs.yAxisLabel.getBBox().y
          this.textHeight = offset - (this.lineHeight - offset)
          this.textPadding = (this.lineHeight - this.textHeight) / 2
        })
      },
      immediate: true
    }
  },
  methods: {
    showTooltip (data) {
      this.tooltip = data
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/global.scss";

.vis-scatter {
  position: relative;

  svg {
    text {
      fill: $color-deep-gray;
    }
    line {
      shape-rendering: crispEdges;
      stroke: $color-light-gray;
    }
    circle {
      transition: fill .4s, transform .4s, opacity .4s;
      mix-blend-mode: multiply;
      &.active {
        fill: $color-accent !important;
      }
    }

    overflow: visible;
    .label {
      font-weight: $font-weight-bold;
      &.x-label {
        text-anchor: end;
      }
    }
    .values {
      fill: $color-pale-gray;
    }
    .axes {
      .axis {
        .tick {
          &.x-tick {
            text {
              text-anchor: middle;
            }
            &:nth-child(2) {
              text {
                text-anchor: start;
              }
            }
            &:last-child {
              text {
                text-anchor: end;
              }
            }
          }
        }
      }
    }
    .voronoi {
      fill: none;
      opacity: 0;
      pointer-events: all;
    }
  }
  .tooltip {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transform: translate(0, -50%);
    pointer-events: none;
    flex-direction: row-reverse;

    .label {
      background: $color-accent;
      color: $color-white;
      padding: 0 $spacing / 4;
    }

    .triangle {
      height: $spacing / 4;
      width: $spacing / 4;
      background: $color-accent;
      transform: translate($spacing / 8, 0) rotate(45deg);
      bottom: 0;
    }

    &.left {
      transform: translate(-100%, -50%);
      flex-direction: row;
      .triangle {
        transform: translate(-$spacing / 8, 0) rotate(45deg);
      }
    }
  }
}
</style>
