import { useState, useMemo, useEffect } from 'react';
import { WORKSTATIONS, RECIPES, ITEMS, PROFESSIONS } from './data/mockData';
import { CraftingEngine } from './engine/calculator';
import type {
  WorkstationId,
  CraftTier,
  CraftCategory,
  UserCategoryTiers,
  DurabilityLevel,
  UserSkillLevels,
  ProfessionId
} from './types/crafting';
import { DURABILITY_LEVELS } from './types/crafting';
import { calculateHelixCost } from './utils/repairCalculator';
import { TreeNodeView } from './components/TreeNodeView';
import {
  Hammer, Clock, ShieldAlert, Layers, Cpu,
  FlaskConical, Scissors, Crosshair, Filter, Sliders, Search, Wrench, X,
  Award, HeartPulse, Anvil
} from 'lucide-react';

const engine = new CraftingEngine(RECIPES, ITEMS);

const STORAGE_KEY_TIERS = 'crafting_category_tiers';
const STORAGE_KEY_DURABILITY = 'crafting_workstation_durability';
const STORAGE_KEY_SKILLS = 'crafting_user_skill_levels';

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

const defaultSkillLevels: UserSkillLevels = {};
PROFESSIONS.forEach(p => {
  p.skills.forEach(s => {
    defaultSkillLevels[s.id] = s.maxLevel;
  });
});

