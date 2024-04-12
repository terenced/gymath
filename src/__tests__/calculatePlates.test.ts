import { calculatePlates, defaultConfig } from '../calculatePlates';

describe('calculatePlates', () => {
  describe('unlimited inventory', () => {
    it('should return an empty array if the weight is less than the bar weight', () => {
      expect(calculatePlates(-1)).toEqual({});
      expect(calculatePlates(0)).toEqual({});
      expect(calculatePlates(defaultConfig.barWeight - 1)).toEqual({});
    });

    it('should return the correct plates for the given weight', () => {
      expect(calculatePlates(45)).toEqual({});
      expect(calculatePlates(55)).toEqual({ 5: 1 });
      expect(calculatePlates(60)).toEqual({ 5: 1, 2.5: 1 });
      expect(calculatePlates(65)).toEqual({ 10: 1 });
      expect(calculatePlates(75)).toEqual({ 10: 1, 5: 1 });
      expect(calculatePlates(85)).toEqual({ 10: 2 });
      expect(calculatePlates(100)).toEqual({ 25: 1, 2.5: 1 });
      expect(calculatePlates(135)).toEqual({ 45: 1 });
      expect(calculatePlates(155)).toEqual({ 45: 1, 10: 1 });
      expect(calculatePlates(175)).toEqual({ 45: 1, 10: 2 });
      expect(calculatePlates(225)).toEqual({ 45: 2 });
      expect(calculatePlates(275)).toEqual({ 45: 2, 25: 1 });
      expect(calculatePlates(315)).toEqual({ 45: 3 });
      expect(calculatePlates(405)).toEqual({ 45: 4 });
      expect(calculatePlates(495)).toEqual({ 45: 5 });
    });
  });
  describe('limited inventory', () => {
    it('should make use of inventory', () => {
      const inventory = [
        { weight: 10, inventory: 2 },
        { weight: 5, inventory: 2 },
        { weight: 2.5, inventory: 2 },
      ];
      expect(calculatePlates(65, { inventory })).toEqual({ 10: 1 });
      expect(calculatePlates(80, { inventory })).toEqual({
        10: 1,
        5: 1,
        2.5: 1,
      });
    });

    it('should return an error if there is not enough inventory', () => {
      const inventory = [
        { weight: 45, inventory: 2 },
        { weight: 10, inventory: 2 },
      ];
      expect(calculatePlates(205, { inventory })).toEqual({
        45: 1,
        10: 1,
        missing: 25,
      });
    });

    it('should uncommon weights', () => {
      const fiftyFives = { weight: 55, inventory: 2 };
      const thirtyFives = { weight: 35, inventory: 2 };
      const fifteens = { weight: 15, inventory: 2 };
      const inventory = [
        // Not every gym has 55s, 35s, and 15s
        fiftyFives,
        thirtyFives,
        fifteens,
        ...defaultConfig.inventory,
      ];
      expect(calculatePlates(75, { inventory })).toEqual({ 15: 1 });
      expect(calculatePlates(115, { inventory })).toEqual({ 35: 1 });
      expect(calculatePlates(155, { inventory })).toEqual({ 55: 1 });
    });
  });
});
