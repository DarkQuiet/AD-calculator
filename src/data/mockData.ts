import type { Workstation, Item, Recipe } from '../types/crafting';
import { baseItems } from './items';
import { weaponsBenchWorkstation, weaponsBenchItems, weaponsBenchRecipes } from './weaponsBench';
import { techBenchWorkstation, techBenchItems, techBenchRecipes } from './techBench';
import { chemBenchWorkstation, chemBenchItems, chemBenchRecipes } from './chemBench';
import { sewingBenchWorkstation, sewingBenchItems, sewingBenchRecipes } from './sewingBench';

export { baseItems } from './items';
export { weaponsBenchWorkstation, weaponsBenchItems, weaponsBenchRecipes } from './weaponsBench';
export { techBenchWorkstation, techBenchItems, techBenchRecipes } from './techBench';
export { chemBenchWorkstation, chemBenchItems, chemBenchRecipes } from './chemBench';
export { sewingBenchWorkstation, sewingBenchItems, sewingBenchRecipes } from './sewingBench';

export const WORKSTATIONS: Workstation[] = [
  weaponsBenchWorkstation,
  techBenchWorkstation,
  chemBenchWorkstation,
  sewingBenchWorkstation,
];

export const ITEMS: Record<string, Item> = {
  ...baseItems,
  ...chemBenchItems,
  ...sewingBenchItems,
  ...weaponsBenchItems,
  ...techBenchItems,
};

export const RECIPES: Recipe[] = [
  ...sewingBenchRecipes,
  ...chemBenchRecipes,
  ...weaponsBenchRecipes,
  ...techBenchRecipes,
];
