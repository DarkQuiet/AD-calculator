import { useState, useMemo, useEffect } from 'react';
import { WORKSTATIONS, RECIPES, ITEMS } from './data/mockData';
import { CraftingEngine } from './engine/calculator';
import type { WorkstationId, CraftTier, CraftCategory, UserCategoryTiers, DurabilityLevel } from './types/crafting';
import { DURABILITY_LEVELS } from './types/crafting';
import { calculateHelixCost } from './utils/repairCalculator';
import { TreeNodeView } from './components/TreeNodeView';
import {
  Hammer, Clock, ShieldAlert, Layers, Cpu,
  FlaskConical, Scissors, Crosshair, Filter, Sliders, Search, Wrench, X
} from 'lucide-react';

const engine = new CraftingEngine(RECIPES, ITEMS);

// Ключи для сохранения в LocalStorage
const STORAGE_KEY_TIERS = 'crafting_category_tiers';
const STORAGE_KEY_DURABILITY = 'crafting_workstation_durability';

// Значения по умолчанию для ПЕРВОГО захода: везде 1 тир
const defaultCategoryTiers: UserCategoryTiers = {
  'Оружейные обвесы': 1,
  'Оружие': 1,
  'Патроны': 1,
  'Электроника': 1,
  'Металлолом': 1,
  'Медицина': 1,
  'Реагенты и Нефтехимия': 1,
  'Полимеры': 1,
  'Рюкзаки': 1,
  'Кожа': 1,
  'Броня': 1,
};

const defaultWorkstationDurability: Record<WorkstationId, DurabilityLevel> = {
  weapons_bench: 100,
  tech_bench: 100,
  chem_bench: 100,
  sewing_bench: 100,
};

