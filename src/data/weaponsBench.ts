import type { Workstation, Item, Recipe } from '../types/crafting';

export const weaponsBenchWorkstation: Workstation = {
  id: 'weapons_bench',
  name: 'Оружейный стол',
  icon: 'Crosshair',
  maxDurability: 1000,
  categories: ['Оружейные обвесы', 'Оружие', 'Патроны'],
  description: 'Огнестрельное оружие, модули и боеприпасы.'
};

export const weaponsBenchItems: Record<string, Item> = {
  cartridge_cases: { id: 'cartridge_cases', name: 'Гильзы', icon: 'Box', isBase: false },
  ammo_12_gauge: { id: 'ammo_12_gauge', name: 'Картечь 12 калибр', icon: 'Crosshair', isBase: false },
  ammo_12_gauge_express: { id: 'ammo_12_gauge_express', name: 'Картечь 12 калибр EXPRESS', icon: 'Crosshair', isBase: false },
  ammo_22_lr: { id: 'ammo_22_lr', name: 'Патроны .22 LR', icon: 'Crosshair', isBase: false },
  ammo_44_40_win: { id: 'ammo_44_40_win', name: 'Патроны .44-40 Winchester', icon: 'Crosshair', isBase: false },
  ammo_45_acp: { id: 'ammo_45_acp', name: 'Патроны .45 ACP', icon: 'Crosshair', isBase: false },
  ammo_50_ae: { id: 'ammo_50_ae', name: 'Патроны .50 ACTION EXPRESS', icon: 'Crosshair', isBase: false },
  ammo_545x39: { id: 'ammo_545x39', name: 'Патроны 5.45x39 ММ', icon: 'Crosshair', isBase: false },
  ammo_556x45: { id: 'ammo_556x45', name: 'Патроны 5.56x45 ММ', icon: 'Crosshair', isBase: false },
  ammo_57x28: { id: 'ammo_57x28', name: 'Патроны 5.7x28 ММ', icon: 'Crosshair', isBase: false },
  ammo_9x19: { id: 'ammo_9x19', name: 'Патроны 9x19 ММ', icon: 'Crosshair', isBase: false },
  ammo_762x51: { id: 'ammo_762x51', name: 'Патроны 7,62x51 ММ', icon: 'Crosshair', isBase: false },
  ammo_9x39: { id: 'ammo_9x39', name: 'Патроны 9x39 ММ', icon: 'Crosshair', isBase: false }
};

