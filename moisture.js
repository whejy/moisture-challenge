const {
  calculateDifference,
  calculateWaterContent,
  parseTareMatMass,
  parseTareMass,
  parseDryMassBal,
  parseId,
} = require('./utils');

const obj = {};

// Object model
class MoistureContent {
  constructor({ tId, tMass, dryMassBal, tMatWetMass, tMatDryMass }) {
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

// Validate input data and create object model
obj.moistureContent = (input) => {
  const { tMatWetMass, tMatDryMass } = parseTareMatMass(input);

  const parsedData = {
    tId: parseId(input.tId),
    tMass: parseTareMass(input),
    dryMassBal: parseDryMassBal(input.dryMassBal),
    tMatWetMass: tMatWetMass,
    tMatDryMass: tMatDryMass,
  };
  return new MoistureContent(parsedData);
};

module.exports = {
  create: obj.moistureContent,
};