export function App() {
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

  const [userSkillLevels, setUserSkillLevels] = useState<UserSkillLevels>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SKILLS);
    if (saved) {
      try {
        return { ...defaultSkillLevels, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Ошибка чтения userSkillLevels из localStorage', e);
      }
    }
    return defaultSkillLevels;
  });

  const [selectedTierFilter, setSelectedTierFilter] = useState<CraftTier | 'all'>('all');
  const [selectedBench, setSelectedBench] = useState<WorkstationId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(RECIPES[0]?.id || '');
  const [craftAmount, setCraftAmount] = useState<number>(1);
  const [activeTopTab, setActiveTopTab] = useState<'bench' | 'professions'>('professions');

  // Кастомные выбранные тиры для подкомпонентов дерева
  const [customComponentTiers, setCustomComponentTiers] = useState<Record<string, CraftTier>>({});

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TIERS, JSON.stringify(categoryTiers));
  }, [categoryTiers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DURABILITY, JSON.stringify(workstationDurability));
  }, [workstationDurability]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(userSkillLevels));
  }, [userSkillLevels]);

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

  const handleComponentTierChange = (itemId: string, tier: CraftTier) => {
    setCustomComponentTiers(prev => ({
      ...prev,
      [itemId]: tier
    }));
  };

  const setSkillLevel = (skillId: string, level: number) => {
    setUserSkillLevels(prev => ({
      ...prev,
      [skillId]: level
    }));
  };

  const filteredRecipes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return RECIPES.filter(r => {
      if (selectedBench !== 'all' && r.workstationId !== selectedBench) return false;
      if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;

      const unlockedTier = categoryTiers[r.category] ?? 1;
      if (r.tier > unlockedTier) return false;

      if (r.requiredSkill) {
        const currentSkillLevel = userSkillLevels[r.requiredSkill.skillId] ?? 0;
        if (currentSkillLevel < r.requiredSkill.level) return false;
      }

      if (selectedTierFilter !== 'all' && r.tier !== selectedTierFilter) return false;

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
  }, [selectedBench, selectedCategory, categoryTiers, userSkillLevels, selectedTierFilter, searchQuery]);

  useEffect(() => {
    if (filteredRecipes.length > 0) {
      const isStillAvailable = filteredRecipes.some(r => r.id === selectedRecipeId);
      if (!isStillAvailable) {
        setSelectedRecipeId(filteredRecipes[0].id);
      }
    }
  }, [filteredRecipes, selectedRecipeId]);

  const calculation = useMemo(() => {
    if (!selectedRecipeId) return null;
    return engine.calculate(
      selectedRecipeId,
      Math.max(1, craftAmount),
      categoryTiers,
      userSkillLevels,
      customComponentTiers
    );
  }, [selectedRecipeId, craftAmount, categoryTiers, userSkillLevels, customComponentTiers]);

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

  const getProfessionIcon = (id: ProfessionId) => {
    switch (id) {
      case 'technician': return <Wrench className="w-4 h-4 text-cyan-400" />;
      case 'pharmacist': return <HeartPulse className="w-4 h-4 text-emerald-400" />;
      case 'chemist': return <FlaskConical className="w-4 h-4 text-purple-400" />;
      case 'gunsmith': return <Crosshair className="w-4 h-4 text-red-400" />;
      case 'armorer': return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'metallurgist': return <Anvil className="w-4 h-4 text-orange-400" />;
    }
  };

  const toRoman = (num: number) => {
    switch (num) {
      case 0: return '0';
      case 1: return 'I';
      case 2: return 'II';
      case 3: return 'III';
      case 4: return 'IV';
      default: return String(num);
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
            <p className="text-xs text-zinc-500">Система расчёта крафта, навыков профессий и износа верстаков</p>
          </div>
        </div>

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

      {/* ПАНЕЛЬ НАСТРОЙКИ ВЕРСТАКОВ И ПРОФЕССИЙ */}
      <section className="max-w-7xl mx-auto mb-6 bg-[#121418]/90 border border-zinc-800 rounded p-4 shadow-2xl backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider font-mono">
            <button
              onClick={() => setActiveTopTab('professions')}
              className={`flex items-center gap-2 px-3 py-1.5 border transition ${
                activeTopTab === 'professions'
                  ? 'bg-orange-600 border-orange-500 text-black font-bold'
                  : 'bg-[#0a0b0d] border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Профессии персонажа (6)</span>
            </button>

            <button
              onClick={() => setActiveTopTab('bench')}
              className={`flex items-center gap-2 px-3 py-1.5 border transition ${
                activeTopTab === 'bench'
                  ? 'bg-orange-600 border-orange-500 text-black font-bold'
                  : 'bg-[#0a0b0d] border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Параметры и тиры верстаков</span>
            </button>
          </div>
        </div>

        {/* ВКЛАДКА: ПРОФЕССИИ И НАВЫКИ */}
        {activeTopTab === 'professions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROFESSIONS.map(prof => {
              return (
                <div key={prof.id} className="p-3 bg-[#0a0b0d] border border-zinc-800/90 rounded space-y-2.5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                    <div className="flex items-center gap-2 text-xs text-zinc-200 font-bold uppercase tracking-wide">
                      {getProfessionIcon(prof.id)}
                      <span>{prof.name}</span>
                    </div>
                    {prof.skills.length > 0 ? (
                      <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 px-1.5 py-0.2 font-mono">
                        {prof.skills.length} {prof.skills.length === 1 ? 'навык' : prof.skills.length < 5 ? 'навыка' : 'навыков'}
                      </span>
                    ) : (
                      <span className="text-[9px] bg-zinc-900 text-zinc-500 border border-zinc-800 px-1.5 py-0.2 font-mono">
                        Скоро
                      </span>
                    )}
                  </div>

                  {prof.skills.length > 0 ? (
                    <div className="space-y-2 pt-0.5">
                      {prof.skills.map(s => {
                        const currentLvl = userSkillLevels[s.id] ?? s.maxLevel;
                        return (
                          <div key={s.id} className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                              <span className="truncate uppercase">{s.name}</span>
                              <span className="text-orange-400 font-bold">{toRoman(currentLvl)}</span>
                            </div>
                            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${s.maxLevel + 1}, minmax(0, 1fr))` }}>
                              {Array.from({ length: s.maxLevel + 1 }, (_, lvl) => (
                                <button
                                  key={lvl}
                                  onClick={() => setSkillLevel(s.id, lvl)}
                                  className={`py-0.5 text-[9px] font-mono transition uppercase ${
                                    currentLvl === lvl
                                      ? 'bg-orange-600 text-black font-bold'
                                      : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800 border border-zinc-800/60'
                                  }`}
                                >
                                  {toRoman(lvl)}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-600 font-mono uppercase italic py-2 text-center">
                      Навыки профессии будут добавлены позже
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ВКЛАДКА: ВЕРСТАКИ И ТИРЫ КАТЕГОРИЙ */}
        {activeTopTab === 'bench' && (
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
        )}
      </section>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ЛЕВАЯ КОЛОНКА */}
        <section className="lg:col-span-5 space-y-4">
          <div className="bg-[#121418]/90 border border-zinc-800 rounded p-4 space-y-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500 font-mono border-b border-zinc-800 pb-2">
              <Filter className="w-4 h-4" />
              <span>Выбор категории и рецепта</span>
            </div>

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

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono flex justify-between">
                <span>Фильтр рецептов по Тиру</span>
                <span className="text-orange-400 font-bold">
                  {selectedTierFilter === 'all' ? 'ВСЕ ДОСТУПНЫЕ' : `ТОЛЬКО T${selectedTierFilter}`}
                </span>
              </label>
              <div className="grid grid-cols-5 gap-1">
                <button
                  onClick={() => setSelectedTierFilter('all')}
                  className={`py-1.5 text-[11px] font-mono font-bold uppercase transition border ${selectedTierFilter === 'all'
                    ? 'bg-orange-600 border-orange-500 text-black shadow-lg shadow-orange-950/40'
                    : 'bg-[#0a0b0d] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                >
                  ВСЕ
                </button>
                {([1, 2, 3, 4] as CraftTier[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTierFilter(t)}
                    className={`py-1.5 text-[11px] font-mono font-bold uppercase transition border ${selectedTierFilter === t
                      ? 'bg-orange-600 border-orange-500 text-black shadow-lg shadow-orange-950/40'
                      : 'bg-[#0a0b0d] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                  >
                    T{t}
                  </button>
                ))}
              </div>
            </div>

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
                      <div className="flex items-center gap-2 min-w-0">
                        {getBenchIcon(recipe.workstationId)}
                        <span className="text-xs font-mono uppercase truncate">{recipe.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {recipe.expGiven && recipe.expGiven > 0 ? (
                          <span className="text-[9px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 px-1 py-0.2 font-bold">
                            +{recipe.expGiven} XP
                          </span>
                        ) : null}
                        <span className="text-[9px] font-mono bg-orange-950/60 text-orange-400 border border-orange-600/40 px-1 py-0.2">
                          T{recipe.tier}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-600 font-mono uppercase">
                    Рецепты не найдены
                  </div>
                )}
              </div>
            </div>

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

        {/* ПРАВАЯ КОЛОНКА */}
        <section className="lg:col-span-7 space-y-4">
          {calculation ? (
            <>
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

              {/* ПОЛУЧАЕМЫЙ ОПЫТ ПО ПРОФЕССИЯМ */}
              <div className="bg-[#121418]/90 border border-zinc-800 rounded p-4 space-y-3 shadow-xl backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Получаемый опыт по профессиям
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
                  {PROFESSIONS.map(prof => {
                    const xp = calculation.expByProfession[prof.id] || 0;
                    return (
                      <div
                        key={prof.id}
                        className={`p-2.5 border font-mono flex flex-col justify-between transition ${
                          xp > 0
                            ? 'bg-emerald-950/30 border-emerald-600/50 text-emerald-300'
                            : 'bg-[#0a0b0d] border-zinc-800/80 text-zinc-500'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {getProfessionIcon(prof.id)}
                          <span className="text-[10px] uppercase font-bold truncate">{prof.name}</span>
                        </div>
                        <span className={`text-xs font-bold font-mono ${xp > 0 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                          {xp > 0 ? `+${xp} XP` : '0 XP'}
                        </span>
                      </div>
                    );
                  })}
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

              {/* ДЕРЕВО КРАФТА С ИНТЕРАКТИВНЫМ ВЫБОРОМ ТИРОВ ПОДКОМПОНЕНТОВ */}
              <div className="bg-[#121418]/90 border border-zinc-800 rounded p-4 space-y-3 shadow-xl backdrop-blur-sm">
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
                  Дерево крафта компонентов
                </h3>
                <div className="p-2 bg-[#0a0b0d] border border-zinc-800/80 rounded-xs">
                  <TreeNodeView 
                    node={calculation.tree} 
                    isRoot={true} 
                    onComponentTierChange={handleComponentTierChange}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="bg-[#121418]/90 border border-zinc-800 rounded p-8 text-center text-zinc-500 font-mono uppercase text-xs">
              Выберите рецепт для расчёта
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
