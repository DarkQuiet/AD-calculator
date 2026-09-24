import React, { useState } from 'react';
import type { Workstation, Recipe, DurabilityLevel } from '../types/crafting';
import { DURABILITY_LEVELS } from '../types/crafting';
import { calculateHelixCost } from '../utils/repairCalculator';

interface Props {
  workstation: Workstation;
  recipes: Recipe[];
}

export const WorkstationCard: React.FC<Props> = ({ workstation, recipes }) => {
  // Состояние выбранного уровня прочности стола (по умолчанию 100)
  const [selectedMaxDurability, setSelectedMaxDurability] = useState<DurabilityLevel>(100);

  return (
    <div className="bg-slate-800 text-white p-5 rounded-xl border border-slate-700 shadow-lg mb-6">
      {/* Шапка верстака */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-slate-700">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>{workstation.name}</span>
          </h2>
          <p className="text-sm text-slate-400">{workstation.description}</p>
        </div>

        {/* Переключатель прокачки прочности стола */}
        <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-700">
          <span className="text-xs font-semibold text-slate-300">Прочность стола:</span>
          <div className="flex gap-1">
            {DURABILITY_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedMaxDurability(level)}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                  selectedMaxDurability === level
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {level} HP
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Список рецептов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recipes.map((recipe) => {
          const helixCost = calculateHelixCost(recipe.durabilityCost, selectedMaxDurability);

          return (
            <div
              key={recipe.id}
              className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-sm">{recipe.name}</div>
                <div className="text-xs text-slate-400">Тир {recipe.tier} • {recipe.craftTimeSec} сек.</div>
              </div>

              {/* Затраты прочности и стоимость в хеликсах */}
              <div className="text-right">
                <div className="text-xs text-rose-400 font-medium">
                  -{recipe.durabilityCost} HP
                </div>
                <div className="text-xs text-amber-400 font-bold flex items-center justify-end gap-1">
                  <span>🛠 {helixCost} Хеликсов</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};