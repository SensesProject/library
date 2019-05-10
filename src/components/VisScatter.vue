<template>
  <div class="vis-scatter">
    <div class="title" :style="{'font-size': `${em}em`}">
      <strong>{{ plotTitle }}</strong>
    </div>
    <div class="chart">
      <svg :width="width" :height="height"
        :style="{'font-size': `${em}em`}">
        <text class="label x-label" ref="yAxisLabel" :y="height - textPadding" :x="width">{{ xAxisLabel }}</text>
        <text class="label y-label" :y="textHeight + textPadding">{{ yAxisLabel }}</text>
        <g class="values">
          <circle v-for="(v, i) in data" :key="`value-${i}`"
          :style="{transform: `translate(${v.x}px, ${v.y}px)`, fill: v.fill}"
          :r="circleRadius"/>
        </g>
        <g class="axes">
          <g class="axis x-axis" :transform="`translate(0 ${height - padding + lineHeight / 2 + textPadding})`">
            <line :x1="paddingLeft" :x2="width - circleRadius"/>
            <g class="tick x-tick"
              v-for="(t, i) in xAxisTicks"
              :key="`x-tick-${t.tick}-${i}`"
              :transform="`translate(${t.x} 0)`">
              <line :y2="tickSize"/>
              <text :x="t.textOffset" :y="lineHeight - textPadding + tickSize">{{ t.tick }}</text>
            </g>
          </g>
          <g class="axis y-axis" :transform="`translate(${paddingLeft} 0)`">
            <line :y1="lineHeight + innerPadding" :y2="height - padding + lineHeight / 2 + textPadding"/>
            <g class="tick y-tick"
              v-for="t in yAxisTicks"
              :key="`y-tick-${t.tick}`"
              :transform="`translate(0 ${t.y})`">
              <line :x2="-tickSize"/>
              <text :ref="`yAxisTicks`" :x="-tickSize - textPadding" :y="lineHeight / 2 - textPadding">{{ t.tick }}</text>
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
      <div class="tooltip" :class="{left: tooltip.x > width / 2}" v-if="tooltip" :style="{'font-size': `${em}em`, transform: tooltipTransform}" >
        <div class="label">
          <div class="left">
            <strong>Climate Model</strong>
            <br>
            <strong>Impact Model</strong>
          </div>
          <div>
            <span>{{tooltip.climateModel}}</span>
            <br>
            <span>{{tooltip.impactModel}}</span>
          </div>
        </div>
        <div class="triangle">
          <svg width="6" height="6">
            <polygon points="0 0 0 6 6 0"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '../style/global.scss'
