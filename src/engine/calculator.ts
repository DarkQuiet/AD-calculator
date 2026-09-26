import type {
  Recipe,
  Item,
  TreeNode,
  CalculationResult,
  UserCategoryTiers,
  UserSkillLevels,
  CraftTier,
  ProfessionId
} from '../types/crafting';

export class CraftingEngine {
  private recipes: Recipe[];
  private items: Record<string, Item>;

  constructor(recipes: Recipe[], items: Record<string, Item>) {
    this.recipes = recipes;
    this.items = items;
  }

  public calculate(
    targetRecipeId: string,
    targetAmount: number, // Желаемое КОНЕЧНОЕ количество предметов (например, 1000 шт)
    userCategoryTiers: UserCategoryTiers,
    userSkillLevels: UserSkillLevels = {},
    customComponentTiers: Record<string, CraftTier> = {}
  ): CalculationResult | null {
    const rootRecipe = this.recipes.find(r => r.id === targetRecipeId);
    if (!rootRecipe) return null;

    const baseResources: Record<string, { item: Item; amount: number }> = {};
    const durabilityCostByBench: Record<string, number> = {};
    let totalTimeSec = 0;

    const expByProfession: Record<ProfessionId, number> = {
      technician: 0,
      pharmacist: 0,
      chemist: 0,
      gunsmith: 0,
      armorer: 0,
      metallurgist: 0,
      tailor: 0,
    };

    const buildTree = (recipe: Recipe, requiredAmount: number): TreeNode => {
      const outputAmount = recipe.outputs[0]?.amount || 1;
      // Находим, сколько раз нужно запустить крафт для получения requiredAmount
      const craftsNeeded = Math.ceil(requiredAmount / outputAmount);

      // Учет износа и времени
      durabilityCostByBench[recipe.workstationId] =
        (durabilityCostByBench[recipe.workstationId] || 0) + recipe.durabilityCost * craftsNeeded;
      totalTimeSec += recipe.craftTimeSec * craftsNeeded;

      // Учет получаемого опыта по профессии
      if (recipe.requiredSkill && recipe.expGiven) {
        const profId = recipe.requiredSkill.professionId;
        expByProfession[profId] = (expByProfession[profId] || 0) + recipe.expGiven * craftsNeeded;
      }

      const treeInputs = recipe.inputs.map(inp => {
        const item = this.items[inp.itemId] || { id: inp.itemId, name: inp.itemId, isBase: true };
        const totalInputAmount = inp.amount * craftsNeeded;

        let subNode: TreeNode | undefined;
        let availableTiers: CraftTier[] | undefined;

        if (!item.isBase) {
          const allItemRecipes = this.recipes.filter(r => r.outputs.some(o => o.itemId === item.id));

          // Находим доступные тиры рецептов с учетом уровня верстака и навыка
          const unlockedRecipes = allItemRecipes.filter(r => {
            const catTier = userCategoryTiers[r.category] ?? 1;
            if (r.tier > catTier) return false;
            if (r.requiredSkill) {
              const currentSkillLevel = userSkillLevels[r.requiredSkill.skillId] ?? 0;
              if (currentSkillLevel < r.requiredSkill.level) return false;
            }
            return true;
          });

          const candidates = unlockedRecipes.length > 0 ? unlockedRecipes : allItemRecipes;

          availableTiers = Array.from(new Set(candidates.map(r => r.tier))).sort((a, b) => a - b) as CraftTier[];

          if (candidates.length > 0) {
            const chosenTier = customComponentTiers[item.id] ??
              (userCategoryTiers[candidates[0].category] ?? 1);

            const selectedRecipe = candidates.find(r => r.tier === chosenTier) || candidates[0];
            subNode = buildTree(selectedRecipe, totalInputAmount);
          }
        } else {
          if (!baseResources[item.id]) {
            baseResources[item.id] = { item, amount: 0 };
          }
          baseResources[item.id].amount += totalInputAmount;
        }

        return {
          item,
          amount: totalInputAmount,
          subNode,
          availableTiers
        };
      });

      return {
        recipeId: recipe.id,
        recipeName: recipe.name,
        workstationId: recipe.workstationId,
        category: recipe.category,
        tier: recipe.tier,
        timeSec: recipe.craftTimeSec * craftsNeeded,
        durabilityCost: recipe.durabilityCost * craftsNeeded,
        craftedAmount: requiredAmount,
        requiredSkill: recipe.requiredSkill,
        expGiven: recipe.expGiven,
        inputs: treeInputs
      };
    };

    // Передаем ровно targetAmount (желаемое число штук)
    const tree = buildTree(rootRecipe, targetAmount);

    // Округление опыта до 2 знаков после запятой
    (Object.keys(expByProfession) as ProfessionId[]).forEach(prof => {
      expByProfession[prof] = Math.round(expByProfession[prof] * 100) / 100;
    });

    return {
      targetRecipe: rootRecipe,
      targetAmount,
      tree,
      baseResources,
      durabilityCostByBench: durabilityCostByBench as any,
      totalTimeSec,
      expByProfession
    };
  }
}
