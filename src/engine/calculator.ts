import type {
  Recipe,
  Item,
  TreeNode,
  CraftedTreeNode,
  CalculationResult,
  UserCategoryTiers,
  UserSkillLevels,
  CraftTier,
  ProfessionId,
  WorkstationId
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
    customComponentTiers: Record<string, CraftTier> = {},
    showAllRecipes: boolean = false,
    excludedCraftedItemIds: Record<string, boolean> = {}
  ): CalculationResult | null {
    const rootRecipe = this.recipes.find(r => r.id === targetRecipeId);
    if (!rootRecipe) return null;

    const baseResources: Record<string, { item: Item; amount: number }> = {};
    const craftedResources: Record<string, { item: Item; amount: number }> = {};
    const durabilityCostByBench: Record<string, number> = {};
    let totalTimeSec = 0;

    const expByProfession: Record<ProfessionId, number> = {
      technician: 0,
      pharmacist: 0,
      chemist: 0,
      gunsmith: 0,
      armorer: 0,
      metallurgist: 0,
    };

    // Сначала проходим всё дерево без исключений, чтобы собрать полный список требуемых крафтовых предметов и построить дерево крафтовых предметов
    const collectAllCraftedItems = (recipe: Recipe, requiredAmount: number): CraftedTreeNode[] => {
      const outputAmount = recipe.outputs[0]?.amount || 1;
      const craftsNeeded = Math.ceil(requiredAmount / outputAmount);
      const craftedNodes: CraftedTreeNode[] = [];

      recipe.inputs.forEach(inp => {
        const item = this.items[inp.itemId] || { id: inp.itemId, name: inp.itemId, isBase: true };
        const totalInputAmount = inp.amount * craftsNeeded;

        if (!item.isBase) {
          if (!craftedResources[item.id]) {
            craftedResources[item.id] = { item, amount: 0 };
          }
          craftedResources[item.id].amount += totalInputAmount;

          const allItemRecipes = this.recipes.filter(r => r.outputs.some(o => o.itemId === item.id));
          const unlockedRecipes = showAllRecipes
            ? allItemRecipes
            : allItemRecipes.filter(r => {
                const catTier = userCategoryTiers[r.category] ?? 1;
                if (r.tier > catTier) return false;
                if (r.requiredSkill) {
                  const currentSkillLevel = userSkillLevels[r.requiredSkill.skillId] ?? 0;
                  if (currentSkillLevel < r.requiredSkill.level) return false;
                }
                return true;
              });

          const candidates = unlockedRecipes.length > 0 ? unlockedRecipes : allItemRecipes;
          candidates.sort((a, b) => a.tier - b.tier);

          let childCraftedNodes: CraftedTreeNode[] = [];
          if (candidates.length > 0) {
            let defaultTier: CraftTier;
            if (showAllRecipes) {
              defaultTier = Math.max(...candidates.map(r => r.tier)) as CraftTier;
            } else {
              defaultTier = userCategoryTiers[candidates[0].category] ?? 1;
            }
            const chosenTier = customComponentTiers[item.id] ?? defaultTier;

            let selectedRecipe = candidates.find(r => r.tier === chosenTier);
            if (!selectedRecipe) {
              const lowerOrEqual = candidates.filter(r => r.tier <= chosenTier);
              selectedRecipe = lowerOrEqual.length > 0
                ? lowerOrEqual[lowerOrEqual.length - 1]
                : candidates[candidates.length - 1];
            }

            childCraftedNodes = collectAllCraftedItems(selectedRecipe, totalInputAmount);
          }

          craftedNodes.push({
            item,
            amount: totalInputAmount,
            children: childCraftedNodes
          });
        }
      });

      return craftedNodes;
    };

    const craftedTree = collectAllCraftedItems(rootRecipe, targetAmount);

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
        if (expByProfession[profId] !== undefined) {
          expByProfession[profId] += recipe.expGiven * craftsNeeded;
        }
      }

      const treeInputs = recipe.inputs.map(inp => {
        const item = this.items[inp.itemId] || { id: inp.itemId, name: inp.itemId, isBase: true };
        const totalInputAmount = inp.amount * craftsNeeded;

        let subNode: TreeNode | undefined;
        let availableTiers: CraftTier[] | undefined;

        if (!item.isBase) {
          const allItemRecipes = this.recipes.filter(r => r.outputs.some(o => o.itemId === item.id));

          // Находим доступные тиры рецептов с учетом уровня верстака и навыка (или всех, если showAllRecipes)
          const unlockedRecipes = showAllRecipes
            ? allItemRecipes
            : allItemRecipes.filter(r => {
                const catTier = userCategoryTiers[r.category] ?? 1;
                if (r.tier > catTier) return false;
                if (r.requiredSkill) {
                  const currentSkillLevel = userSkillLevels[r.requiredSkill.skillId] ?? 0;
                  if (currentSkillLevel < r.requiredSkill.level) return false;
                }
                return true;
              });

          const candidates = unlockedRecipes.length > 0 ? unlockedRecipes : allItemRecipes;
          candidates.sort((a, b) => a.tier - b.tier);

          // Доступные для выбора тиры
          availableTiers = Array.from(new Set(candidates.map(r => r.tier))) as CraftTier[];

          if (candidates.length > 0) {
            // Если включены все рецепты, дефолтный тир - максимальный доступный
            let defaultTier: CraftTier;
            if (showAllRecipes) {
              defaultTier = Math.max(...candidates.map(r => r.tier)) as CraftTier;
            } else {
              defaultTier = userCategoryTiers[candidates[0].category] ?? 1;
            }

            const chosenTier = customComponentTiers[item.id] ?? defaultTier;

            let selectedRecipe = candidates.find(r => r.tier === chosenTier);
            if (!selectedRecipe) {
              const lowerOrEqual = candidates.filter(r => r.tier <= chosenTier);
              if (lowerOrEqual.length > 0) {
                selectedRecipe = lowerOrEqual[lowerOrEqual.length - 1];
              } else {
                selectedRecipe = candidates[candidates.length - 1];
              }
            }

            // Если крафтовый предмет не исключен пользователем, углубляемся в крафт
            const isExcluded = Boolean(excludedCraftedItemIds[item.id]);
            if (!isExcluded) {
              subNode = buildTree(selectedRecipe, totalInputAmount);
            } else {
              // Если крафтовый предмет исключен, он рассматривается как готовое сырье
              if (!baseResources[item.id]) {
                baseResources[item.id] = { item, amount: 0 };
              }
              baseResources[item.id].amount += totalInputAmount;
            }
          } else {
            // Если рецептов для крафта нет, считаем как базовый ресурс
            if (!baseResources[item.id]) {
              baseResources[item.id] = { item, amount: 0 };
            }
            baseResources[item.id].amount += totalInputAmount;
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
      craftedResources,
      craftedTree,
      durabilityCostByBench: durabilityCostByBench as Record<WorkstationId, number>,
      totalTimeSec,
      expByProfession
    };
  }
}
