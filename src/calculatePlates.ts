export interface PlateInventory {
  weight: number;
  inventory: number;
}

export type Config = {
  barWeight: number;
  inventory: PlateInventory[];
};

export const defaultConfig: Config = {
  barWeight: 45,
  inventory: [
    {
      weight: 45,
      inventory: Number.POSITIVE_INFINITY,
    },
    { weight: 35, inventory: Number.POSITIVE_INFINITY },
    { weight: 25, inventory: Number.POSITIVE_INFINITY },
    { weight: 10, inventory: Number.POSITIVE_INFINITY },
    { weight: 5, inventory: Number.POSITIVE_INFINITY },
    { weight: 2.5, inventory: Number.POSITIVE_INFINITY },
  ],
};

interface PlatesToLoad {
  [key: string | number]: number;
}

export function calculatePlates(amount: number, config: Partial<Config> = {}) {
  const barWeight = config?.barWeight || defaultConfig.barWeight;
  const inventory = config?.inventory || defaultConfig.inventory;

  if (amount < barWeight) return {};

  // NOTE:
  // Divide the inventory by 2 since we only return the weight for one side of the bar
  let remainingAmount = (amount - barWeight) / 2;
  const platesToLoad: PlatesToLoad = {};

  inventory.forEach((plate) => {
    const numPlates = Math.floor(remainingAmount / plate.weight);
    // NOTE:
    // Divide the inventory by 2 since we only return the weight for one side of the bar
    const inventory = plate.inventory / 2;
    if (inventory < numPlates) {
      platesToLoad[plate.weight] = inventory;
      remainingAmount -= inventory * plate.weight;
      return;
    }

    if (numPlates > 0) {
      platesToLoad[plate.weight] = numPlates;
      remainingAmount -= numPlates * plate.weight;
    }
  });
  if (remainingAmount > 0) {
    platesToLoad['missing'] = remainingAmount;
  }
  return platesToLoad;
}
