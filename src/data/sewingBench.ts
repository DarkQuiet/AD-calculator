import type { Workstation, Item, Recipe } from '../types/crafting';

export const sewingBenchWorkstation: Workstation = {
  id: 'sewing_bench',
  name: 'Швейный стол',
  icon: 'Scissors',
  maxDurability: 1200,
  categories: ['Рюкзаки', 'Кожа', 'Броня'],
  description: 'Экипировка, элементы брони и сумки.'
};

export const sewingBenchItems: Record<string, Item> = {
  // === КРАФТОВЫЕ ПРЕДМЕТЫ (Кожа) ===
  cleaned_hide: { id: 'cleaned_hide', name: 'Очищенная шкура', icon: 'Layers', isBase: false },
  tanned_leather: { id: 'tanned_leather', name: 'Дубленая кожа', icon: 'Layers', isBase: false },
  tattoo_machine_wire_belt: { id: 'tattoo_machine_wire_belt', name: 'Ремень провода тату-машинки', icon: 'Box', isBase: false },

  // === КРАФТОВЫЕ ПРЕДМЕТЫ (Броня) ===
  plate_class_1a: { id: 'plate_class_1a', name: 'Пластина класса 1А', icon: 'Shield', isBase: false },
  body_armor: { id: 'body_armor', name: 'Бронежилет', icon: 'Shield', isBase: false },
  chest_rig: { id: 'chest_rig', name: 'Разгрузка', icon: 'Shield', isBase: false },
  radio_body_armor: { id: 'radio_body_armor', name: 'Бронежилет с рацией', icon: 'Shield', isBase: false },
  plate_class_2a: { id: 'plate_class_2a', name: 'Плита класса 2А', icon: 'Shield', isBase: false },
  plate_class_3: { id: 'plate_class_3', name: 'Плита класса 3', icon: 'Shield', isBase: false }
};

