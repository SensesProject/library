export default {
  name: 'SensesLogo',
  options: {
    color: {
      type: 'select',
      options: [{
        value: 'violet'
      }, {
        value: 'black'
      }, {
        value: 'yellow'
      }, {
        value: 'red'
      }, {
        value: 'green'
      }, {
        value: 'blue'
      }, {
        value: 'white'
      }]
    },
    sx: {
      type: 'range',
      min: 0,
      max: 12,
      step: 1,
      default: 0
    },
    sy: {
      type: 'range',
      min: -5,
      max: 5,
      step: 1,
      default: 0
    },
    mx: {
      type: 'range',
      min: 0,
      max: 12,
      step: 1,
      default: 1
    },
    my: {
      type: 'range',
      min: -5,
      max: 5,
      step: 1,
      default: 0
    },
    lx: {
      type: 'range',
      min: 0,
      max: 12,
      step: 1,
      default: 3
    },
    ly: {
      type: 'range',
      min: -5,
      max: 5,
      step: 1,
      default: 0
    },
    project: {
      type: 'text',
      default: ''
    },
    animate: {
      type: 'checkbox',
      default: true
    },
    validate: {
      type: 'checkbox',
      default: true
    }
  }
}
