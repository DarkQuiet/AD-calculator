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
    skills: []
  },
  {
    id: 'armorer',
    name: 'Бронник',
    icon: 'Shield',
    description: 'Изготовление бронежилетов и защитных пластин.',
    skills: []
  },
  {
    id: 'metallurgist',
    name: 'Металлург',
    icon: 'Anvil',
    description: 'Выплавка металлов и сплавов.',
    skills: []
  }
];
