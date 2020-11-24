module.exports = {
  getUnitType: unit => {
    unit = unit.trim().toLowerCase()
    if (unit === 'kg' || unit === 'g') {
      return 'poids'
    } else if (unit === 'l' || unit === 'cl' || unit === 'ml') {
      return 'volume'
    } else {
      return 'autre'
    }
  },

  convertToCommonUnit: (value, unit, unitType) => {
    unit = unit.trim().toLowerCase()
    if (unitType === 'poids' && unit === 'kg') {
      value = value * 1000
      return { quantity: value, unit: 'g' }
    } else if (unitType === 'volume' && unit === 'l') {
      value = value * 100
      return { quantity: value, unit: 'cl' }
    } else if (unitType === 'volume' && unit === 'ml') {
      value = value / 10
      return { quantity: value, unit: 'cl' }
    } else {
      return { quantity: value, unit: unit }
    }
  }
}
