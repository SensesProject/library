export default {
  name: '_TestComponent',
  options: {
    color: {
      type: 'select',
      options: [{
        value: 'black'
      }, {
        value: 'red'
      }, {
        value: 'green'
      }]
    },
    opacity: {
      type: 'select',
      options: [{
        label: 'opaque',
        value: 1
      }, {
        label: 'transparent',
        value: 0.5
      }]
    },
    offset: {
      type: 'range',
      min: 0,
      max: 10,
      step: 1,
      default: 0
    },
    heading: {
      type: 'text',
      default: 'Heading'
    },
    invert: {
      type: 'checkbox',
      default: false
    }
  }
}