import { csvParse } from 'd3-dsv'
import { scaleLinear } from 'd3-scale'
import { voronoi } from 'd3-voronoi'
export default {
  props: {
    circleRadius: {
      type: Number,
      default: 2
    },
    em: {
      type: Number,
      default: 0.8
    },
    plotTitle: {
      type: String,
      default: ''
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
      default: 3
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
      default: 3
    },
    yTicks: {
      type: Number,
      default: 3
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
    innerPadding: {
      type: Number,
      default: 3
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
      colors,
      lineHeight: 20,
      textHeight: 15.5,
      textPadding: 2.25,
      tooltip: null,
      yTickWidth: 10
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
    autoHighlight () {
      const { vs, tooltip } = this
      if (tooltip != null) {
        return [{
          color: colors.green,
          filter: {
            climateModel: [tooltip.climateModel],
            impactModel: [tooltip.impactModel]
          }
        }]
      }
      if (vs === 'year') {
        return [{
          color: colors.blue,
          filter: {
            scenario: ['rcp26']
          }
        }, {
          color: colors.yellow,
          filter: {
            scenario: ['rcp60']
          }
        }]
      }
      return []
    },
    data () {
      const { parsedData, highlight, autoHighlight, filter, xScale, yScale, vs } = this
      return parsedData.map(d => {
        let fill = null
        if (highlight.length === 0) {
          autoHighlight.forEach(h => {
            const filters = Object.keys(h.filter).map(key => {
              return h.filter[key].filter(f => f === d[key]).length > 0
            })
            if (filters.every(Boolean)) {
              fill = h.color
            }
          })
        } else {
          highlight.forEach(h => {
            const filters = Object.keys(h.filter).map(key => {
              return h.filter[key].filter(f => f === d[key]).length > 0
            })
            if (filters.every(Boolean)) {
              fill = h.color
            }
          })
        }
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
      const { data, width, height, padding, lineHeight, textHeight, textPadding } = this
      // voronoi(data).x(d => d.x).y(d => d.y).extent([[0, 0], [1000, 1000]])
      const v = voronoi().x(d => d.x).y(d => d.y).extent([[0, textHeight + textPadding], [width, height - padding + lineHeight / 2]])
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
    paddingLeft () {
      const { yTickWidth, textPadding, tickSize } = this
      return yTickWidth + textPadding + tickSize
    },
    xDomain () {
      const { vs } = this
      if (vs === 'year') {
        return [1860, 2100]
      } else {
        return [0, 4]
      }
      // const values = parsedData.map(d => d[vs])
      // return [Math.min(...values), Math.max(...values)]
    },
    xScale () {
      const { width, xDomain, paddingLeft, circleRadius, innerPadding } = this
      const scale = scaleLinear()
        .domain(xDomain)
        .range([paddingLeft + circleRadius + innerPadding, width - circleRadius])
      // scale.nice(xTicks)
      return scale
    },
    xAxisTicks () {
      const { xScale, xUnit, circleRadius, vs } = this
      // return xScale.ticks(xTicks).map((tick, i, ticks) => {
      //   if (tick === 2000) tick = 2006
      //   return {
      //     x: xScale(tick),
      //     tick: i === ticks.length - 1 ? `${tick}${xUnit}` : tick,
      //     textOffset: i === 0 ? -circleRadius : i === ticks.length - 1 ? circleRadius : 0
      //   }
      // })
      const ticks = vs === 'year' ? [1900, 1950, 2000, 2050, 2100] : [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]
      return ticks.map((tick, i, ticks) => {
        return {
          x: xScale(tick),
          tick: i % 2 ? '' : (i === ticks.length - 1 ? `${tick}${xUnit}` : tick),
          textOffset: i === ticks.length - 1 ? circleRadius : 0
        }
      })
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
    padding () {
      const { lineHeight, tickSize } = this
      return lineHeight * 2.5 + tickSize
    },
    yScale () {
      const { height, yDomain, lineHeight, circleRadius, tickSize, innerPadding } = this
      const scale = scaleLinear()
        .domain(yDomain)
        .range([height - (lineHeight * 2 + tickSize + innerPadding), lineHeight + circleRadius + innerPadding])
      return scale
    },
    yAxisTicks () {
      const { yTicks, yScale, yUnit } = this
      return yScale.ticks(yTicks).map((tick, i, ticks) => ({
        y: yScale(tick),
        tick: `${tick}${yUnit}`
      }))
    },
    tooltipTransform () {
      const { tooltip, width, circleRadius } = this
      if (tooltip === null) return null
      return `translate(calc(${tooltip.x}px - ${tooltip.x > width / 2 ? '100%' : '0%'}), calc(-100% + ${tooltip.y - circleRadius * 1.5}px))`
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
          this.yTickWidth = Math.max(...this.$refs.yAxisTicks.map(d => d.getBBox().width))
        })
      },
      immediate: true
    },
    yAxisTicks: {
      handler () {
        this.$nextTick(() => {
          this.yTickWidth = Math.max(...this.$refs.yAxisTicks.map(d => d.getBBox().width))
        })
      }
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
  .title {
    line-height: normal;
    color: $color-black;
  }
  .chart {
    position: relative;
  }
  svg {
    // background: rgba(255,128,0,0.1);
    text {
      fill: $color-black;
    }
    line {
      shape-rendering: crispEdges;
      stroke: $color-gray;
    }
    circle {
      // transition: fill .4s, transform .4s, opacity .4s;
      // mix-blend-mode: multiply;
      opacity: 0.6;
    }

    // overflow: visible;
    .label {
      // font-weight: $font-weight-bold;
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
            // &:nth-child(2) {
            //   text {
            //     text-anchor: start;
            //   }
            // }
            &:last-child {
              text {
                text-anchor: end;
              }
            }
          }
          &.y-tick {
            text {
              text-anchor: end;
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
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    pointer-events: none;
    flex-direction: column;
    // width: 50%;

    .label {
      background: rgba(255,255,255,0.7);
      color: $color-black;
      // padding: $spacing / 8 $spacing / 4;
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
      border-bottom: 1px solid $color-green;
      .left {
        padding-right: $spacing / 4;
      }
    }

    .triangle {
      margin-top: -1px;
      display: flex;
      width: 100%;
      position: relative;
      // justify-content: flex-end;
      polygon {
        fill: $color-green;
      }
    }
    &.left {
      align-items: flex-end;
      .triangle {
        // justify-content: flex-end;
        transform: scaleX(-1);
      }
    }
    //   height: $spacing / 4;
    //   width: $spacing / 4;
    //   background: $color-accent;
    //   transform: translate($spacing / 8, 0) rotate(45deg);
    //   bottom: 0;
    // }

    // &.left {
    //   transform: translate(-100%, -50%);
    //   flex-direction: row;
    //   .triangle {
    //     transform: translate(-$spacing / 8, 0) rotate(45deg);
    //   }
    // }
  }
}
</style>
