import type { Workstation, Item, Recipe } from '../types/crafting';

export const WORKSTATIONS: Workstation[] = [
  {
    id: 'weapons_bench',
    name: 'Оружейный стол',
    icon: 'Crosshair',
    maxDurability: 1000,
    categories: ['Оружейные обвесы', 'Оружие', 'Патроны'],
    description: 'Огнестрельное оружие, модули и боеприпасы.'
  },
  {
    id: 'tech_bench',
    name: 'Технический стол',
    icon: 'Cpu',
    maxDurability: 1500,
    categories: ['Электроника', 'Металлолом'],
    description: 'Электроника, микросхемы и плавка металла.'
  },
  {
    id: 'chem_bench',
    name: 'Химический стол',
    icon: 'FlaskConical',
    maxDurability: 800,
    categories: ['Медицина', 'Реагенты и Нефтехимия', 'Полимеры'],
    description: 'Синтез полимеров и химических компонентов.'
  },
  {
    id: 'sewing_bench',
    name: 'Швейный стол',
    icon: 'Scissors',
    maxDurability: 1200,
    categories: ['Рюкзаки', 'Кожа', 'Броня'],
    description: 'Экипировка, элементы брони и сумки.'
  }
];

export const ITEMS: Record<string, Item> = {
  // === БАЗОВОЕ СЫРЬЕ И КОМПОНЕНТЫ ===
  silicate_vessels: { id: 'silicate_vessels', name: 'Силикатные сосуды', icon: 'FlaskConical', isBase: false },
  oil_raw: { id: 'oil_raw', name: 'Нефть', icon: 'Droplet', isBase: true },
  sodium_phosphate: { id: 'sodium_phosphate', name: 'Фосфонат натрия', icon: 'Sparkles', isBase: false },
  ferrocene: { id: 'ferrocene', name: 'Ферроцен', icon: 'Box', isBase: false },
  chem_concentrate_jar: { id: 'chem_concentrate_jar', name: 'Баночка с хим. концентратом', icon: 'FlaskConical', isBase: true },
  oil_bottle: { id: 'oil_bottle', name: 'Бутылка с нефтью', icon: 'Droplet', isBase: true },
  coal: { id: 'coal', name: 'Уголь', icon: 'Flame', isBase: true },
  reagent_jars: { id: 'reagent_jars', name: 'Баночки с реагентами', icon: 'FlaskConical', isBase: true },
  scrap_metal: { id: 'scrap_metal', name: 'Металлолом', icon: 'Box', isBase: true },
  gunpowder: { id: 'gunpowder', name: 'Порох', icon: 'Flame', isBase: false },
  carbon_steel: { id: 'carbon_steel', name: 'Углеродная сталь', icon: 'Box', isBase: true },

  // --- Базовые компоненты для Реагентов и Полимеров ---
  hand_sanitizer: { id: 'hand_sanitizer', name: 'Санитайзер для рук', icon: 'FlaskConical', isBase: true },
  wood_bark: { id: 'wood_bark', name: 'Древесная кора', icon: 'Box', isBase: true },
  nail_polish_remover: { id: 'nail_polish_remover', name: 'Жидкость для снятия лака', icon: 'FlaskConical', isBase: true },
  dirty_water: { id: 'dirty_water', name: 'Грязная вода', icon: 'Droplet', isBase: true },
  chalk: { id: 'chalk', name: 'Мел', icon: 'Box', isBase: true },
  dirty_cloth: { id: 'dirty_cloth', name: 'Грязная ткань', icon: 'Layers', isBase: true },
  clean_cloth: { id: 'clean_cloth', name: 'Чистая ткань', icon: 'Layers', isBase: true },
  chlorine: { id: 'chlorine', name: 'Хлорин', icon: 'FlaskConical', isBase: true },
  sulfur_ore: { id: 'sulfur_ore', name: 'Серная руда', icon: 'Box', isBase: true },
  methanol: { id: 'methanol', name: 'Метанол', icon: 'FlaskConical', isBase: true },
  synthetic_junk: { id: 'synthetic_junk', name: 'Синтетический мусор', icon: 'Box', isBase: true },
  wires: { id: 'wires', name: 'Провода', icon: 'Cpu', isBase: true },
  glass: { id: 'glass', name: 'Стекло', icon: 'Box', isBase: true },

  // === КРАФТОВЫЕ ПРЕДМЕТЫ (Нефтехимия и Реагенты) ===
  tech_oil: { id: 'tech_oil', name: 'Техническое масло', icon: 'Droplet', isBase: false },
  gun_synth_oil: { id: 'gun_synth_oil', name: 'Оружейное синтетическое масло', icon: 'Droplet', isBase: false },
  nylon: { id: 'nylon', name: 'Нейлон', icon: 'Layers', isBase: false },
  rubber: { id: 'rubber', name: 'Резина', icon: 'Square', isBase: false },
  gasoline_canister: { id: 'gasoline_canister', name: 'Канистра бензина', icon: 'Flame', isBase: false },
  gas_cutter_canister: { id: 'gas_cutter_canister', name: 'Канистра для бензореза', icon: 'Flame', isBase: false },
  phenol: { id: 'phenol', name: 'Фенол', icon: 'FlaskConical', isBase: false },
  glycerin: { id: 'glycerin', name: 'Глицерин', icon: 'FlaskConical', isBase: false },
  edta: { id: 'edta', name: 'ЭДТА', icon: 'FlaskConical', isBase: false },
  med_reagents: { id: 'med_reagents', name: 'Медицинские реагенты', icon: 'FlaskConical', isBase: false },
  ethanol: { id: 'ethanol', name: 'Этанол', icon: 'FlaskConical', isBase: false },
  tannin: { id: 'tannin', name: 'Танин', icon: 'FlaskConical', isBase: false },
  sulfur: { id: 'sulfur', name: 'Сера', icon: 'Sparkles', isBase: false },
  saltpeter: { id: 'saltpeter', name: 'Селитра', icon: 'Sparkles', isBase: false },
  acetone: { id: 'acetone', name: 'Ацетон', icon: 'FlaskConical', isBase: false },
  calcium_carbonate: { id: 'calcium_carbonate', name: 'Карбонат кальция', icon: 'Sparkles', isBase: false },
  cloth: { id: 'cloth', name: 'Ткань', icon: 'Layers', isBase: false },
  durable_cloth: { id: 'durable_cloth', name: 'Прочная ткань', icon: 'Layers', isBase: false },

  // === КРАФТОВЫЕ ПРЕДМЕТЫ (Полимеры) ===
  plastic: { id: 'plastic', name: 'Пластик', icon: 'Square', isBase: false },
  plastic_bottle: { id: 'plastic_bottle', name: 'Пластиковая бутылка', icon: 'Droplet', isBase: false },
  mpd: { id: 'mpd', name: 'МПД', icon: 'FlaskConical', isBase: false },
  mini_poly_containers: { id: 'mini_poly_containers', name: 'Миниатюрные полимерные контейнеры', icon: 'Box', isBase: false },
  polycarbonate: { id: 'polycarbonate', name: 'Поликарбонат', icon: 'Layers', isBase: false },

  // === КРАФТОВЫЕ ПРЕДМЕТЫ (Патроны и Гильзы) ===
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

export const RECIPES: Recipe[] = [
  // ==========================================
  // === ХИМИЧЕСКИЙ СТОЛ: Полимеры
  // ==========================================

  // --- ТИР 1 ПОЛИМЕРЫ ---
  {
    id: 'recipe_plastic_t1',
    name: 'Пластик x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'coal', amount: 5 },
      { itemId: 'synthetic_junk', amount: 10 }
    ],
    outputs: [{ itemId: 'plastic', amount: 10 }]
  },
  {
    id: 'recipe_plastic_bottle_t1',
    name: 'Пластиковая бутылка x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 0.6,
    inputs: [
      { itemId: 'plastic', amount: 4 }
    ],
    outputs: [{ itemId: 'plastic_bottle', amount: 10 }]
  },
  {
    id: 'recipe_mpd_t1',
    name: 'МПД x20 (T1)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'ethanol', amount: 5 },
      { itemId: 'plastic', amount: 10 }
    ],
    outputs: [{ itemId: 'mpd', amount: 20 }]
  },
  {
    id: 'recipe_mini_poly_containers_t1',
    name: 'Миниатюрные полимерные контейнеры x1 (T1)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 1,
    craftTimeSec: 15,
    durabilityCost: 1,
    inputs: [
      { itemId: 'plastic', amount: 10 },
      { itemId: 'polycarbonate', amount: 1 },
      { itemId: 'wires', amount: 3 }
    ],
    outputs: [{ itemId: 'mini_poly_containers', amount: 1 }]
  },
  {
    id: 'recipe_silicate_vessels_t1',
    name: 'Силикатные сосуды x15 (T1)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'calcium_carbonate', amount: 5 },
      { itemId: 'glass', amount: 4 },
      { itemId: 'coal', amount: 3 }
    ],
    outputs: [{ itemId: 'silicate_vessels', amount: 15 }]
  },

  // --- ТИР 2 ПОЛИМЕРЫ ---
  {
    id: 'recipe_plastic_t2',
    name: 'Пластик x15 (T2)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 0.7,
    inputs: [
      { itemId: 'coal', amount: 4 },
      { itemId: 'synthetic_junk', amount: 10 }
    ],
    outputs: [{ itemId: 'plastic', amount: 15 }]
  },
  {
    id: 'recipe_polycarbonate_t2',
    name: 'Поликарбонат x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 2,
    craftTimeSec: 15,
    durabilityCost: 2,
    inputs: [
      { itemId: 'acetone', amount: 5 },
      { itemId: 'calcium_carbonate', amount: 15 },
      { itemId: 'ferrocene', amount: 10 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'plastic', amount: 15 }
    ],
    outputs: [{ itemId: 'polycarbonate', amount: 10 }]
  },
  {
    id: 'recipe_mpd_t2',
    name: 'МПД x30 (T2)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'ethanol', amount: 5 },
      { itemId: 'plastic', amount: 10 }
    ],
    outputs: [{ itemId: 'mpd', amount: 30 }]
  },
  {
    id: 'recipe_silicate_vessels_t2',
    name: 'Силикатные сосуды x20 (T2)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'calcium_carbonate', amount: 4 },
      { itemId: 'glass', amount: 4 },
      { itemId: 'coal', amount: 3 }
    ],
    outputs: [{ itemId: 'silicate_vessels', amount: 20 }]
  },

  // --- ТИР 3 ПОЛИМЕРЫ ---
  {
    id: 'recipe_polycarbonate_t3',
    name: 'Поликарбонат x15 (T3)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 3,
    craftTimeSec: 15,
    durabilityCost: 1.5,
    inputs: [
      { itemId: 'calcium_carbonate', amount: 15 },
      { itemId: 'ferrocene', amount: 5 },
      { itemId: 'nylon', amount: 15 },
      { itemId: 'coal', amount: 5 }
    ],
    outputs: [{ itemId: 'polycarbonate', amount: 15 }]
  },
  {
    id: 'recipe_mpd_t3',
    name: 'МПД x50 (T3)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'ethanol', amount: 5 },
      { itemId: 'plastic', amount: 10 }
    ],
    outputs: [{ itemId: 'mpd', amount: 50 }]
  },
  {
    id: 'recipe_silicate_vessels_t3',
    name: 'Силикатные сосуды x25 (T3)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'calcium_carbonate', amount: 4 },
      { itemId: 'glass', amount: 3 },
      { itemId: 'coal', amount: 3 }
    ],
    outputs: [{ itemId: 'silicate_vessels', amount: 25 }]
  },

  // --- ТИР 4 ПОЛИМЕРЫ ---
  {
    id: 'recipe_polycarbonate_t4',
    name: 'Поликарбонат x20 (T4)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 4,
    craftTimeSec: 15,
    durabilityCost: 2,
    inputs: [
      { itemId: 'calcium_carbonate', amount: 15 },
      { itemId: 'ferrocene', amount: 5 },
      { itemId: 'nylon', amount: 10 },
      { itemId: 'coal', amount: 5 }
    ],
    outputs: [{ itemId: 'polycarbonate', amount: 20 }]
  },

  // ==========================================
  // === ХИМИЧЕСКИЙ СТОЛ: Реагенты и Нефтехимия
  // ==========================================

  // --- ФЕНОЛ ---
  {
    id: 'recipe_phenol_t1',
    name: 'Фенол x5 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [{ itemId: 'sodium_phosphate', amount: 10 }],
    outputs: [{ itemId: 'phenol', amount: 5 }]
  },
  {
    id: 'recipe_phenol_t2',
    name: 'Фенол x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [{ itemId: 'sodium_phosphate', amount: 10 }],
    outputs: [{ itemId: 'phenol', amount: 10 }]
  },

  // --- ГЛИЦЕРИН ---
  {
    id: 'recipe_glycerin_t1',
    name: 'Глицерин x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 1 },
      { itemId: 'hand_sanitizer', amount: 5 }
    ],
    outputs: [{ itemId: 'glycerin', amount: 10 }]
  },
  {
    id: 'recipe_glycerin_t2',
    name: 'Глицерин x15 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 1 },
      { itemId: 'hand_sanitizer', amount: 5 }
    ],
    outputs: [{ itemId: 'glycerin', amount: 15 }]
  },
  {
    id: 'recipe_glycerin_t3',
    name: 'Глицерин x25 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 1 },
      { itemId: 'hand_sanitizer', amount: 5 }
    ],
    outputs: [{ itemId: 'glycerin', amount: 25 }]
  },

  // --- ЭДТА ---
  {
    id: 'recipe_edta_t1',
    name: 'ЭДТА x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'med_reagents', amount: 5 },
      { itemId: 'reagent_jars', amount: 1 }
    ],
    outputs: [{ itemId: 'edta', amount: 10 }]
  },
  {
    id: 'recipe_edta_t2',
    name: 'ЭДТА x15 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'med_reagents', amount: 5 },
      { itemId: 'reagent_jars', amount: 1 }
    ],
    outputs: [{ itemId: 'edta', amount: 15 }]
  },

  // --- МЕДИЦИНСКИЕ РЕАГЕНТЫ ---
  {
    id: 'recipe_med_reagents_t1',
    name: 'Медицинские реагенты x5 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'coal', amount: 2 },
      { itemId: 'reagent_jars', amount: 15 }
    ],
    outputs: [{ itemId: 'med_reagents', amount: 5 }]
  },
  {
    id: 'recipe_med_reagents_t2',
    name: 'Медицинские реагенты x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'phenol', amount: 10 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'med_reagents', amount: 10 }]
  },
  {
    id: 'recipe_med_reagents_t3',
    name: 'Медицинские реагенты x10 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'phenol', amount: 10 },
      { itemId: 'glycerin', amount: 3 }
    ],
    outputs: [{ itemId: 'med_reagents', amount: 10 }]
  },

  // --- ЭТАНОЛ ---
  {
    id: 'recipe_ethanol_t1',
    name: 'Этанол x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [{ itemId: 'hand_sanitizer', amount: 10 }],
    outputs: [{ itemId: 'ethanol', amount: 10 }]
  },
  {
    id: 'recipe_ethanol_t2',
    name: 'Этанол x12 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'methanol', amount: 7 },
      { itemId: 'reagent_jars', amount: 2 }
    ],
    outputs: [{ itemId: 'ethanol', amount: 12 }]
  },
  {
    id: 'recipe_ethanol_t3',
    name: 'Этанол x25 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 5 },
      { itemId: 'reagent_jars', amount: 3 },
      { itemId: 'hand_sanitizer', amount: 5 }
    ],
    outputs: [{ itemId: 'ethanol', amount: 25 }]
  },

  // --- ФОСФОНАТ НАТРИЯ ---
  {
    id: 'recipe_sodium_phosphate_t1',
    name: 'Фосфонат натрия x7 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'sodium_phosphate', amount: 7 }]
  },
  {
    id: 'recipe_sodium_phosphate_t2',
    name: 'Фосфонат натрия x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'sodium_phosphate', amount: 10 }]
  },
  {
    id: 'recipe_sodium_phosphate_t3',
    name: 'Фосфонат натрия x15 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'sodium_phosphate', amount: 15 }]
  },

  // --- ТАНИН ---
  {
    id: 'recipe_tannin_t1',
    name: 'Танин x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'reagent_jars', amount: 2 },
      { itemId: 'wood_bark', amount: 7 }
    ],
    outputs: [{ itemId: 'tannin', amount: 10 }]
  },
  {
    id: 'recipe_tannin_t2',
    name: 'Танин x15 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'reagent_jars', amount: 2 },
      { itemId: 'wood_bark', amount: 5 }
    ],
    outputs: [{ itemId: 'tannin', amount: 15 }]
  },
  {
    id: 'recipe_tannin_t3',
    name: 'Танин x20 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'reagent_jars', amount: 2 },
      { itemId: 'wood_bark', amount: 5 }
    ],
    outputs: [{ itemId: 'tannin', amount: 20 }]
  },

  // --- СЕРА ---
  {
    id: 'recipe_sulfur_t1',
    name: 'Сера x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'sulfur', amount: 10 }]
  },
  {
    id: 'recipe_sulfur_t2',
    name: 'Сера x20 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'sulfur_ore', amount: 4 },
      { itemId: 'reagent_jars', amount: 4 }
    ],
    outputs: [{ itemId: 'sulfur', amount: 20 }]
  },
  {
    id: 'recipe_sulfur_t3',
    name: 'Сера x25 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'sulfur_ore', amount: 3 },
      { itemId: 'reagent_jars', amount: 3 }
    ],
    outputs: [{ itemId: 'sulfur', amount: 25 }]
  },

  // --- СЕЛИТРА ---
  {
    id: 'recipe_saltpeter_t1',
    name: 'Селитра x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'saltpeter', amount: 10 }]
  },
  {
    id: 'recipe_saltpeter_t2',
    name: 'Селитра x15 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'saltpeter', amount: 15 }]
  },
  {
    id: 'recipe_saltpeter_t3',
    name: 'Селитра x25 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 5 },
      { itemId: 'reagent_jars', amount: 10 }
    ],
    outputs: [{ itemId: 'saltpeter', amount: 25 }]
  },

  // --- ПОРОХ ---
  {
    id: 'recipe_gunpowder_t1',
    name: 'Порох x12 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'saltpeter', amount: 5 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'sulfur', amount: 5 }
    ],
    outputs: [{ itemId: 'gunpowder', amount: 12 }]
  },
  {
    id: 'recipe_gunpowder_t2',
    name: 'Порох x20 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'saltpeter', amount: 5 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'sulfur', amount: 5 }
    ],
    outputs: [{ itemId: 'gunpowder', amount: 20 }]
  },
  {
    id: 'recipe_gunpowder_t3',
    name: 'Порох x25 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'saltpeter', amount: 5 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'sulfur', amount: 5 }
    ],
    outputs: [{ itemId: 'gunpowder', amount: 25 }]
  },

  // --- АЦЕТОН ---
  {
    id: 'recipe_acetone_t1',
    name: 'Ацетон x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 10 },
      { itemId: 'nail_polish_remover', amount: 10 },
      { itemId: 'reagent_jars', amount: 5 },
      { itemId: 'dirty_water', amount: 5 }
    ],
    outputs: [{ itemId: 'acetone', amount: 10 }]
  },
  {
    id: 'recipe_acetone_t2',
    name: 'Ацетон x15 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 10 },
      { itemId: 'nail_polish_remover', amount: 10 },
      { itemId: 'reagent_jars', amount: 5 },
      { itemId: 'dirty_water', amount: 4 }
    ],
    outputs: [{ itemId: 'acetone', amount: 15 }]
  },
  {
    id: 'recipe_acetone_t3',
    name: 'Ацетон x20 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 10 },
      { itemId: 'nail_polish_remover', amount: 7 },
      { itemId: 'reagent_jars', amount: 5 },
      { itemId: 'dirty_water', amount: 3 }
    ],
    outputs: [{ itemId: 'acetone', amount: 20 }]
  },

  // --- КАРБОНАТ КАЛЬЦИЯ ---
  {
    id: 'recipe_calcium_carbonate_t1',
    name: 'Карбонат кальция x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'chalk', amount: 10 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'reagent_jars', amount: 10 }
    ],
    outputs: [{ itemId: 'calcium_carbonate', amount: 10 }]
  },
  {
    id: 'recipe_calcium_carbonate_t2',
    name: 'Карбонат кальция x20 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'chalk', amount: 4 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'reagent_jars', amount: 4 }
    ],
    outputs: [{ itemId: 'calcium_carbonate', amount: 20 }]
  },
  {
    id: 'recipe_calcium_carbonate_t3',
    name: 'Карбонат кальция x25 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'chalk', amount: 4 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'reagent_jars', amount: 3 }
    ],
    outputs: [{ itemId: 'calcium_carbonate', amount: 25 }]
  },

  // --- ФЕРРОЦЕН ---
  {
    id: 'recipe_ferrocene_t1',
    name: 'Ферроцен x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 5 },
      { itemId: 'reagent_jars', amount: 15 }
    ],
    outputs: [{ itemId: 'ferrocene', amount: 10 }]
  },
  {
    id: 'recipe_ferrocene_t2',
    name: 'Ферроцен x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 5 },
      { itemId: 'reagent_jars', amount: 10 }
    ],
    outputs: [{ itemId: 'ferrocene', amount: 10 }]
  },
  {
    id: 'recipe_ferrocene_t3',
    name: 'Ферроцен x15 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 4 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'ferrocene', amount: 15 }]
  },

  // --- ТКАНЬ ---
  {
    id: 'recipe_cloth_t1',
    name: 'Ткань x15 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'chlorine', amount: 2 },
      { itemId: 'dirty_cloth', amount: 15 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'cloth', amount: 15 }]
  },
  {
    id: 'recipe_cloth_t2',
    name: 'Ткань x20 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'chlorine', amount: 2 },
      { itemId: 'dirty_cloth', amount: 10 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'cloth', amount: 20 }]
  },

  // --- ПРОЧНАЯ ТКАНЬ ---
  {
    id: 'recipe_durable_cloth_t2',
    name: 'Прочная ткань x4 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'clean_cloth', amount: 15 },
      { itemId: 'polycarbonate', amount: 2 },
      { itemId: 'reagent_jars', amount: 3 }
    ],
    outputs: [{ itemId: 'durable_cloth', amount: 4 }]
  },
  {
    id: 'recipe_durable_cloth_t3',
    name: 'Прочная ткань x10 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'clean_cloth', amount: 10 },
      { itemId: 'polycarbonate', amount: 3 },
      { itemId: 'chem_concentrate_jar', amount: 3 }
    ],
    outputs: [{ itemId: 'durable_cloth', amount: 10 }]
  },

  // --- ТЕХНИЧЕСКОЕ МАСЛО ---
  {
    id: 'recipe_tech_oil_t1',
    name: 'Техническое масло x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 10 },
      { itemId: 'oil_raw', amount: 15 },
      { itemId: 'sodium_phosphate', amount: 10 }
    ],
    outputs: [{ itemId: 'tech_oil', amount: 10 }]
  },
  {
    id: 'recipe_tech_oil_t2',
    name: 'Техническое масло x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 10 },
      { itemId: 'oil_raw', amount: 10 },
      { itemId: 'sodium_phosphate', amount: 5 }
    ],
    outputs: [{ itemId: 'tech_oil', amount: 10 }]
  },

  // --- ОРУЖЕЙНОЕ СИНТЕТИЧЕСКОЕ МАСЛО ---
  {
    id: 'recipe_gun_synth_oil_t3',
    name: 'Оружейное синтетическое масло x10 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 15,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 3 },
      { itemId: 'ferrocene', amount: 5 },
      { itemId: 'sodium_phosphate', amount: 5 },
      { itemId: 'tech_oil', amount: 3 },
      { itemId: 'chem_concentrate_jar', amount: 2 }
    ],
    outputs: [{ itemId: 'gun_synth_oil', amount: 10 }]
  },

  // --- НЕФТЬ ---
  {
    id: 'recipe_oil_raw_t1',
    name: 'Нефть x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 5,
    durabilityCost: 0.2,
    inputs: [{ itemId: 'oil_bottle', amount: 5 }],
    outputs: [{ itemId: 'oil_raw', amount: 10 }]
  },

  // --- НЕЙЛОН ---
  {
    id: 'recipe_nylon_t2',
    name: 'Нейлон x5 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'oil_raw', amount: 10 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'nylon', amount: 5 }]
  },
  {
    id: 'recipe_nylon_t3',
    name: 'Нейлон x5 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'oil_raw', amount: 5 },
      { itemId: 'coal', amount: 5 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'nylon', amount: 5 }]
  },

  // --- РЕЗИНА ---
  {
    id: 'recipe_rubber_t1',
    name: 'Резина x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'oil_raw', amount: 3 },
      { itemId: 'coal', amount: 1 },
      { itemId: 'reagent_jars', amount: 1 }
    ],
    outputs: [{ itemId: 'rubber', amount: 10 }]
  },
  {
    id: 'recipe_rubber_t2',
    name: 'Резина x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'oil_raw', amount: 2 },
      { itemId: 'coal', amount: 1 },
      { itemId: 'reagent_jars', amount: 1 }
    ],
    outputs: [{ itemId: 'rubber', amount: 10 }]
  },

  // --- КАНИСТРА БЕНЗИНА ---
  {
    id: 'recipe_gasoline_canister_t1',
    name: 'Канистра бензина x1 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 20,
    durabilityCost: 3,
    inputs: [
      { itemId: 'oil_raw', amount: 30 },
      { itemId: 'sodium_phosphate', amount: 10 },
      { itemId: 'scrap_metal', amount: 25 },
      { itemId: 'coal', amount: 10 }
    ],
    outputs: [{ itemId: 'gasoline_canister', amount: 1 }]
  },
  {
    id: 'recipe_gasoline_canister_t2',
    name: 'Канистра бензина x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 15,
    durabilityCost: 3,
    inputs: [
      { itemId: 'oil_raw', amount: 25 },
      { itemId: 'sodium_phosphate', amount: 5 },
      { itemId: 'scrap_metal', amount: 25 },
      { itemId: 'coal', amount: 10 }
    ],
    outputs: [{ itemId: 'gasoline_canister', amount: 1 }]
  },

  // --- КАНИСТРА ДЛЯ БЕНЗОРЕЗА ---
  {
    id: 'recipe_gas_cutter_canister_t2',
    name: 'Канистра для бензореза x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 15,
    durabilityCost: 2,
    inputs: [
      { itemId: 'oil_raw', amount: 10 },
      { itemId: 'sodium_phosphate', amount: 1 },
      { itemId: 'scrap_metal', amount: 10 },
      { itemId: 'coal', amount: 2 }
    ],
    outputs: [{ itemId: 'gas_cutter_canister', amount: 1 }]
  },

  // ==========================================
  // === ОРУЖЕЙНЫЙ СТОЛ: Патроны
  // ==========================================

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