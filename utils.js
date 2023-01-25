const isString = (text) => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number) => {
  return typeof number === 'number' || number instanceof Number;
};

const parseId = (id) => {
  if (!id || !isString(id) || id.length > 20) {
    throw new Error(
      `Invalid or missing Tare Id. Value must be a string of less than 20 characters.`
    );
  }
  return id;
};

const parseDryMassBal = (bal) => {
  if (!bal || !isString(bal)) {
    throw new Error(
      `Invalid or missing Dry Mass Balance. Value must be a string`
    );
  }
  return bal;
};

const parseTareMass = ({ tMass, tMatDryMass, tMatWetMass }) => {
  if (!(tMass > 0) || !isNumber(tMass)) {
    throw new Error(
      `Tare Mass is expected, a missing or 0 Tare Mass may indicate an issue with the result.`
    );
  }
  if (tMass >= tMatDryMass) {
    let equality = 'greater than';
    if (tMass === tMatDryMass) {
      equality = 'equal to';
    }
    throw new Error(
      `Tare Mass is ${equality} Tare and Material Dry Mass, cannot calculate a result.`
    );
  }
  if (tMass > tMatWetMass) {
    throw new Error(`Tare and Wet Mass must be greater than Tare Mass.`);
  }
  return tMass;
};

const parseTareMatMass = ({ tMatWetMass, tMatDryMass }) => {
  if (
    !tMatWetMass ||
    !tMatDryMass ||
    !isNumber(tMatWetMass) ||
    !isNumber(tMatDryMass) ||
    tMatWetMass < 0 ||
    tMatDryMass < 0
  ) {
    throw new Error(`Mass cannot be less than 0`);
  }
  if (tMatDryMass > tMatWetMass) {
    throw new Error(
      `Dry Mass greater than Wet Mass, cannot calculate a result.`
    );
  }
  return { tMatWetMass, tMatDryMass };
};

const calculateDifference = (a, b) => {
  return parseFloat((a - b).toFixed(1));
};

const calculateWaterContent = ({ tMatWetMass, tMatDryMass, tMass }) => {
  const numerator = calculateDifference(tMatWetMass, tMatDryMass);
  const denominator = calculateDifference(tMatDryMass, tMass);
  return parseFloat(((numerator / denominator) * 100).toFixed(1));
};

module.exports = {
  calculateDifference,
  calculateWaterContent,
  parseId,
  parseDryMassBal,
  parseTareMatMass,
  parseTareMass,
};
