import d1 from './land-area-affected-by-crop-failure_ISIMIP-projections_ARE_versus-years'
import d2 from './land-area-affected-by-crop-failure_ISIMIP-projections_ITA_versus-years'
import d3 from './land-area-affected-by-heatwave_ISIMIP-projections_ITA_versus-years'

export default [d1, d2, d3].map(d => {
  const years = [d.year_list.indexOf(1861), d.year_list.indexOf(2299)]

  const scenarios = d.climate_scenario_list.filter((d, i) => i > 0)
  const climateModels = d.climate_model_list
  const impactModels = d.impact_model_list

  let csv = `climateModel,impactModel,scenario,year,change,value`

  const baseTemp = 286

  scenarios.forEach(s => {
    climateModels.forEach(c => {
      impactModels.forEach(i => {
        for (let y = years[0]; y <= years[1]; y++) {
          const temp = d.data[s][c].global_mean_temperatures[y] - baseTemp
          const v = d.data[s][c].runs[i].relative_changes[y]
          if (v !== null) csv += `\n${c},${i},${s},${1861 + y - years[0]},${temp},${v}`
        }
      })
    })
  })
  return csv
})
