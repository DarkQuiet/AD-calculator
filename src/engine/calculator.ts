import type { Recipe, Item, TreeNode, CalculationResult, UserCategoryTiers, CraftTier } from '../types/crafting';

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
    customComponentTiers: Record<string, CraftTier> = {}
  ): CalculationResult | null {
    const rootRecipe = this.recipes.find(r => r.id === targetRecipeId);
    if (!rootRecipe) return null;

    const baseResources: Record<string, { item: Item; amount: number }> = {};
    const durabilityCostByBench: Record<string, number> = {};
    let totalTimeSec = 0;

    const buildTree = (recipe: Recipe, requiredAmount: number): TreeNode => {
      const outputAmount = recipe.outputs[0]?.amount || 1;
      // Находим, сколько раз нужно запустить крафт для получения requiredAmount
      const craftsNeeded = Math.ceil(requiredAmount / outputAmount);

      // Учет износа и времени
      durabilityCostByBench[recipe.workstationId] =
        (durabilityCostByBench[recipe.workstationId] || 0) + recipe.durabilityCost * craftsNeeded;
      totalTimeSec += recipe.craftTimeSec * craftsNeeded;

      const treeInputs = recipe.inputs.map(inp => {
        const item = this.items[inp.itemId] || { id: inp.itemId, name: inp.itemId, isBase: true };
        const totalInputAmount = inp.amount * craftsNeeded;

        let subNode: TreeNode | undefined;
        let availableTiers: CraftTier[] | undefined;

        if (!item.isBase) {
          const allItemRecipes = this.recipes.filter(r => r.outputs.some(o => o.itemId === item.id));
          availableTiers = Array.from(new Set(allItemRecipes.map(r => r.tier))).sort((a, b) => a - b) as CraftTier[];

          if (allItemRecipes.length > 0) {
            const chosenTier = customComponentTiers[item.id] ?? 
              (userCategoryTiers[allItemRecipes[0].category] ?? 1);

            const selectedRecipe = allItemRecipes.find(r => r.tier === chosenTier) || allItemRecipes[0];
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
        inputs: treeInputs
      };
    };

    // Передаем ровно targetAmount (желаемое число штук)
    const tree = buildTree(rootRecipe, targetAmount);

    return {
      targetRecipe: rootRecipe,
      targetAmount,
      tree,
      baseResources,
      durabilityCostByBench: durabilityCostByBench as any,
      totalTimeSec
    };
  }
}