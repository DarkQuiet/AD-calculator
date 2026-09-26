import type { Recipe } from '../types/crafting';

export const RECIPES: Recipe[] = [
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
  },

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
    outputs: [{ itemId: 'clean_bandage', amount: 4 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'bandages', level: 1 },
    expGiven: 1
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
    outputs: [{ itemId: 'chlorine', amount: 5 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 1 },
    expGiven: 0.7
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
    outputs: [{ itemId: 'empty_blood_bag', amount: 10 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 1 },
    expGiven: 0.5
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
    outputs: [{ itemId: 'med_splint', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 1 },
    expGiven: 1.5
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
    outputs: [{ itemId: 'sal_ammoniac', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'pills', level: 1 },
    expGiven: 1
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
    outputs: [{ itemId: 'ibuprofen', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'pills', level: 1 },
    expGiven: 1
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
    outputs: [{ itemId: 'first_aid_kit', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 2 },
    expGiven: 10
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
    outputs: [{ itemId: 'clean_bandage', amount: 4 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'bandages', level: 2 },
    expGiven: 2
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
    outputs: [{ itemId: 'med_bandage', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'bandages', level: 2 },
    expGiven: 3
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
    outputs: [{ itemId: 'chlorine', amount: 10 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 2 },
    expGiven: 1.5
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
    outputs: [{ itemId: 'med_splint', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 2 },
    expGiven: 2
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
    outputs: [{ itemId: 'sal_ammoniac', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'pills', level: 2 },
    expGiven: 1
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
    outputs: [{ itemId: 'ibuprofen', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'pills', level: 2 },
    expGiven: 2
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
    outputs: [{ itemId: 'vicodin', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'pills', level: 2 },
    expGiven: 3
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
    outputs: [{ itemId: 'medical_kit', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 3 },
    expGiven: 15
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
    outputs: [{ itemId: 'hemostatic_bandage', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'bandages', level: 3 },
    expGiven: 10
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
    outputs: [{ itemId: 'scalpel', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'basic_meds', level: 3 },
    expGiven: 5
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
    outputs: [{ itemId: 'iv_drip', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'pills', level: 3 },
    expGiven: 5
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
    outputs: [{ itemId: 'nurofen_d', amount: 1 }],
    requiredSkill: { professionId: 'pharmacist', skillId: 'pills', level: 3 },
    expGiven: 3
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
    outputs: [{ itemId: 'plastic', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'plastic_bottle', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 1 },
    expGiven: 0.05
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
    outputs: [{ itemId: 'mpd', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'mini_poly_containers', amount: 1 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 1 },
    expGiven: 0
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
    outputs: [{ itemId: 'silicate_vessels', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'glass', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'plastic', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'polycarbonate', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 2 },
    expGiven: 1.5
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
    outputs: [{ itemId: 'mpd', amount: 30 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'silicate_vessels', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'glass', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'polycarbonate', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 3 },
    expGiven: 1.5
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
    outputs: [{ itemId: 'mpd', amount: 50 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'silicate_vessels', amount: 25 }],
    requiredSkill: { professionId: 'chemist', skillId: 'glass', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'polycarbonate', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 4 },
    expGiven: 2
  },
  {
    id: 'recipe_carbon_fiber_t4',
    name: 'Углепластик x1 (T4)',
    workstationId: 'chem_bench',
    category: 'Полимеры',
    tier: 4,
    craftTimeSec: 20,
    durabilityCost: 2,
    inputs: [
      { itemId: 'polycarbonate', amount: 2 },
      { itemId: 'coal', amount: 10 }
    ],
    outputs: [{ itemId: 'carbon_fiber', amount: 1 }],
    requiredSkill: { professionId: 'chemist', skillId: 'polymers', level: 4 },
    expGiven: 2
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
    outputs: [{ itemId: 'phenol', amount: 5 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'phenol', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'glycerin', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'glycerin', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'glycerin', amount: 25 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'edta', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'edta', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'med_reagents', amount: 5 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'med_reagents', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'med_reagents', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_med', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'ethanol', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'ethanol', amount: 12 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'ethanol', amount: 25 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 3 },
    expGiven: 0.15
  },

  // --- ФОСФОНАТ НАТРИЯ ---
  {
    id: 'recipe_sodium_phosphate_t1',
    name: 'Фоссонати натрия x7 (T1)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 1,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'sodium_phosphate', amount: 7 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 1 },
    expGiven: 0.3
  },
  {
    id: 'recipe_sodium_phosphate_t2',
    name: 'Фоссонати натрия x10 (T2)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 2,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'sodium_phosphate', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 2 },
    expGiven: 0.2
  },
  {
    id: 'recipe_sodium_phosphate_t3',
    name: 'Фоссонати натрия x15 (T3)',
    workstationId: 'chem_bench',
    category: 'Реагенты и Нефтехимия',
    tier: 3,
    craftTimeSec: 10,
    durabilityCost: 1,
    inputs: [
      { itemId: 'silicate_vessels', amount: 2 },
      { itemId: 'reagent_jars', amount: 5 }
    ],
    outputs: [{ itemId: 'sodium_phosphate', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'tannin', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'tannin', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'tannin', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'sulfur', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'sulfur', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'sulfur', amount: 25 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_gen', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'saltpeter', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_weapon', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'saltpeter', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_weapon', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'saltpeter', amount: 25 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_weapon', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'gunpowder', amount: 12 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_weapon', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'gunpowder', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_weapon', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'gunpowder', amount: 25 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_weapon', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'acetone', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'rocket_flare', amount: 3 }],
    requiredSkill: { professionId: 'chemist', skillId: 'flares', level: 1 },
    expGiven: 0.4
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
    outputs: [{ itemId: 'acetone', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'acetone', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'calcium_carbonate', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'calcium_carbonate', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'calcium_carbonate', amount: 25 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'ferrocene', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'ferrocene', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'ferrocene', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'reagents_plastic', level: 3 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'clean_cloth', amount: 15 }],
    requiredSkill: { professionId: 'chemist', skillId: 'cloth_processing', level: 1 },
    expGiven: 0.25
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
    outputs: [{ itemId: 'clean_cloth', amount: 20 }],
    requiredSkill: { professionId: 'chemist', skillId: 'cloth_processing', level: 2 },
    expGiven: 0.15
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
    outputs: [{ itemId: 'durable_cloth', amount: 4 }],
    requiredSkill: { professionId: 'chemist', skillId: 'cloth_processing', level: 2 },
    expGiven: 0.5
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
    outputs: [{ itemId: 'durable_cloth', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'cloth_processing', level: 3 },
    expGiven: 0.25
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
    outputs: [{ itemId: 'tech_oil', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 1 },
    expGiven: 1
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
    outputs: [{ itemId: 'tech_oil', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 2 },
    expGiven: 0.5
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
    outputs: [{ itemId: 'gun_synth_oil', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 3 },
    expGiven: 0.5
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
    outputs: [{ itemId: 'nylon', amount: 5 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 2 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'nylon', amount: 5 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 3 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'rubber', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 1 },
    expGiven: 0.3
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
    outputs: [{ itemId: 'rubber', amount: 10 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 2 },
    expGiven: 0.2
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
    outputs: [{ itemId: 'gasoline_canister', amount: 1 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 1 },
    expGiven: 2
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
    outputs: [{ itemId: 'gasoline_canister', amount: 1 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 2 },
    expGiven: 1
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
    outputs: [{ itemId: 'gas_cutter_canister', amount: 1 }],
    requiredSkill: { professionId: 'chemist', skillId: 'oil_refining', level: 2 },
    expGiven: 2
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
