export default {
  name: 'SensesFalafel',
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
        value: 'cyan'
      }, {
        value: 'green'
      }, {
        value: 'blue'
      }, {
        value: 'white'
      }]
    },
    symbol: {
      type: 'select',
      options: [{
        value: 'vertical'
      }, {
        value: 'horizontal'
      }, {
        value: 'close'
      }, {
        value: 'collapse'
      }]
    }
  }
}
