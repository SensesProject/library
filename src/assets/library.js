export default [{
  name: 'HelloWorld',
  options: {
    color: {
      type: 'options',
      options: [{
        label: 'orange',
        value: '#ff0000'
      }]
    },
    value: {
      type: 'slider',
      options: {
        min: 0,
        max: 10,
        step: 1
      }
    },
    label: {
      type: 'text',
      default: 'Label'
    }
  }
}]
