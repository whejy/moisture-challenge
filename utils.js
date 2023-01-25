const isString = (text) => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number) => {
  return typeof number === 'number' || number instanceof Number;
};

const parseString = (text) => {
  if (!text || !isString(text)) {
    throw new Error(`Invalid or missing input type. Value must be a string.`);
  }
  return text;
};

const parseNumber = (number) => {
  if (!number || !isNumber(number)) {
    throw new Error(`Invalid or missing input type. Value must be a number.`);
  }
  return number;
};

const calculateDifference = (a, b) => {
  return parseFloat((a - b).toFixed(1));
};

const calculateWaterContent = (tMatWetMass, tMatDryMass, tMass) => {
  const numerator = calculateDifference(tMatWetMass, tMatDryMass);
  const denominator = calculateDifference(tMatDryMass, tMass);
  return parseFloat(((numerator / denominator) * 100).toFixed(1));
};

module.exports = {
  calculateDifference,
  calculateWaterContent,
  parseNumber,
  parseString,
};
