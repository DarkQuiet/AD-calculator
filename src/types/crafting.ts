export type WorkstationId = 'weapons_bench' | 'tech_bench' | 'chem_bench' | 'sewing_bench';

export type WeaponCategory = 'Оружейные обвесы' | 'Оружие' | 'Патроны';
export type TechCategory = 'Электроника' | 'Металлолом';
export type ChemCategory = 'Медицина' | 'Реагенты и Нефтехимия' | 'Полимеры';
export type SewingCategory = 'Рюкзаки' | 'Кожа' | 'Броня';

export type CraftCategory = WeaponCategory | TechCategory | ChemCategory | SewingCategory;
export type CraftTier = 1 | 2 | 3 | 4;

// Прокачка уровней теперь привязана прямо к названиям категорий!
export type UserCategoryTiers = Record<CraftCategory, CraftTier>;

export interface Workstation {
    id: WorkstationId;
    name: string;
    icon: string;
    maxDurability: number;
    categories: CraftCategory[];
    description: string;
}

export interface Item {
    id: string;
    name: string;
    icon: string;
    isBase: boolean;
}

export interface Ingredient {
    itemId: string;
    amount: number;
}

export interface Recipe {
    id: string;
    name: string;
    workstationId: WorkstationId;
    category: CraftCategory;
    tier: CraftTier;
    craftTimeSec: number;
    durabilityCost: number;
    inputs: Ingredient[];
    outputs: Ingredient[];
}

export interface TreeNode {
    id: string;
    recipeId: string;
    recipeName: string;
    workstationId: WorkstationId;
    category: CraftCategory;
    tier: CraftTier;
    craftedAmount: number;
    timeSec: number;
    durabilityCost: number;
    inputs: {
        item: Item;
        amount: number;
        subNode?: TreeNode;
    }[];
}

export interface CalculationResult {
    targetRecipe: Recipe;
    targetAmount: number;
    totalTimeSec: number;
    durabilityCostByBench: Record<WorkstationId, number>;
    baseResources: Record<string, { item: Item; amount: number }>;
    tree: TreeNode;
}
// Уровни прокачки прочности верстака
export const DURABILITY_LEVELS = [100, 150, 200, 250] as const;
export type DurabilityLevel = (typeof DURABILITY_LEVELS)[number];

// Базовые константы для ремонта: 20 хеликсов восстанавливают 50% от выбранной максимальной прочности
export const HELIX_PER_REPAIR_STEP = 20;
export const REPAIR_PERCENT_STEP = 0.5; // 50%