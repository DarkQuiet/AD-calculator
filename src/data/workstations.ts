import type { Workstation } from '../types/crafting';

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
