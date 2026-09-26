import type { Workstation, Item, Recipe } from '../types/crafting';

export const techBenchWorkstation: Workstation = {
  id: 'tech_bench',
  name: 'Технический стол',
  icon: 'Cpu',
  maxDurability: 1500,
  categories: ['Электроника', 'Металлолом'],
  description: 'Электроника, микросхемы и плавка металла.'
};

export const techBenchItems: Record<string, Item> = {};

export const techBenchRecipes: Recipe[] = [];
