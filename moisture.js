const {
  calculateDifference,
  calculateWaterContent,
  parseString,
  parseNumber,
} = require('./utils');

const obj = {};

class MoistureContent {
  constructor({ tId, tMass, tMatWetMass, dryMassBal, tMatDryMass }) {
    (this.measurements = {
      tId: tId,
      tMass: tMass,
      tMatWetMass: tMatWetMass,
      get materialWetMass() {
        return calculateDifference(tMatWetMass, tMass);
      },
    }),
      (this.dryMass = {
        dryMassBal: dryMassBal,
        tMatDryMass: tMatDryMass,
        get materialDryMass() {
          return calculateDifference(tMatDryMass, tMass);
        },
      }),
      (this.waterContent = () => {
        return calculateWaterContent(tMatWetMass, tMatDryMass, tMass);
      });
  }
}

// Deeper parsing still required...
obj.moistureContent = (input) => {
  const parsedData = {
    tId: parseString(input.tId),
    tMass: parseNumber(input.tMass),
    tMatWetMass: parseNumber(input.tMatWetMass),
    dryMassBal: parseString(input.dryMassBal),
    tMatDryMass: parseNumber(input.tMatDryMass),
  };
  return new MoistureContent(parsedData);
};

module.exports = {
  create: obj.moistureContent,
  calculate: calculateDifference,
};
