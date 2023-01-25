const moistureContent = require('./moisture');
const { calculateDifference } = require('./utils');

const inputData = {
  tId: 'MT001',
  tMass: 300.0,
  tMatWetMass: 2859.6,
  dryMassBal: '01BAL',
  tMatDryMass: 2525.7,
};

const results = moistureContent.create(inputData);

describe('calculations', () => {
  test('Calculate function works correctly', () => {
    expect(calculateDifference(3.68, 2.12)).toBe(1.6);
  });

  test('Material Wet Mass calculation is correct', () => {
    expect(results.measurements.materialWetMass).toBe(2559.6);
  });

  test('Material Dry Mass calculation is correct', () => {
    expect(results.dryMass.materialDryMass).toBe(2225.7);
  });

  test('Water Content calculation is correct', () => {
    expect(results.waterContent()).toBe(15.0);
  });
});

describe('invalid input types', () => {
  test('Invalid input types correctly throw', () => {
    const invalidNumberInput = { ...inputData, tMass: 'string' };
    const invalidStringInput = { ...inputData, tId: null };
    const invalidEquality = { ...inputData, tMatDryMass: inputData.tMass };

    expect(() => moistureContent.create(invalidNumberInput)).toThrow(
      'Tare Mass is expected, a missing or 0 Tare Mass may indicate an issue with the result.'
    );
    expect(() => moistureContent.create(invalidStringInput)).toThrow(
      'Invalid or missing Tare Id. Value must be a string of less than 20 characters.'
    );
    expect(() => moistureContent.create(invalidEquality)).toThrow(
      'Tare Mass is equal to Tare and Material Dry Mass, cannot calculate a result.'
    );
  });
});