export function App() {
  // Инициализация тиров категорий из localStorage
  const [categoryTiers, setCategoryTiers] = useState<UserCategoryTiers>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TIERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Ошибка чтения categoryTiers из localStorage', e);
      }
    }
    return defaultCategoryTiers;
  });

  const [selectedBench, setSelectedBench] = useState<WorkstationId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(RECIPES[0]?.id || '');
  const [craftAmount, setCraftAmount] = useState<number>(1);

  // Инициализация прочности верстаков из localStorage
  const [workstationDurability, setWorkstationDurability] = useState<Record<WorkstationId, DurabilityLevel>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DURABILITY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Ошибка чтения workstationDurability из localStorage', e);
      }
    }
    return defaultWorkstationDurability;
  });

  // Автоматическое сохранение тиров
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TIERS, JSON.stringify(categoryTiers));
  }, [categoryTiers]);

  // Автоматическое сохранение прочности
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DURABILITY, JSON.stringify(workstationDurability));
  }, [workstationDurability]);

  const availableCategories = useMemo(() => {
    if (selectedBench === 'all') {
      return Array.from(new Set(WORKSTATIONS.flatMap(w => w.categories)));
    }
    const bench = WORKSTATIONS.find(w => w.id === selectedBench);
    return bench ? bench.categories : [];
  }, [selectedBench]);

  const handleDurabilityChange = (benchId: WorkstationId, level: DurabilityLevel) => {
    setWorkstationDurability(prev => ({ ...prev, [benchId]: level }));
  };

  // Фильтрация рецептов
  const filteredRecipes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return RECIPES.filter(r => {
      if (selectedBench !== 'all' && r.workstationId !== selectedBench) return false;
      if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
      if (r.tier > (categoryTiers[r.category] ?? 1)) return false;

      if (query) {
        const matchesName = r.name.toLowerCase().includes(query);
        const matchesOutputs = r.outputs.some(out => {
          const item = ITEMS[out.itemId];
          return item && item.name.toLowerCase().includes(query);
        });
        const matchesInputs = r.inputs.some(inp => {
          const item = ITEMS[inp.itemId];
          return item && item.name.toLowerCase().includes(query);
        });

        return matchesName || matchesOutputs || matchesInputs;
      }

      return true;
    });
  }, [selectedBench, selectedCategory, categoryTiers, searchQuery]);

  const calculation = useMemo(() => {
    return engine.calculate(selectedRecipeId, Math.max(1, craftAmount), categoryTiers);
  }, [selectedRecipeId, craftAmount, categoryTiers]);

  // Расчет итоговой стоимости ремонта в Хеликсах
  const totalHelixCost = useMemo(() => {
    if (!calculation) return 0;
    return (Object.keys(calculation.durabilityCostByBench) as WorkstationId[]).reduce((sum, benchId) => {
      const durCost = calculation.durabilityCostByBench[benchId] || 0;
      const maxDur = workstationDurability[benchId] || 100;
      return sum + calculateHelixCost(durCost, maxDur);
    }, 0);
  }, [calculation, workstationDurability]);

  const setCategoryTier = (cat: CraftCategory, tier: CraftTier) => {
    setCategoryTiers(prev => ({ ...prev, [cat]: tier }));
  };

  const getBenchIcon = (id: WorkstationId) => {
    switch (id) {
      case 'weapons_bench': return <Crosshair className="w-4 h-4 text-orange-400" />;
      case 'tech_bench': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'chem_bench': return <FlaskConical className="w-4 h-4 text-emerald-400" />;
      case 'sewing_bench': return <Scissors className="w-4 h-4 text-amber-400" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins === 0 ? `${secs}s` : `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-[#0c0d0f] text-zinc-200 font-sans p-4 md:p-8 bg-[radial-gradient(#1a1c23_1px,transparent_1px)] [background-size:16px_16px]">

      {/* ВЕРХНЯЯ ПАНЕЛЬ / ШАПКА */}
      <header className="max-w-7xl mx-auto mb-6 flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-950/40 border border-orange-600/50 text-orange-500 rounded">
            <Hammer className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider uppercase text-zinc-100 font-mono">
              Производство компонентов
            </h1>
            <p className="text-xs text-zinc-500">Система расчёта крафта и износа верстаков</p>
          </div>
        </div>

        {/* Индикатор в стиле "РЕСУРС СТОЛА" */}
        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">Суммарный ремонт</span>
            <span className="text-orange-500 font-bold text-sm">🛠 {totalHelixCost} Хеликсов</span>
          </div>
          <div className="w-7 h-7 bg-orange-600 hover:bg-orange-500 text-black font-bold flex items-center justify-center rounded-xs cursor-pointer transition">
            <X className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* ПАНЕЛЬ НАСТРОЙКИ ВЕРСТАКОВ И УРОВНЕЙ (НАСТРОЙКИ) */}
      <section className="max-w-7xl mx-auto mb-6 bg-[#121418]/90 border border-zinc-800 rounded p-4 shadow-2xl backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500 font-mono">
            <Sliders className="w-4 h-4" />
            <span>Параметры и прокачка верстаков</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {WORKSTATIONS.map(bench => {
            const currentDur = workstationDurability[bench.id];

            return (
              <div key={bench.id} className="p-3 bg-[#0a0b0d] border border-zinc-800/90 rounded space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                  <div className="flex items-center gap-2 text-xs text-zinc-200 font-bold uppercase tracking-wide">
                    {getBenchIcon(bench.id)}
                    <span>{bench.name}</span>
                  </div>
                  <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 font-mono font-bold">
                    {currentDur} HP
                  </span>
                </div>

                {/* Выбор макс. прочности верстака */}
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Макс. прочность:</span>
                  <div className="grid grid-cols-4 gap-1">
                    {DURABILITY_LEVELS.map(level => (
                      <button
                        key={level}
                        onClick={() => handleDurabilityChange(bench.id, level)}
                        className={`py-1 text-[10px] font-mono transition uppercase rounded-xs ${currentDur === level
                          ? 'bg-orange-600 text-black font-bold shadow'
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Выбор тира по категориям */}
                <div className="space-y-2 pt-1 border-t border-zinc-900">
                  {bench.categories.map(cat => (
                    <div key={cat} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                        <span className="truncate uppercase">{cat}</span>
                        <span className="text-orange-400 font-bold">T{categoryTiers[cat] ?? 1}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {([1, 2, 3, 4] as CraftTier[]).map(t => (
                          <button
                            key={t}
                            onClick={() => setCategoryTier(cat, t)}
                            className={`py-0.5 text-[10px] font-mono transition uppercase ${(categoryTiers[cat] ?? 1) === t
                              ? 'bg-orange-600 text-black font-bold'
                              : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 border border-zinc-800/60'
                              }`}
                          >
                            T{t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ЛЕВАЯ КОЛОНКА: ФИЛЬТРЫ И СПИСОК РЕЦЕПТОВ */}
        <section className="lg:col-span-5 space-y-4">
          <div className="bg-[#121418]/90 border border-zinc-800 rounded p-4 space-y-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500 font-mono border-b border-zinc-800 pb-2">
              <Filter className="w-4 h-4" />
              <span>Выбор категории и рецепта</span>
            </div>

            {/* ПОИСК */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ПОИСК..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-zinc-800 rounded-xs pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500/80 font-mono uppercase tracking-wider transition"
              />
            </div>

            {/* ВЕРСТАКИ */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Верстак</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => { setSelectedBench('all'); setSelectedCategory('all'); }}
                  className={`px-2.5 py-1.5 text-[11px] font-mono uppercase text-left transition border ${selectedBench === 'all'
                    ? 'bg-orange-600/20 border-orange-500 text-orange-400 font-bold'
                    : 'bg-[#0a0b0d] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                >
                  Все верстаки
                </button>
                {WORKSTATIONS.map(w => (
                  <button
                    key={w.id}
                    onClick={() => { setSelectedBench(w.id); setSelectedCategory('all'); }}
                    className={`px-2 py-1.5 text-[11px] font-mono uppercase text-left flex items-center gap-2 transition border ${selectedBench === w.id
                      ? 'bg-orange-600/20 border-orange-500 text-orange-400 font-bold'
                      : 'bg-[#0a0b0d] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                  >
                    {getBenchIcon(w.id)}
                    <span className="truncate">{w.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* КАТЕГОРИИ */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Категория</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full bg-[#0a0b0d] border border-zinc-800 rounded-xs px-2.5 py-1.5 text-xs text-zinc-300 font-mono uppercase focus:outline-none focus:border-orange-500"
              >
                <option value="all">ВСЕ КАТЕГОРИИ</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* СПИСОК РЕЦЕПТОВ */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                  Доступно рецептов
                </label>
                <span className="text-[10px] font-mono text-orange-500 font-bold">{filteredRecipes.length}</span>
              </div>
              <div className="max-h-56 overflow-y-auto space-y-1 pr-1 border border-zinc-800/80 rounded-[#0a0b0d] p-1.5 bg-[#0a0b0d]">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <button
                      key={recipe.id}
                      onClick={() => setSelectedRecipeId(recipe.id)}
                      className={`w-full p-2 text-left flex items-center justify-between transition border ${selectedRecipeId === recipe.id
                        ? 'bg-orange-600/20 border-orange-500 text-orange-300 font-bold'
                        : 'bg-[#121418] border-zinc-800/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        {getBenchIcon(recipe.workstationId)}
                        <span className="text-xs font-mono uppercase">{recipe.name}</span>
                      </div>
                      <span className="text-[9px] font-mono bg-orange-950/60 text-orange-400 border border-orange-600/40 px-1 py-0.2">
                        T{recipe.tier}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-600 font-mono uppercase">
                    Рецепты не найдены
                  </div>
                )}
              </div>
            </div>

            {/* КОЛИЧЕСТВО */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Количество</label>
              <input
                type="number"
                min={1}
                value={craftAmount}
                onChange={(e) => setCraftAmount(parseInt(e.target.value) || 1)}
                className="w-full bg-[#0a0b0d] border border-zinc-800 rounded-xs px-3 py-1.5 text-sm text-zinc-100 font-mono focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </section>

        {/* ПРАВАЯ КОЛОНКА: СТАТИСТИКА И ДЕРЕВО КРАФТА */}
        <section className="lg:col-span-7 space-y-4">
          {calculation && (
            <>
              {/* СВОДКА (Время, Износ, Хеликсы) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#121418]/90 border border-zinc-800 p-3 flex items-center gap-3">
                  <div className="p-2 bg-blue-950/30 border border-blue-600/40 text-blue-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono block">Время крафта</span>
                    <p className="text-base font-bold text-zinc-100 font-mono">
                      {formatTime(calculation.totalTimeSec)}
                    </p>
                  </div>
                </div>

                <div className="bg-[#121418]/90 border border-zinc-800 p-3 flex items-center gap-3">
                  <div className="p-2 bg-red-950/30 border border-red-600/40 text-red-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono block">Суммарный износ</span>
                    <p className="text-base font-bold text-red-400 font-mono">
                      -{Object.values(calculation.durabilityCostByBench).reduce((a, b) => a + b, 0)} HP
                    </p>
                  </div>
                </div>

                <div className="bg-[#121418]/90 border border-zinc-800 p-3 flex items-center gap-3">
                  <div className="p-2 bg-orange-950/30 border border-orange-600/40 text-orange-400">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono block">Стоимость ремонта</span>
                    <p className="text-base font-bold text-orange-400 font-mono">
                      🛠 {totalHelixCost}
                    </p>
                  </div>
                </div>
              </div>

              {/* ИЗНОС ВЕРСТАКОВ */}
              <div className="bg-[#121418]/90 border border-zinc-800 rounded p-4 space-y-3 shadow-xl backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Layers className="w-4 h-4 text-orange-500" />
                  Износ верстаков и стоимость восстановления
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {WORKSTATIONS.map(bench => {
                    const cost = calculation.durabilityCostByBench[bench.id] || 0;
                    const maxDur = workstationDurability[bench.id] || 100;
                    const pct = Math.min(100, (cost / maxDur) * 100);
                    const helixCost = calculateHelixCost(cost, maxDur);

                    return (
                      <div key={bench.id} className="p-2.5 bg-[#0a0b0d] border border-zinc-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-1.5 text-zinc-300 uppercase">
                            {getBenchIcon(bench.id)}
                            <span>{bench.name}</span>
                          </div>
                          <span className="text-zinc-500 text-[11px]">
                            -{cost} / {maxDur} HP
                          </span>
                        </div>

                        {/* Полоса износа в стиле игры */}
                        <div className="w-full bg-zinc-900 h-1.5 rounded-none overflow-hidden border border-zinc-800">
                          <div
                            className="bg-orange-600 h-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center text-[10px] font-mono pt-1 border-t border-zinc-900">
                          <span className="text-zinc-500 uppercase">Восстановление:</span>
                          <span className="font-bold text-orange-400">
                            🛠 {helixCost} Хеликсов
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ИТОГО СЫРЬЯ */}
              <div className="bg-[#121418]/90 border border-zinc-800 rounded p-4 space-y-3 shadow-xl backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
                  Итого требуемого сырья
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(calculation.baseResources).map(({ item, amount }) => (
                    <div key={item.id} className="p-2 bg-[#0a0b0d] border border-zinc-800/80 flex items-center justify-between">
                      <span className="text-xs text-zinc-300 font-mono uppercase truncate">{item.name}</span>
                      <span className="text-xs font-mono font-bold text-orange-400 ml-2">x{amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ГРАФ КРАФТА */}
              <div className="bg-[#121418]/90 border border-zinc-800 rounded p-4 space-y-3 shadow-xl backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
                  Дерево крафта компонентов
                </h3>
                <div className="p-2 bg-[#0a0b0d] border border-zinc-800/80 rounded-xs">
                  <TreeNodeView node={calculation.tree} isRoot={true} />
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;