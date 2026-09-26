import type { Item } from '../types/crafting';

export const baseItems: Record<string, Item> = {
  // === БАЗОВОЕ СЫРЬЁ И КОМПОНЕНТЫ ===
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
  stainless_steel: { id: 'stainless_steel', name: 'Нержавеющая сталь', icon: 'Box', isBase: true },
  alloy_steel: { id: 'alloy_steel', name: 'Легированная сталь', icon: 'Box', isBase: true },
  circuit_board: { id: 'circuit_board', name: 'Электронная схема', icon: 'Cpu', isBase: true },

  // --- Базовые компоненты для Реагентов, Полимеров и Медицины ---
  hand_sanitizer: { id: 'hand_sanitizer', name: 'Санитайзер для рук', icon: 'FlaskConical', isBase: true },
  wood_bark: { id: 'wood_bark', name: 'Древесная кора', icon: 'Box', isBase: true },
  nail_polish_remover: { id: 'nail_polish_remover', name: 'Жидкость для снятия лака', icon: 'FlaskConical', isBase: true },
  dirty_water: { id: 'dirty_water', name: 'Грязная вода', icon: 'Droplet', isBase: true },
  clean_water: { id: 'clean_water', name: 'Чистая вода', icon: 'Droplet', isBase: true },
  chalk: { id: 'chalk', name: 'Мел', icon: 'Box', isBase: true },
  dirty_cloth: { id: 'dirty_cloth', name: 'Грязная ткань', icon: 'Layers', isBase: true },
  clean_cloth: { id: 'clean_cloth', name: 'Чистая ткань', icon: 'Layers', isBase: false },
  dirty_bandage: { id: 'dirty_bandage', name: 'Грязный бинт', icon: 'Layers', isBase: true },
  salt: { id: 'salt', name: 'Соль', icon: 'Sparkles', isBase: true },
  wood: { id: 'wood', name: 'Дерево', icon: 'Box', isBase: true },
  empty_bottle: { id: 'empty_bottle', name: 'Пустая бутылка', icon: 'FlaskConical', isBase: true },
  gelatin_capsule_pack: { id: 'gelatin_capsule_pack', name: 'Пакетик желатиновых капсул', icon: 'Box', isBase: false },
  sewing_kit: { id: 'sewing_kit', name: 'Швейный набор', icon: 'Scissors', isBase: false },
  field_surgical_kit: { id: 'field_surgical_kit', name: 'Полевой хирургический набор', icon: 'Box', isBase: true },
  chem_stabilizer: { id: 'chem_stabilizer', name: 'Химический стабилизатор', icon: 'FlaskConical', isBase: true },
  precision_parts: { id: 'precision_parts', name: 'Высокоточные детали', icon: 'Cpu', isBase: true },
  duct_tape: { id: 'duct_tape', name: 'Изолента', icon: 'Box', isBase: true },
  sulfur_ore: { id: 'sulfur_ore', name: 'Серная руда', icon: 'Box', isBase: true },
  methanol: { id: 'methanol', name: 'Метанол', icon: 'FlaskConical', isBase: true },
  synthetic_junk: { id: 'synthetic_junk', name: 'Синтетический мусор', icon: 'Box', isBase: true },
  wires: { id: 'wires', name: 'Провода', icon: 'Cpu', isBase: true },
  glass: { id: 'glass', name: 'Стекло', icon: 'Box', isBase: true },

  // --- Базовые компоненты для Кожи ---
  raw_hide: { id: 'raw_hide', name: 'Сырая шкура', icon: 'Layers', isBase: true },
  animal_bones: { id: 'animal_bones', name: 'Кости животного', icon: 'Box', isBase: true },
};
