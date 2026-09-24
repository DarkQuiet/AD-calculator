import type { Recipe, Item, CalculationResult, TreeNode, WorkstationId, UserCategoryTiers } from '../types/crafting';

export class CraftingEngine {
  private recipesMap: Map<string, Recipe> = new Map();
  private itemsMap: Map<string, Item> = new Map();

  constructor(recipes: Recipe[], items: Record<string, Item>) {
    recipes.forEach(r => this.recipesMap.set(r.id, r));
    Object.values(items).forEach(i => this.itemsMap.set(i.id, i));
  }

  public calculate(
    targetRecipeId: string, 
    targetAmount: number = 1,
    categoryTiers: UserCategoryTiers
  ): CalculationResult | null {
    const targetRecipe = this.recipesMap.get(targetRecipeId);
    if (!targetRecipe) return null;

    let totalTimeSec = 0;
    const durabilityCostByBench: Record<WorkstationId, number> = {
      weapons_bench: 0,
      tech_bench: 0,
      chem_bench: 0,
      sewing_bench: 0
    };
    const baseResources: Record<string, { item: Item; amount: number }> = {};

    // Выбор лучшего рецепта с учетом прокачки КАТЕГОРИИ
    const findBestAvailableRecipe = (itemId: string): Recipe | null => {
      const candidates = Array.from(this.recipesMap.values()).filter(r => {
        const producesItem = r.outputs.some(out => out.itemId === itemId);
        // Проверка: уровень рецепта должен быть <= уровня прокачки ЭТОЙ категории
        const isTierUnlocked = r.tier <= categoryTiers[r.category];
        return producesItem && isTierUnlocked;
      });

      if (candidates.length === 0) return null;

      // Сортируем: выбираем максимальный доступный тир рецепта
      candidates.sort((a, b) => b.tier - a.tier);
      return candidates[0];
    };

    const buildTreeNode = (recipe: Recipe, amountNeeded: number): TreeNode => {
      const outputAmountPerCraft = recipe.outputs[0]?.amount || 1;
      const craftRuns = Math.ceil(amountNeeded / outputAmountPerCraft);

      const nodeTime = recipe.craftTimeSec * craftRuns;
      const nodeDurability = recipe.durabilityCost * craftRuns;

      totalTimeSec += nodeTime;
      durabilityCostByBench[recipe.workstationId] += nodeDurability;

      const inputs = recipe.inputs.map(input => {
        const item = this.itemsMap.get(input.itemId)!;
        const totalInputNeeded = input.amount * craftRuns;

        if (item.isBase) {
          if (!baseResources[item.id]) {
            baseResources[item.id] = { item, amount: 0 };
          }
          baseResources[item.id].amount += totalInputNeeded;

          return { item, amount: totalInputNeeded };
        } else {
          const subRecipe = findBestAvailableRecipe(item.id);

          if (subRecipe) {
            const subNode = buildTreeNode(subRecipe, totalInputNeeded);
            return { item, amount: totalInputNeeded, subNode };
          } else {
            if (!baseResources[item.id]) {
              baseResources[item.id] = { item, amount: 0 };
            }
            baseResources[item.id].amount += totalInputNeeded;
            return { item, amount: totalInputNeeded };
          }
        }
      });

      return {
        id: `${recipe.id}-${Math.random().toString(36).substring(2, 7)}`,
        recipeId: recipe.id,
        recipeName: recipe.name,
        workstationId: recipe.workstationId,
        category: recipe.category,
        tier: recipe.tier,
        craftedAmount: craftRuns * outputAmountPerCraft,
        timeSec: nodeTime,
        durabilityCost: nodeDurability,
        inputs
      };
    };

    const tree = buildTreeNode(targetRecipe, targetAmount);

    return {
      targetRecipe,
      targetAmount,
      totalTimeSec,
      durabilityCostByBench,
      baseResources,
      tree
    };
  }
}