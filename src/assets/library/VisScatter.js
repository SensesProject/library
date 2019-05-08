import data from './data/impact-data-points'
import data2 from './data/impact-data-points-2'
import data3 from './data/impact-data-points-3'
import data4 from './data/impact-data-points-4'

import colors from '../../style/global.scss'

export default {
  name: 'VisScatter',
  options: {
    rawData: {
      type: 'select',
      options: [{
        label: 'actual values',
        value: data2
      }, {
        label: 'absolute changes',
        value: data3
      }, {
        label: 'relative changes',
        value: data4
      }, {
        label: 'data1',
        value: data
      }]
    },
    vs: {
      type: 'select',
      options: [{
        value: 'year'
      }, {
        value: 'change'
      }]
    },
    highlight: {
      type: 'select',
      options: [{
        label: 'none',
        value: []
      }, {
        label: 'rcp26 in yellow / rcp 60 in blue',
        value: [{
          color: colors.yellow,
          filter: {
            scenario: ['rcp26']
          }
        }, {
          color: colors.blue,
          filter: {
            scenario: ['rcp60']
          }
        }]
      }, {
        label: '2030 and 2050 in blue, model A yellow',
        value: [{
          color: colors.blue,
          filter: {
            year: [2030, 2050]
          }
        }, {
          color: colors.yellow,
          filter: {
            climateModel: ['A']
          }
        }]
      }]
    },
    filter: {
      type: 'select',
      options: [{
        label: 'none',
        value: []
      }, {
        label: 'rcp60',
        value: [{
          filter: {
            scenario: ['rcp60']
          }
        }]
      }, {
        label: 'climateModel A,  impactModel 2',
        value: [{
          filter: {
            climateModel: ['A'],
            impactModel: ['2']
          }
        }]
      }]
    },
    width: {
      type: 'range',
      min: 300,
      max: 1120,
      step: 10,
      default: 500
    },
    height: {
      type: 'range',
      min: 200,
      max: 800,
      step: 10,
      default: 500
    },
    yAxisLabel: {
      type: 'input',
      default: 'Y Axis Label'
    },
    yUnit: {
      type: 'input',
      default: '%'
    },
    xTicks: {
      type: 'range',
      min: 2,
      max: 10,
      step: 1,
      default: 5
    },
    yTicks: {
      type: 'range',
      min: 2,
      max: 10,
      step: 1,
      default: 5
    },
    circleRadius: {
      type: 'range',
      min: 1,
      max: 12,
      step: 0.5,
      default: 3
    },
    tickSize: {
      type: 'range',
      min: 1,
      max: 20,
      step: 1,
      default: 5
    },
    em: {
      type: 'range',
      min: 0.6,
      max: 1.2,
      step: 0.05,
      default: 0.8
    }
  }
}
