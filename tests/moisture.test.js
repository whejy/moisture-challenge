const moistureContent = require('../moisture');

// tareId, tareMass, tareMaterialWetMass, dryMassBalance, tareMaterialDryMass
const inputData = ['MT001', 300.0, 2859.6, '01BAL', 2525.7];

const results = moistureContent.create(...inputData);

describe('calculations', () => {
  test('Calculate function works correctly', () => {
    expect(moistureContent.calculate(3.68, 2.12)).toBe(1.6);
    expect(() => moistureContent.calculate('nonInt', 3)).toThrow(
      'Invalid value: nonInt'
    );
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