export const sewingBenchRecipes: Recipe[] = [
  // ==========================================
  // === ШВЕЙНЫЙ СТОЛ: Броня
  // ==========================================

  // --- ТИР 1 БРОНЯ ---
  {
    id: 'recipe_plate_class_1a_t1',
    name: 'Пластина класса 1А x1 (T1)',
    workstationId: 'sewing_bench',
    category: 'Броня',
    tier: 1,
    craftTimeSec: 15,
    durabilityCost: 2,
    inputs: [
      { itemId: 'clean_cloth', amount: 5 },
      { itemId: 'rubber', amount: 10 },
      { itemId: 'sewing_kit', amount: 5 },
      { itemId: 'carbon_steel', amount: 3 }
    ],
    outputs: [{ itemId: 'plate_class_1a', amount: 1 }]
  },
  {
    id: 'recipe_body_armor_t1',
    name: 'Бронежилет x1 (T1)',
    workstationId: 'sewing_bench',
    category: 'Броня',
    tier: 1,
    craftTimeSec: 30,
    durabilityCost: 25,
    inputs: [
      { itemId: 'durable_cloth', amount: 6 },
      { itemId: 'tanned_leather', amount: 2 },
      { itemId: 'polycarbonate', amount: 1 },
      { itemId: 'rubber', amount: 5 },
      { itemId: 'sewing_kit', amount: 2 },
      { itemId: 'stainless_steel', amount: 3 }
    ],
    outputs: [{ itemId: 'body_armor', amount: 1 }]
  },
  {
    id: 'recipe_chest_rig_t1',
    name: 'Разгрузка x1 (T1)',
    workstationId: 'sewing_bench',
    category: 'Броня',
    tier: 1,
    craftTimeSec: 25,
    durabilityCost: 25,
    inputs: [
      { itemId: 'tanned_leather', amount: 2 },
      { itemId: 'polycarbonate', amount: 1 },
      { itemId: 'rubber', amount: 5 },
      { itemId: 'sewing_kit', amount: 2 }
    ],
    outputs: [{ itemId: 'chest_rig', amount: 1 }]
  },
  {
    id: 'recipe_radio_body_armor_t1',
    name: 'Бронежилет с рацией x1 (T1)',
    workstationId: 'sewing_bench',
    category: 'Броня',
    tier: 1,
    craftTimeSec: 35,
    durabilityCost: 25,
    inputs: [
      { itemId: 'circuit_board', amount: 1 },
      { itemId: 'durable_cloth', amount: 6 },
      { itemId: 'tanned_leather', amount: 2 },
      { itemId: 'plastic', amount: 1 },
      { itemId: 'polycarbonate', amount: 1 },
      { itemId: 'rubber', amount: 5 }
    ],
    outputs: [{ itemId: 'radio_body_armor', amount: 1 }]
  },

  // --- ТИР 2 БРОНЯ ---
  {
    id: 'recipe_plate_class_1a_t2',
    name: 'Плита класса 1А x1 (T2)',
    workstationId: 'sewing_bench',
    category: 'Броня',
    tier: 2,
    craftTimeSec: 15,
    durabilityCost: 1,
    inputs: [
      { itemId: 'clean_cloth', amount: 3 },
      { itemId: 'rubber', amount: 3 },
      { itemId: 'sewing_kit', amount: 3 },
      { itemId: 'carbon_steel', amount: 1 }
    ],
    outputs: [{ itemId: 'plate_class_1a', amount: 1 }]
  },

  // --- ТИР 3 БРОНЯ ---
  {
    id: 'recipe_plate_class_2a_t3',
    name: 'Плита класса 2А x1 (T3)',
    workstationId: 'sewing_bench',
    category: 'Броня',
    tier: 3,
    craftTimeSec: 20,
    durabilityCost: 2,
    inputs: [
      { itemId: 'clean_cloth', amount: 5 },
      { itemId: 'tanned_leather', amount: 1 },
      { itemId: 'polycarbonate', amount: 1 },
      { itemId: 'rubber', amount: 10 },
      { itemId: 'sewing_kit', amount: 1 },
      { itemId: 'carbon_steel', amount: 2 }
    ],
    outputs: [{ itemId: 'plate_class_2a', amount: 1 }]
  },

  // --- ТИР 4 БРОНЯ ---
  {
    id: 'recipe_plate_class_3_t4',
    name: 'Плита класса 3 x1 (T4)',
    workstationId: 'sewing_bench',
    category: 'Броня',
    tier: 4,
    craftTimeSec: 25,
    durabilityCost: 4,
    inputs: [
      { itemId: 'durable_cloth', amount: 4 },
      { itemId: 'tanned_leather', amount: 2 },
      { itemId: 'polycarbonate', amount: 1 },
      { itemId: 'rubber', amount: 5 },
      { itemId: 'sewing_kit', amount: 2 },
      { itemId: 'alloy_steel', amount: 1 }
    ],
    outputs: [{ itemId: 'plate_class_3', amount: 1 }]
  },

  // ==========================================
  // === ШВЕЙНЫЙ СТОЛ: Кожа
  // ==========================================

  // --- ТИР 1 КОЖА ---
  {
    id: 'recipe_cleaned_hide_t1',
    name: 'Очищенная шкура x10 (T1)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 1,
    craftTimeSec: 15,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'raw_hide', amount: 5 },
      { itemId: 'reagent_jars', amount: 10 },
      { itemId: 'salt', amount: 5 },
      { itemId: 'dirty_water', amount: 5 }
    ],
    outputs: [{ itemId: 'cleaned_hide', amount: 10 }]
  },
  {
    id: 'recipe_tanned_leather_t1',
    name: 'Дубленая кожа x5 (T1)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 1,
    craftTimeSec: 20,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'cleaned_hide', amount: 10 },
      { itemId: 'wood_bark', amount: 15 },
      { itemId: 'dirty_water', amount: 5 }
    ],
    outputs: [{ itemId: 'tanned_leather', amount: 5 }]
  },
  {
    id: 'recipe_gelatin_capsule_pack_t1',
    name: 'Пакетик желатиновых капсул x10 (T1)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 0.15,
    inputs: [
      { itemId: 'animal_bones', amount: 5 }
    ],
    outputs: [{ itemId: 'gelatin_capsule_pack', amount: 10 }]
  },
  {
    id: 'recipe_sewing_kit_t1',
    name: 'Швейный набор x6 (T1)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 0.2,
    inputs: [
      { itemId: 'scrap_metal', amount: 7 },
      { itemId: 'plastic', amount: 10 }
    ],
    outputs: [{ itemId: 'sewing_kit', amount: 6 }]
  },

  // --- ТИР 2 КОЖА ---
  {
    id: 'recipe_cleaned_hide_t2',
    name: 'Очищенная шкура x10 (T2)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 2,
    craftTimeSec: 15,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'ethanol', amount: 5 },
      { itemId: 'raw_hide', amount: 5 },
      { itemId: 'dirty_water', amount: 1 }
    ],
    outputs: [{ itemId: 'cleaned_hide', amount: 10 }]
  },
  {
    id: 'recipe_tanned_leather_t2',
    name: 'Дубленая кожа x5 (T2)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 2,
    craftTimeSec: 20,
    durabilityCost: 0.25,
    inputs: [
      { itemId: 'tannin', amount: 5 },
      { itemId: 'cleaned_hide', amount: 10 },
      { itemId: 'dirty_water', amount: 1 }
    ],
    outputs: [{ itemId: 'tanned_leather', amount: 5 }]
  },
  {
    id: 'recipe_gelatin_capsule_pack_t2',
    name: 'Пакетик желатиновых капсул x20 (T2)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 0.15,
    inputs: [
      { itemId: 'animal_bones', amount: 5 }
    ],
    outputs: [{ itemId: 'gelatin_capsule_pack', amount: 20 }]
  },
  {
    id: 'recipe_sewing_kit_t2',
    name: 'Швейный набор x10 (T2)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 0.15,
    inputs: [
      { itemId: 'scrap_metal', amount: 5 },
      { itemId: 'plastic', amount: 7 }
    ],
    outputs: [{ itemId: 'sewing_kit', amount: 10 }]
  },
  {
    id: 'recipe_tattoo_machine_wire_belt_t2',
    name: 'Ремень провода тату-машинки x1 (T2)',
    workstationId: 'sewing_bench',
    category: 'Кожа',
    tier: 2,
    craftTimeSec: 15,
    durabilityCost: 0.15,
    inputs: [
      { itemId: 'tanned_leather', amount: 2 },
      { itemId: 'rubber', amount: 5 }
    ],
    outputs: [{ itemId: 'tattoo_machine_wire_belt', amount: 1 }]
  }
];
