const moistureContent = require('../moisture');
const { calculateDifference } = require('../utils');

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

  test('Invalid input type correctly throws', () => {
    const invalidNumberInput = { ...inputData, tMass: 'string' };
    const invalidStringInput = { ...inputData, tId: null };
    expect(() => moistureContent.create(invalidNumberInput)).toThrow(
      'Invalid or missing input type. Value must be a number.'
    );
    expect(() => moistureContent.create(invalidStringInput)).toThrow(
      'Invalid or missing input type. Value must be a string.'
    );
  });
});
