import type { Profession } from '../types/crafting';

export const PROFESSIONS: Profession[] = [
  {
    id: 'technician',
    name: 'Техник',
    icon: 'Wrench',
    description: 'Ремонт, сборка устройств и работа с электроникой.',
    skills: [
      { id: 'tech_basic', name: 'Базовые навыки', maxLevel: 2 },
      { id: 'tech_repair', name: 'Ремонт', maxLevel: 2 },
      { id: 'tech_devices', name: 'Устройства', maxLevel: 2 }
    ]
  },
  {
    id: 'pharmacist',
    name: 'Фармацевт',
    icon: 'Cross',
    description: 'Изготовление бинтов, медикаментов и таблеток.',
    skills: [
      { id: 'bandages', name: 'Перевязочные материалы', maxLevel: 3 },
      { id: 'basic_meds', name: 'Базовые Медикаменты', maxLevel: 3 },
      { id: 'pills', name: 'Таблетки', maxLevel: 3 }
    ]
  },
  {
    id: 'chemist',
    name: 'Химик',
    icon: 'FlaskConical',
    description: 'Синтез реагентов, переработка нефти и полимеров.',
    skills: [
      { id: 'reagents_med', name: 'Реагенты: медицина', maxLevel: 3 },
      { id: 'reagents_gen', name: 'Реагенты: общие', maxLevel: 3 },
      { id: 'reagents_weapon', name: 'Реагенты: оружие', maxLevel: 3 },
      { id: 'reagents_plastic', name: 'Реагенты: пластик', maxLevel: 3 },
      { id: 'cloth_processing', name: 'Обработка ткани', maxLevel: 3 },
      { id: 'flares', name: 'Сигнальные ракеты', maxLevel: 1 },
      { id: 'oil_refining', name: 'Переработка нефти', maxLevel: 3 },
      { id: 'polymers', name: 'Полимеры', maxLevel: 4 },
      { id: 'glass', name: 'Стекло', maxLevel: 3 }
    ]
  },
  {
    id: 'gunsmith',
    name: 'Оружейник',
    icon: 'Crosshair',
    description: 'Создание огнестрельного оружия и обвесов.',
    skills: [
      { id: 'gun_fullsize', name: 'Полноразмерное оружие', maxLevel: 2 },
      { id: 'gun_compact', name: 'Компактное оружие', maxLevel: 4 },
      { id: 'gun_subcompact', name: 'Субкомпактное оружие', maxLevel: 4 },
      { id: 'gun_small', name: 'Малогабаритное оружие', maxLevel: 1 },
      { id: 'gun_manual_delta', name: 'Мануал Дельта', maxLevel: 3 },
      { id: 'gun_manual_omega', name: 'Мануал Омега', maxLevel: 3 },
      { id: 'gun_melee', name: 'Холодное оружие', maxLevel: 4 },
      { id: 'gun_parts', name: 'Оружейные детали', maxLevel: 3 },
      { id: 'gun_cleaning', name: 'Набор чистки', maxLevel: 3 },
      { id: 'gun_tools', name: 'Инструменты', maxLevel: 2 },
      { id: 'gun_ammo', name: 'Патроны', maxLevel: 3 },
      { id: 'gun_upgrade', name: 'Улучшение оружия', maxLevel: 4 },
      { id: 'gun_muzzle_brake', name: 'Модуль: Дульный тормоз', maxLevel: 1 },
      { id: 'gun_suppressor', name: 'Модуль: Глушитель', maxLevel: 1 },
      { id: 'gun_scope', name: 'Модуль: Прицел', maxLevel: 1 }
    ]
  },
  {
    id: 'armorer',
    name: 'Бронник',
    icon: 'Shield',
    description: 'Изготовление бронежилетов и защитных пластин.',
    skills: [
      { id: 'leather_processing', name: 'Обработка кожи', maxLevel: 2 },
      { id: 'backpacks', name: 'Рюкзаки', maxLevel: 4 },
      { id: 'armor_plates', name: 'Бронепластины', maxLevel: 3 },
      { id: 'armor_vests', name: 'Создание бронежилетов', maxLevel: 1 },
      { id: 'armor_reinforcement', name: 'Армирование бронежилетов', maxLevel: 3 }
    ]
  },
  {
    id: 'metallurgist',
    name: 'Металлург',
    icon: 'Anvil',
    description: 'Выплавка металлов и сплавов.',
    skills: [
      { id: 'steel_smelting', name: 'Плавка стали', maxLevel: 3 },
      { id: 'scrap_recycling', name: 'Переработка лома', maxLevel: 3 }
    ]
  }
];