export const weaponsBenchRecipes: Recipe[] = [
  // --- ГИЛЬЗЫ ---
  {
    id: 'recipe_cartridge_cases_t1',
    name: 'Гильзы x50 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'tech_oil', amount: 4 },
      { itemId: 'carbon_steel', amount: 1 }
    ],
    outputs: [{ itemId: 'cartridge_cases', amount: 50 }]
  },
  {
    id: 'recipe_cartridge_cases_t2',
    name: 'Гильзы x50 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'scrap_metal', amount: 25 },
      { itemId: 'tech_oil', amount: 5 }
    ],
    outputs: [{ itemId: 'cartridge_cases', amount: 50 }]
  },

  // --- 1 ТИР ПАТРОНЫ ---
  {
    id: 'recipe_ammo_12_gauge_t1',
    name: 'Картечь 12 калибр x8 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 12 }
    ],
    outputs: [{ itemId: 'ammo_12_gauge', amount: 8 }]
  },
  {
    id: 'recipe_ammo_22_lr_t1',
    name: 'Патроны .22 LR x25 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 10 }
    ],
    outputs: [{ itemId: 'ammo_22_lr', amount: 25 }]
  },
  {
    id: 'recipe_ammo_44_40_win_t1',
    name: 'Патроны .44-40 Winchester x7 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 25 },
      { itemId: 'gunpowder', amount: 25 }
    ],
    outputs: [{ itemId: 'ammo_44_40_win', amount: 7 }]
  },
  {
    id: 'recipe_ammo_45_acp_t1',
    name: 'Патроны .45 ACP x20 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.3,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 15 }
    ],
    outputs: [{ itemId: 'ammo_45_acp', amount: 20 }]
  },
  {
    id: 'recipe_ammo_545x39_t1',
    name: 'Патроны 5.45x39 ММ x15 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 20 }
    ],
    outputs: [{ itemId: 'ammo_545x39', amount: 15 }]
  },
  {
    id: 'recipe_ammo_556x45_t1',
    name: 'Патроны 5.56x45 ММ x15 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 20 }
    ],
    outputs: [{ itemId: 'ammo_556x45', amount: 15 }]
  },
  {
    id: 'recipe_ammo_9x19_t1',
    name: 'Патроны 9x19 ММ x20 (T1)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 10 }
    ],
    outputs: [{ itemId: 'ammo_9x19', amount: 20 }]
  },

  // --- 2 ТИР ПАТРОНЫ ---
  {
    id: 'recipe_ammo_12_gauge_t2',
    name: 'Картечь 12 калибр x12 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 12 }
    ],
    outputs: [{ itemId: 'ammo_12_gauge', amount: 12 }]
  },
  {
    id: 'recipe_ammo_22_lr_t2',
    name: 'Патроны .22 LR x35 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 10 }
    ],
    outputs: [{ itemId: 'ammo_22_lr', amount: 35 }]
  },
  {
    id: 'recipe_ammo_44_40_win_t2',
    name: 'Патроны .44-40 Winchester x12 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 25 },
      { itemId: 'gunpowder', amount: 25 }
    ],
    outputs: [{ itemId: 'ammo_44_40_win', amount: 12 }]
  },
  {
    id: 'recipe_ammo_45_acp_t2',
    name: 'Патроны .45 ACP x30 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 0.3,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 15 }
    ],
    outputs: [{ itemId: 'ammo_45_acp', amount: 30 }]
  },
  {
    id: 'recipe_ammo_545x39_t2',
    name: 'Патроны 5.45x39 ММ x20 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 20 }
    ],
    outputs: [{ itemId: 'ammo_545x39', amount: 20 }]
  },
  {
    id: 'recipe_ammo_556x45_t2',
    name: 'Патроны 5.56x45 ММ x20 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 20 }
    ],
    outputs: [{ itemId: 'ammo_556x45', amount: 20 }]
  },
  {
    id: 'recipe_ammo_9x19_t2',
    name: 'Патроны 9x19 ММ x30 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 10 }
    ],
    outputs: [{ itemId: 'ammo_9x19', amount: 30 }]
  },
  {
    id: 'recipe_ammo_762x51_t2',
    name: 'Патроны 7,62x51 ММ x15 (T2)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 2,
    craftTimeSec: 5,
    durabilityCost: 1,
    inputs: [
      { itemId: 'cartridge_cases', amount: 20 },
      { itemId: 'scrap_metal', amount: 30 },
      { itemId: 'gunpowder', amount: 30 }
    ],
    outputs: [{ itemId: 'ammo_762x51', amount: 15 }]
  },

  // --- 3 ТИР ПАТРОНЫ ---
  {
    id: 'recipe_ammo_12_gauge_t3',
    name: 'Картечь 12 калибр x15 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 12 }
    ],
    outputs: [{ itemId: 'ammo_12_gauge', amount: 15 }]
  },
  {
    id: 'recipe_ammo_12_gauge_express_t3',
    name: 'Картечь 12 калибр EXPRESS x15 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 25 }
    ],
    outputs: [{ itemId: 'ammo_12_gauge_express', amount: 15 }]
  },
  {
    id: 'recipe_ammo_22_lr_t3',
    name: 'Патроны .22 LR x50 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 10 }
    ],
    outputs: [{ itemId: 'ammo_22_lr', amount: 50 }]
  },
  {
    id: 'recipe_ammo_44_40_win_t3',
    name: 'Патроны .44-40 Winchester x20 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 25 },
      { itemId: 'gunpowder', amount: 25 }
    ],
    outputs: [{ itemId: 'ammo_44_40_win', amount: 20 }]
  },
  {
    id: 'recipe_ammo_45_acp_t3',
    name: 'Патроны .45 ACP x50 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.3,
    inputs: [
      { itemId: 'cartridge_cases', amount: 10 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 15 }
    ],
    outputs: [{ itemId: 'ammo_45_acp', amount: 50 }]
  },
  {
    id: 'recipe_ammo_50_ae_t3',
    name: 'Патроны .50 ACTION EXPRESS x20 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 15 }
    ],
    outputs: [{ itemId: 'ammo_50_ae', amount: 20 }]
  },
  {
    id: 'recipe_ammo_545x39_t3',
    name: 'Патроны 5.45x39 ММ x25 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 20 }
    ],
    outputs: [{ itemId: 'ammo_545x39', amount: 25 }]
  },
  {
    id: 'recipe_ammo_556x45_t3',
    name: 'Патроны 5.56x45 ММ x25 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 15 },
      { itemId: 'gunpowder', amount: 20 }
    ],
    outputs: [{ itemId: 'ammo_556x45', amount: 25 }]
  },
  {
    id: 'recipe_ammo_57x28_t3',
    name: 'Патроны 5.7x28 ММ x30 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.4,
    inputs: [
      { itemId: 'cartridge_cases', amount: 30 },
      { itemId: 'scrap_metal', amount: 25 },
      { itemId: 'gunpowder', amount: 25 }
    ],
    outputs: [{ itemId: 'ammo_57x28', amount: 30 }]
  },
  {
    id: 'recipe_ammo_9x19_t3',
    name: 'Патроны 9x19 ММ x50 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'cartridge_cases', amount: 15 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'gunpowder', amount: 10 }
    ],
    outputs: [{ itemId: 'ammo_9x19', amount: 50 }]
  },
  {
    id: 'recipe_ammo_762x51_t3',
    name: 'Патроны 7,62x51 ММ x20 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 1,
    inputs: [
      { itemId: 'cartridge_cases', amount: 20 },
      { itemId: 'scrap_metal', amount: 30 },
      { itemId: 'gunpowder', amount: 30 }
    ],
    outputs: [{ itemId: 'ammo_762x51', amount: 20 }]
  },
  {
    id: 'recipe_ammo_9x39_t3',
    name: 'Патроны 9x39 ММ x20 (T3)',
    workstationId: 'weapons_bench',
    category: 'Патроны',
    tier: 3,
    craftTimeSec: 5,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'cartridge_cases', amount: 30 },
      { itemId: 'scrap_metal', amount: 20 },
      { itemId: 'gunpowder', amount: 20 }
    ],
    outputs: [{ itemId: 'ammo_9x39', amount: 20 }]
  }
];
