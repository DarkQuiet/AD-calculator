import type { Workstation, Item, Recipe } from '../types/crafting';

export const chemBenchWorkstation: Workstation = {
  id: 'chem_bench',
  name: 'Химический стол',
  icon: 'FlaskConical',
  maxDurability: 800,
  categories: ['Медицина', 'Реагенты и Нефтехимия', 'Полимеры'],
  description: 'Синтез полимеров и химических компонентов.'
};

export const chemBenchItems: Record<string, Item> = {
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
  durable_cloth: { id: 'durable_cloth', name: 'Прочная ткань', icon: 'Layers', isBase: false },
  chlorine: { id: 'chlorine', name: 'Хлорин', icon: 'FlaskConical', isBase: false },
  rocket_flare: { id: 'rocket_flare', name: 'Ракетница', icon: 'FlaskConical', isBase: false },

  // === КРАФТОВЫЕ ПРЕДМЕТЫ (Полимеры) ===
  plastic: { id: 'plastic', name: 'Пластик', icon: 'Square', isBase: false },
  plastic_bottle: { id: 'plastic_bottle', name: 'Пластиковая бутылка', icon: 'Droplet', isBase: false },
  mpd: { id: 'mpd', name: 'МПД', icon: 'FlaskConical', isBase: false },
  mini_poly_containers: { id: 'mini_poly_containers', name: 'Миниатюрные полимерные контейнеры', icon: 'Box', isBase: false },
  polycarbonate: { id: 'polycarbonate', name: 'Поликарбонат', icon: 'Layers', isBase: false },

  // === КРАФТОВЫЕ ПРЕДМЕТЫ (Медицина) ===
  clean_bandage: { id: 'clean_bandage', name: 'Чистый бинт', icon: 'Layers', isBase: false },
  med_bandage: { id: 'med_bandage', name: 'Медицинский бинт', icon: 'Layers', isBase: false },
  hemostatic_bandage: { id: 'hemostatic_bandage', name: 'Бинт с гемостатическим порошком', icon: 'Layers', isBase: false },
  empty_blood_bag: { id: 'empty_blood_bag', name: 'Пустой пакет крови', icon: 'Box', isBase: false },
  med_splint: { id: 'med_splint', name: 'Медицинская шина', icon: 'Box', isBase: false },
  sal_ammoniac: { id: 'sal_ammoniac', name: 'Нашатырный спирт', icon: 'FlaskConical', isBase: false },
  ibuprofen: { id: 'ibuprofen', name: 'Ибупрофен', icon: 'FlaskConical', isBase: false },
  vicodin: { id: 'vicodin', name: 'Викодин', icon: 'FlaskConical', isBase: false },
  nurofen_d: { id: 'nurofen_d', name: 'Нейрофен-Д', icon: 'FlaskConical', isBase: false },
  first_aid_kit: { id: 'first_aid_kit', name: 'Набор первой помощи', icon: 'Box', isBase: false },
  medical_kit: { id: 'medical_kit', name: 'Медицинская аптечка', icon: 'Box', isBase: false },
  scalpel: { id: 'scalpel', name: 'Скальпель', icon: 'Scissors', isBase: false },
  iv_drip: { id: 'iv_drip', name: 'Капельница', icon: 'Box', isBase: false }
};

