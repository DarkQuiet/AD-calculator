export type WorkstationId = 'weapons_bench' | 'tech_bench' | 'chem_bench' | 'sewing_bench';

export type WeaponCategory = 'Оружейные обвесы' | 'Оружие' | 'Патроны';
export type TechCategory = 'Электроника' | 'Металлолом';
export type ChemCategory = 'Медицина' | 'Реагенты и Нефтехимия' | 'Полимеры';
export type SewingCategory = 'Рюкзаки' | 'Кожа' | 'Броня';

export type CraftCategory = WeaponCategory | TechCategory | ChemCategory | SewingCategory;
export type CraftTier = 1 | 2 | 3 | 4;

export type UserCategoryTiers = Record<CraftCategory, CraftTier>;

export type ProfessionId =
  | 'technician'
  | 'pharmacist'
  | 'chemist'
  | 'gunsmith'
  | 'armorer'
  | 'metallurgist';

export interface ProfessionSkill {
  id: string;
  name: string;
  maxLevel: number;
}

export interface Profession {
  id: ProfessionId;
  name: string;
  icon: string;
  skills: ProfessionSkill[];
  description?: string;
}

export interface SkillRequirement {
  professionId: ProfessionId;
  skillId: string;
  level: number;
}

export type UserSkillLevels = Record<string, number>;

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
    requiredSkill?: SkillRequirement;
    expGiven?: number;
}

export interface TreeNode {
    recipeId: string;
    recipeName: string;
    workstationId: WorkstationId;
    category: CraftCategory;
    tier: CraftTier;
    timeSec: number;
    durabilityCost: number;
    craftedAmount: number;
    requiredSkill?: SkillRequirement;
    expGiven?: number;
    inputs: Array<{
        item: Item;
        amount: number;
        subNode?: TreeNode;
        availableTiers?: CraftTier[];
    }>;
}

export interface CalculationResult {
    targetRecipe: Recipe;
    targetAmount: number;
    totalTimeSec: number;
    durabilityCostByBench: Record<WorkstationId, number>;
    baseResources: Record<string, { item: Item; amount: number }>;
    tree: TreeNode;
    expByProfession: Record<ProfessionId, number>;
}

export const DURABILITY_LEVELS = [100, 150, 200, 250] as const;
export type DurabilityLevel = (typeof DURABILITY_LEVELS)[number];

export const HELIX_PER_REPAIR_STEP = 20;
export const REPAIR_PERCENT_STEP = 0.5;
