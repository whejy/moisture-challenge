const obj = {};

// Validate input and perform subtraction
function calculateDifference(a, b) {
  const parsedA = parseFloat(a);
  const parsedB = parseFloat(b);
  let value = '';

  if (!isNaN(parsedA) && !isNaN(parsedB)) {
    return parseFloat((parsedA - parsedB).toFixed(1));
  }

  isNaN(parsedA) ? (value = a) : (value = b);
  throw new Error(`Invalid value: ${value}`);
}

class MoistureContent {
  constructor(
    tareId,
    tareMass,
    tareMaterialWetMass,
    dryMassBalance,
    tareMaterialDryMass
  ) {
    (this.measurements = {
      tareId: tareId,
      tareMass: tareMass,
      tareMaterialWetMass: tareMaterialWetMass,
      get materialWetMass() {
        return calculateDifference(tareMaterialWetMass, tareMass);
      },
    }),
      (this.dryMass = {
        dryMassBalance: dryMassBalance,
        tareMaterialDryMass: tareMaterialDryMass,
        get materialDryMass() {
          return calculateDifference(tareMaterialDryMass, tareMass);
        },
      }),
      (this.waterContent = () => {
        return parseFloat(
          (
            (calculateDifference(tareMaterialWetMass, tareMaterialDryMass) /
              calculateDifference(tareMaterialDryMass, tareMass)) *
            100
          ).toFixed(1)
        );
      });
  }
}

obj.moistureContent = (...input) => {
  return new MoistureContent(...input);
};

module.exports = {
  create: obj.moistureContent,
  calculate: calculateDifference,
};
