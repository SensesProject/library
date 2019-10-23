export default {
  name: 'SensesRadio',
  options: {
    label: {
      type: 'text',
      default: ''
    },
    options: {
      type: 'select',
      options: [{
        label: '1 2 3',
        value: ['1', '2', '3']
      }, {
        label: 'SSPs',
        value: [{
          value: 'SSP 1',
          color: 'green'
        }, {
          value: 'SSP 2',
          color: 'blue'
        }, {
          value: 'SSP 3',
          color: 'red'
        }, {
          value: 'SSP 4',
          color: 'yellow'
        }, {
          value: 'SSP 5',
          color: 'violet'
        }]
      }, {
        label: 'A AAAAAAAA',
        value: [{
          label: 'A',
          value: true
        }, {
          label: 'AAAAAAAA',
          value: false
        }]
      }, {
        label: 'Models',
        value: ['AIM/CGE', 'IMAGE', 'MESSAGEix-GLOBIOM', 'POLES', 'REMIND-MAgPIE', 'WITCH-GLOBIOM']
      }]
    },
    stretch: {
      type: 'checkbox',
      default: false
    },
    centered: {
      type: 'checkbox',
      default: false
    }
  },
  input: true
}
