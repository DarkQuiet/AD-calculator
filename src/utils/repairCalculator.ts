import { HELIX_PER_REPAIR_STEP, REPAIR_PERCENT_STEP } from '../types/crafting';

/**
 * Рассчитывает стоимость ремонта в хеликсах на основе потраченной прочности и текущей макс. прочности стола.
 * @param durabilityCost - Потраченное количество прочности
 * @param maxDurability - Выбранная максимальная прочность стола (100, 150, 200, 250)
 */
export function calculateHelixCost(durabilityCost: number, maxDurability: number): number {
    if (!maxDurability || maxDurability <= 0) return 0;

    // Стоимость полного ремонта (100% прочности)
    const fullRepairCost = HELIX_PER_REPAIR_STEP / REPAIR_PERCENT_STEP; // 20 / 0.5 = 40 хеликсов

    // Пропорциональная стоимость
    const cost = (durabilityCost / maxDurability) * fullRepairCost;

    // Округляем до 2 знаков после запятой (или до целого Math.round(cost), если хеликсы целые)
    return Number(cost.toFixed(2));
}