export const chemBenchRecipes: Recipe[] = [
  // ==========================================
  // === ХИМИЧЕСКИЙ СТОЛ: Медицина
  // ==========================================

  // --- ТИР 1 МЕДИЦИНА ---
  {
    id: 'recipe_clean_bandage_t1',
    name: 'Чистый бинт x4 (T1)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1.5,
    inputs: [
      { itemId: 'clean_cloth', amount: 10 },
      { itemId: 'med_reagents', amount: 3 }
    ],
    outputs: [{ itemId: 'clean_bandage', amount: 4 }]
  },
  {
    id: 'recipe_chlorine_t1',
    name: 'Хлорин x5 (T1)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'reagent_jars', amount: 5 },
      { itemId: 'salt', amount: 2 },
      { itemId: 'dirty_water', amount: 1 }
    ],
    outputs: [{ itemId: 'chlorine', amount: 5 }]
  },
  {
    id: 'recipe_empty_blood_bag_t1',
    name: 'Пустой пакет крови x10 (T1)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'plastic', amount: 5 }
    ],
    outputs: [{ itemId: 'empty_blood_bag', amount: 10 }]
  },
  {
    id: 'recipe_med_splint_t1',
    name: 'Медицинская шина x1 (T1)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 2,
    inputs: [
      { itemId: 'dirty_bandage', amount: 3 },
      { itemId: 'wood', amount: 6 }
    ],
    outputs: [{ itemId: 'med_splint', amount: 1 }]
  },
  {
    id: 'recipe_sal_ammoniac_t1',
    name: 'Нашатырный спирт x1 (T1)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'empty_bottle', amount: 1 },
      { itemId: 'glycerin', amount: 2 },
      { itemId: 'saltpeter', amount: 2 },
      { itemId: 'clean_water', amount: 1 }
    ],
    outputs: [{ itemId: 'sal_ammoniac', amount: 1 }]
  },
  {
    id: 'recipe_ibuprofen_t1',
    name: 'Ибупрофен x1 (T1)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'med_reagents', amount: 4 },
      { itemId: 'gelatin_capsule_pack', amount: 4 }
    ],
    outputs: [{ itemId: 'ibuprofen', amount: 1 }]
  },

  // --- ТИР 2 МЕДИЦИНА ---
  {
    id: 'recipe_first_aid_kit_t2',
    name: 'Набор первой помощи x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 15,
    durabilityCost: 3,
    inputs: [
      { itemId: 'clean_bandage', amount: 1 },
      { itemId: 'med_reagents', amount: 10 },
      { itemId: 'rubber', amount: 1 },
      { itemId: 'sewing_kit', amount: 10 },
      { itemId: 'field_surgical_kit', amount: 2 }
    ],
    outputs: [{ itemId: 'first_aid_kit', amount: 1 }]
  },
  {
    id: 'recipe_clean_bandage_t2',
    name: 'Чистый бинт x4 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'clean_cloth', amount: 5 },
      { itemId: 'med_reagents', amount: 2 }
    ],
    outputs: [{ itemId: 'clean_bandage', amount: 4 }]
  },
  {
    id: 'recipe_med_bandage_t2',
    name: 'Медицинский бинт x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'clean_bandage', amount: 1 },
      { itemId: 'med_reagents', amount: 2 }
    ],
    outputs: [{ itemId: 'med_bandage', amount: 1 }]
  },
  {
    id: 'recipe_chlorine_t2',
    name: 'Хлорин x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'med_reagents', amount: 5 },
      { itemId: 'dirty_water', amount: 1 }
    ],
    outputs: [{ itemId: 'chlorine', amount: 10 }]
  },
  {
    id: 'recipe_med_splint_t2',
    name: 'Медицинская шина x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 2,
    inputs: [
      { itemId: 'clean_cloth', amount: 2 },
      { itemId: 'wood', amount: 3 }
    ],
    outputs: [{ itemId: 'med_splint', amount: 1 }]
  },
  {
    id: 'recipe_sal_ammoniac_t2',
    name: 'Нашатырный спирт x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 2,
    inputs: [
      { itemId: 'empty_bottle', amount: 1 },
      { itemId: 'med_reagents', amount: 3 },
      { itemId: 'clean_water', amount: 1 }
    ],
    outputs: [{ itemId: 'sal_ammoniac', amount: 1 }]
  },
  {
    id: 'recipe_ibuprofen_t2',
    name: 'Ибупрофен x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 1 },
      { itemId: 'med_reagents', amount: 2 },
      { itemId: 'gelatin_capsule_pack', amount: 4 }
    ],
    outputs: [{ itemId: 'ibuprofen', amount: 1 }]
  },
  {
    id: 'recipe_vicodin_t2',
    name: 'Викодин x1 (T2)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 2,
    inputs: [
      { itemId: 'silicate_vessels', amount: 1 },
      { itemId: 'med_reagents', amount: 3 },
      { itemId: 'gelatin_capsule_pack', amount: 4 }
    ],
    outputs: [{ itemId: 'vicodin', amount: 1 }]
  },

  // --- ТИР 3 МЕДИЦИНА ---
  {
    id: 'recipe_medical_kit_t3',
    name: 'Медицинская аптечка x1 (T3)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 3,
    craftTimeSec: 20,
    durabilityCost: 5,
    inputs: [
      { itemId: 'med_bandage', amount: 2 },
      { itemId: 'med_reagents', amount: 15 },
      { itemId: 'rubber', amount: 5 },
      { itemId: 'sewing_kit', amount: 10 },
      { itemId: 'field_surgical_kit', amount: 3 }
    ],
    outputs: [{ itemId: 'medical_kit', amount: 1 }]
  },
  {
    id: 'recipe_hemostatic_bandage_t3',
    name: 'Бинт с гемостатическим порошком x1 (T3)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'med_bandage', amount: 1 },
      { itemId: 'chem_stabilizer', amount: 1 },
      { itemId: 'med_reagents', amount: 5 }
    ],
    outputs: [{ itemId: 'hemostatic_bandage', amount: 1 }]
  },
  {
    id: 'recipe_scalpel_t3',
    name: 'Скальпель x1 (T3)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 3,
    craftTimeSec: 15,
    durabilityCost: 5,
    inputs: [
      { itemId: 'polycarbonate', amount: 1 },
      { itemId: 'precision_parts', amount: 1 }
    ],
    outputs: [{ itemId: 'scalpel', amount: 1 }]
  },
  {
    id: 'recipe_iv_drip_t3',
    name: 'Капельница x1 (T3)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 3,
    craftTimeSec: 15,
    durabilityCost: 5,
    inputs: [
      { itemId: 'duct_tape', amount: 1 },
      { itemId: 'med_reagents', amount: 15 },
      { itemId: 'plastic', amount: 2 },
      { itemId: 'sewing_kit', amount: 1 }
    ],
    outputs: [{ itemId: 'iv_drip', amount: 1 }]
  },
  {
    id: 'recipe_nurofen_d_t3',
    name: 'Нейрофен-Д x1 (T3)',
    workstationId: 'chem_bench',
    category: 'Медицина',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 3,
    inputs: [
      { itemId: 'silicate_vessels', amount: 1 },
      { itemId: 'med_reagents', amount: 4 },
      { itemId: 'gelatin_capsule_pack', amount: 1 }
    ],
    outputs: [{ itemId: 'nurofen_d', amount: 1 }]
  },

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
    id: 'recipe_rocket_flare_t1',
    name: 'Ракетница x3 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 0.5,
    inputs: [
      { itemId: 'coal', amount: 1 },
      { itemId: 'plastic', amount: 5 },
      { itemId: 'cartridge_cases', amount: 1 },
      { itemId: 'gunpowder', amount: 2 }
    ],
    outputs: [{ itemId: 'rocket_flare', amount: 3 }]
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

  // --- ЧИСТАЯ ТКАНЬ ---
  {
    id: 'recipe_clean_cloth_t1',
    name: 'Чистая ткань x15 (T1)',
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
    outputs: [{ itemId: 'clean_cloth', amount: 15 }]
  },
  {
    id: 'recipe_clean_cloth_t2',
    name: 'Чистая ткань x20 (T2)',
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
    outputs: [{ itemId: 'clean_cloth', amount: 20 }]
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
  }
];
