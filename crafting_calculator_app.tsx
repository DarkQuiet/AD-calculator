import React, { useState, useMemo, useEffect } from 'react';
import { 
  Shield, 
  Wrench, 
  FlaskConical, 
  Crosshair, 
  Anvil, 
  Search, 
  Layers, 
  Clock, 
  Zap, 
  Box, 
  PackageCheck, 
  Sliders, 
  Plus, 
  Minus, 
  ChevronRight, 
  Maximize2, 
  RefreshCw,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Briefcase
} from 'lucide-react';


// Category Metadata with Color Codes and Icons
const CATEGORIES = {
  Medic: { name: 'Medic', color: '#10b981', bg: 'bg-emerald-950/40', border: 'border-emerald-500/40', text: 'text-emerald-400', accent: 'emerald', icon: Shield },
  Technic: { name: 'Technic', color: '#3b82f6', bg: 'bg-blue-950/40', border: 'border-blue-500/40', text: 'text-blue-400', accent: 'blue', icon: Wrench },
  Chemic: { name: 'Chemic', color: '#a855f7', bg: 'bg-purple-950/40', border: 'border-purple-500/40', text: 'text-purple-400', accent: 'purple', icon: FlaskConical },
  Guns: { name: 'Guns', color: '#ef4444', bg: 'bg-red-950/40', border: 'border-red-500/40', text: 'text-red-400', accent: 'red', icon: Crosshair },
  Metal: { name: 'Metal', color: '#f59e0b', bg: 'bg-amber-950/40', border: 'border-amber-500/40', text: 'text-amber-400', accent: 'amber', icon: Anvil },
};

// Database Items
const INITIAL_ITEMS = {
  // --- BASE RESOURCES ---
  'cloth': { id: 'cloth', name: 'Синтетическая ткань', icon: '🧵', isBase: true },
  'herbs': { id: 'herbs', name: 'Лекарственная трава', icon: '🌿', isBase: true },
  'clean_water': { id: 'clean_water', name: 'Дистиллированная вода', icon: '💧', isBase: true },
  'copper_ore': { id: 'copper_ore', name: 'Медная руда', icon: '🪨', isBase: true },
  'iron_ore': { id: 'iron_ore', name: 'Железная руда', icon: '⛏️', isBase: true },
  'titanium_ore': { id: 'titanium_ore', name: 'Титановая руда', icon: '🌋', isBase: true },
  'sulfur': { id: 'sulfur', name: 'Сера', icon: '🟡', isBase: true },
  'oil_raw': { id: 'oil_raw', name: 'Сырая нефть', icon: '🛢️', isBase: true },
  'silicon': { id: 'silicon', name: 'Кремний', icon: '💎', isBase: true },
  'gunpowder_base': { id: 'gunpowder_base', name: 'Селитра', icon: '🧂', isBase: true },

  // --- MEDIC ---
  'bandage_t1': { id: 'bandage_t1', name: 'Стерильный бинт', icon: '🩹', isBase: false },
  'medkit_t1': { id: 'medkit_t1', name: 'Аптечка первой помощи', icon: '💉', isBase: false },
  'stim_t2': { id: 'stim_t2', name: 'Стимулятор адреналина', icon: '🧪', isBase: false },
  'medkit_t2': { id: 'medkit_t2', name: 'Полевой хирургический набор', icon: '🧰', isBase: false },
  'nanite_injector_t3': { id: 'nanite_injector_t3', name: 'Нано-регенератор T3', icon: '🧬', isBase: false },

  // --- TECHNIC ---
  'wire_t1': { id: 'wire_t1', name: 'Медный кабель', icon: '🔌', isBase: false },
  'microchip_t1': { id: 'microchip_t1', name: 'Простая микросхема', icon: '💾', isBase: false },
  'battery_t2': { id: 'battery_t2', name: 'Литий-ионный аккумулятор', icon: '🔋', isBase: false },
  'circuit_t2': { id: 'circuit_t2', name: 'Процессорный модуль', icon: '🎛️', isBase: false },
  'quantum_core_t3': { id: 'quantum_core_t3', name: 'Квантовый вычислитель T3', icon: '⚛️', isBase: false },

  // --- CHEMIC ---
  'acid_t1': { id: 'acid_t1', name: 'Техническая кислота', icon: '🧪', isBase: false },
  'polymer_t1': { id: 'polymer_t1', name: 'Термопластик', icon: '🧪', isBase: false },
  'catalyst_t2': { id: 'catalyst_t2', name: 'Химический катализатор', icon: '⚗️', isBase: false },
  'explosive_compound_t2': { id: 'explosive_compound_t2', name: 'Стабильная взрывчатка', icon: '💣', isBase: false },
  'plasma_fluid_t3': { id: 'plasma_fluid_t3', name: 'Плазменный топливный концентрат T3', icon: '🔮', isBase: false },

  // --- GUNS ---
  'ammo_9mm_t1': { id: 'ammo_9mm_t1', name: 'Патроны 9мм (x50)', icon: '🔫', isBase: false },
  'smg_t1': { id: 'smg_t1', name: 'Пистолет-пулемёт T1', icon: '🔫', isBase: false },
  'rifle_t2': { id: 'rifle_t2', name: 'Штурмовая винтовка T2', icon: '🪖', isBase: false },
  'ammo_556_t2': { id: 'ammo_556_t2', name: 'Патроны 5.56 (x60)', icon: '📦', isBase: false },
  'plasma_cannon_t3': { id: 'plasma_cannon_t3', name: 'Плазменная пушка T3', icon: '💥', isBase: false },

  // --- METAL ---
  'iron_ingot_t1': { id: 'iron_ingot_t1', name: 'Железный слиток', icon: '🧱', isBase: false },
  'steel_plate_t1': { id: 'steel_plate_t1', name: 'Стальная пластина', icon: '🛡️', isBase: false },
  'titanium_ingot_t2': { id: 'titanium_ingot_t2', name: 'Титановый слиток', icon: '🪙', isBase: false },
  'composite_armor_t2': { id: 'composite_armor_t2', name: 'Композитная бронеплита', icon: '🦾', isBase: false },
  'exoskeleton_frame_t3': { id: 'exoskeleton_frame_t3', name: 'Каркас Экзоскелета T3', icon: '🤖', isBase: false },
};

// Database Recipes (Each category has Tier 1, Tier 2, Tier 3)
const INITIAL_RECIPES = [
  // --- MEDIC ---
  {
    id: 'rec_bandage_t1',
    outputItemId: 'bandage_t1',
    category: 'Medic',
    tier: 1,
    craftTimeSec: 4,
    craftStation: 'Полевой верстак',
    outputYield: 2,
    inputs: [
      { itemId: 'cloth', amount: 3 },
      { itemId: 'clean_water', amount: 1 }
    ]
  },
  {
    id: 'rec_medkit_t1',
    outputItemId: 'medkit_t1',
    category: 'Medic',
    tier: 1,
    craftTimeSec: 8,
    craftStation: 'Медпункт T1',
    outputYield: 1,
    inputs: [
      { itemId: 'bandage_t1', amount: 2 },
      { itemId: 'herbs', amount: 4 }
    ]
  },
  {
    id: 'rec_stim_t2',
    outputItemId: 'stim_t2',
    category: 'Medic',
    tier: 2,
    craftTimeSec: 15,
    craftStation: 'Лаборатория T2',
    outputYield: 1,
    inputs: [
      { itemId: 'herbs', amount: 8 },
      { itemId: 'acid_t1', amount: 2 },
      { itemId: 'clean_water', amount: 3 }
    ]
  },
  {
    id: 'rec_medkit_t2',
    outputItemId: 'medkit_t2',
    category: 'Medic',
    tier: 2,
    craftTimeSec: 25,
    craftStation: 'Медпункт T2',
    outputYield: 1,
    inputs: [
      { itemId: 'medkit_t1', amount: 2 },
      { itemId: 'stim_t2', amount: 1 },
      { itemId: 'polymer_t1', amount: 3 }
    ]
  },
  {
    id: 'rec_nanite_injector_t3',
    outputItemId: 'nanite_injector_t3',
    category: 'Medic',
    tier: 3,
    craftTimeSec: 60,
    craftStation: 'Био-фабрика T3',
    outputYield: 1,
    inputs: [
      { itemId: 'medkit_t2', amount: 2 },
      { itemId: 'quantum_core_t3', amount: 1 },
      { itemId: 'plasma_fluid_t3', amount: 1 }
    ]
  },

  // --- TECHNIC ---
  {
    id: 'rec_wire_t1',
    outputItemId: 'wire_t1',
    category: 'Technic',
    tier: 1,
    craftTimeSec: 3,
    craftStation: 'Простой станок',
    outputYield: 4,
    inputs: [
      { itemId: 'copper_ore', amount: 2 }
    ]
  },
  {
    id: 'rec_microchip_t1',
    outputItemId: 'microchip_t1',
    category: 'Technic',
    tier: 1,
    craftTimeSec: 10,
    craftStation: 'Паяльная станция',
    outputYield: 1,
    inputs: [
      { itemId: 'wire_t1', amount: 4 },
      { itemId: 'silicon', amount: 3 }
    ]
  },
  {
    id: 'rec_battery_t2',
    outputItemId: 'battery_t2',
    category: 'Technic',
    tier: 2,
    craftTimeSec: 18,
    craftStation: 'Сборочный цех T2',
    outputYield: 1,
    inputs: [
      { itemId: 'acid_t1', amount: 3 },
      { itemId: 'copper_ore', amount: 6 },
      { itemId: 'iron_ingot_t1', amount: 2 }
    ]
  },
  {
    id: 'rec_circuit_t2',
    outputItemId: 'circuit_t2',
    category: 'Technic',
    tier: 2,
    craftTimeSec: 30,
    craftStation: 'Сборочный цех T2',
    outputYield: 1,
    inputs: [
      { itemId: 'microchip_t1', amount: 3 },
      { itemId: 'wire_t1', amount: 6 },
      { itemId: 'polymer_t1', amount: 4 }
    ]
  },
  {
    id: 'rec_quantum_core_t3',
    outputItemId: 'quantum_core_t3',
    category: 'Technic',
    tier: 3,
    craftTimeSec: 90,
    craftStation: 'Фабрика электроники T3',
    outputYield: 1,
    inputs: [
      { itemId: 'circuit_t2', amount: 2 },
      { itemId: 'battery_t2', amount: 3 },
      { itemId: 'titanium_ingot_t2', amount: 4 }
    ]
  },

  // --- CHEMIC ---
  {
    id: 'rec_acid_t1',
    outputItemId: 'acid_t1',
    category: 'Chemic',
    tier: 1,
    craftTimeSec: 6,
    craftStation: 'Хим-стол T1',
    outputYield: 2,
    inputs: [
      { itemId: 'sulfur', amount: 4 },
      { itemId: 'clean_water', amount: 2 }
    ]
  },
  {
    id: 'rec_polymer_t1',
    outputItemId: 'polymer_t1',
    category: 'Chemic',
    tier: 1,
    craftTimeSec: 8,
    craftStation: 'Хим-стол T1',
    outputYield: 3,
    inputs: [
      { itemId: 'oil_raw', amount: 3 }
    ]
  },
  {
    id: 'rec_catalyst_t2',
    outputItemId: 'catalyst_t2',
    category: 'Chemic',
    tier: 2,
    craftTimeSec: 20,
    craftStation: 'Хим-реактор T2',
    outputYield: 1,
    inputs: [
      { itemId: 'acid_t1', amount: 3 },
      { itemId: 'silicon', amount: 5 }
    ]
  },
  {
    id: 'rec_explosive_compound_t2',
    outputItemId: 'explosive_compound_t2',
    category: 'Chemic',
    tier: 2,
    craftTimeSec: 22,
    craftStation: 'Хим-реактор T2',
    outputYield: 2,
    inputs: [
      { itemId: 'sulfur', amount: 8 },
      { itemId: 'gunpowder_base', amount: 6 },
      { itemId: 'polymer_t1', amount: 2 }
    ]
  },
  {
    id: 'rec_plasma_fluid_t3',
    outputItemId: 'plasma_fluid_t3',
    category: 'Chemic',
    tier: 3,
    craftTimeSec: 75,
    craftStation: 'Синтезатор плазмы T3',
    outputYield: 1,
    inputs: [
      { itemId: 'catalyst_t2', amount: 2 },
      { itemId: 'oil_raw', amount: 12 },
      { itemId: 'titanium_ore', amount: 8 }
    ]
  },

  // --- GUNS ---
  {
    id: 'rec_ammo_9mm_t1',
    outputItemId: 'ammo_9mm_t1',
    category: 'Guns',
    tier: 1,
    craftTimeSec: 5,
    craftStation: 'Патронный пресс',
    outputYield: 1,
    inputs: [
      { itemId: 'copper_ore', amount: 3 },
      { itemId: 'gunpowder_base', amount: 3 }
    ]
  },
  {
    id: 'rec_smg_t1',
    outputItemId: 'smg_t1',
    category: 'Guns',
    tier: 1,
    craftTimeSec: 15,
    craftStation: 'Оружейный верстак T1',
    outputYield: 1,
    inputs: [
      { itemId: 'iron_ingot_t1', amount: 5 },
      { itemId: 'wire_t1', amount: 2 }
    ]
  },
  {
    id: 'rec_rifle_t2',
    outputItemId: 'rifle_t2',
    category: 'Guns',
    tier: 2,
    craftTimeSec: 40,
    craftStation: 'Оружейный верстак T2',
    outputYield: 1,
    inputs: [
      { itemId: 'smg_t1', amount: 1 },
      { itemId: 'steel_plate_t1', amount: 4 },
      { itemId: 'circuit_t2', amount: 1 }
    ]
  },
  {
    id: 'rec_ammo_556_t2',
    outputItemId: 'ammo_556_t2',
    category: 'Guns',
    tier: 2,
    craftTimeSec: 10,
    craftStation: 'Патронный пресс',
    outputYield: 1,
    inputs: [
      { itemId: 'steel_plate_t1', amount: 2 },
      { itemId: 'explosive_compound_t2', amount: 1 }
    ]
  },
  {
    id: 'rec_plasma_cannon_t3',
    outputItemId: 'plasma_cannon_t3',
    category: 'Guns',
    tier: 3,
    craftTimeSec: 120,
    craftStation: 'Оружейный комплекс T3',
    outputYield: 1,
    inputs: [
      { itemId: 'rifle_t2', amount: 2 },
      { itemId: 'plasma_fluid_t3', amount: 2 },
      { itemId: 'quantum_core_t3', amount: 1 },
      { itemId: 'composite_armor_t2', amount: 3 }
    ]
  },

  // --- METAL ---
  {
    id: 'rec_iron_ingot_t1',
    outputItemId: 'iron_ingot_t1',
    category: 'Metal',
    tier: 1,
    craftTimeSec: 5,
    craftStation: 'Плавильня T1',
    outputYield: 2,
    inputs: [
      { itemId: 'iron_ore', amount: 4 }
    ]
  },
  {
    id: 'rec_steel_plate_t1',
    outputItemId: 'steel_plate_t1',
    category: 'Metal',
    tier: 1,
    craftTimeSec: 10,
    craftStation: 'Прокатный стан T1',
    outputYield: 1,
    inputs: [
      { itemId: 'iron_ingot_t1', amount: 3 }
    ]
  },
  {
    id: 'rec_titanium_ingot_t2',
    outputItemId: 'titanium_ingot_t2',
    category: 'Metal',
    tier: 2,
    craftTimeSec: 25,
    craftStation: 'Индукционная печь T2',
    outputYield: 1,
    inputs: [
      { itemId: 'titanium_ore', amount: 5 },
      { itemId: 'acid_t1', amount: 1 }
    ]
  },
  {
    id: 'rec_composite_armor_t2',
    outputItemId: 'composite_armor_t2',
    category: 'Metal',
    tier: 2,
    craftTimeSec: 35,
    craftStation: 'Пресс-пресс T2',
    outputYield: 1,
    inputs: [
      { itemId: 'steel_plate_t1', amount: 4 },
      { itemId: 'titanium_ingot_t2', amount: 2 },
      { itemId: 'polymer_t1', amount: 5 }
    ]
  },
  {
    id: 'rec_exoskeleton_frame_t3',
    outputItemId: 'exoskeleton_frame_t3',
    category: 'Metal',
    tier: 3,
    craftTimeSec: 110,
    craftStation: 'Литейный цех тяжелой брони T3',
    outputYield: 1,
    inputs: [
      { itemId: 'composite_armor_t2', amount: 6 },
      { itemId: 'quantum_core_t3', amount: 1 },
      { itemId: 'plasma_fluid_t3', amount: 1 }
    ]
  }
];


// Helper to build deep crafting tree for UI rendering
function buildCraftTree(itemId, targetAmount = 1, recipes, items, depth = 0, speedMultiplier = 1.0) {
  const item = items[itemId];
  if (!item) return null;

  // Find primary recipe for this item
  const recipe = recipes.find(r => r.outputItemId === itemId);

  if (item.isBase || !recipe) {
    return {
      id: `${itemId}-node-${Math.random().toString(36).substr(2, 5)}`,
      itemId,
      name: item.name,
      icon: item.icon,
      isBase: true,
      amountNeeded: targetAmount,
      depth,
      children: []
    };
  }

  // Calculate batches required
  const yieldPerCraft = recipe.outputYield || 1;
  const batchesNeeded = Math.ceil(targetAmount / yieldPerCraft);
  const totalCraftTime = Math.ceil((batchesNeeded * recipe.craftTimeSec) / speedMultiplier);

  const children = recipe.inputs.map(input => {
    const requiredInputAmount = input.amount * batchesNeeded;
    return buildCraftTree(input.itemId, requiredInputAmount, recipes, items, depth + 1, speedMultiplier);
  }).filter(Boolean);

  return {
    id: `${itemId}-node-${Math.random().toString(36).substr(2, 5)}`,
    itemId,
    name: item.name,
    icon: item.icon,
    isBase: false,
    amountNeeded: targetAmount,
    batchesNeeded,
    recipe,
    craftStation: recipe.craftStation,
    totalCraftTime,
    category: recipe.category,
    tier: recipe.tier,
    depth,
    children
  };
}

// Calculate total base raw materials needed recursively
function calculateTotalBaseResources(itemId, targetAmount, recipes, items, userInventory = {}) {
  const totals = {};
  let totalTimeSec = 0;

  function traverse(currItemId, currAmount) {
    const item = items[currItemId];
    if (!item) return;

    // Check user inventory deduction if applicable
    let needed = currAmount;
    if (userInventory[currItemId] && userInventory[currItemId] > 0) {
      const available = userInventory[currItemId];
      if (available >= needed) {
        userInventory[currItemId] -= needed;
        return; // Satisfied from inventory
      } else {
        needed -= available;
        userInventory[currItemId] = 0;
      }
    }

    const recipe = recipes.find(r => r.outputItemId === currItemId);

    if (item.isBase || !recipe) {
      totals[currItemId] = (totals[currItemId] || 0) + needed;
      return;
    }

    const yieldPerCraft = recipe.outputYield || 1;
    const batches = Math.ceil(needed / yieldPerCraft);
    totalTimeSec += batches * recipe.craftTimeSec;

    recipe.inputs.forEach(input => {
      traverse(input.itemId, input.amount * batches);
    });
  }

  // Clone inventory object so we don't mutate original state directly
  const tempInventory = { ...userInventory };
  traverse(itemId, targetAmount);

  return { totals, totalTimeSec };
}

export default function App() {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active crafting selection
  const [targetItemId, setTargetItemId] = useState('nanite_injector_t3');
  const [craftQuantity, setCraftQuantity] = useState(1);
  
  // Efficiency Modifiers
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0); // 1x, 1.5x, 2x
  const [useInventory, setUseInventory] = useState(false);
  
  // Custom mock user inventory
  const [userInventory, setUserInventory] = useState({
    'iron_ore': 20,
    'cloth': 15,
    'copper_ore': 10
  });

  // Active Inspect Modal
  const [inspectRecipe, setInspectRecipe] = useState(null);

  // Filtered recipes list for selecting target product
  const craftableItems = useMemo(() => {
    return Object.values(INITIAL_ITEMS).filter(item => {
      if (item.isBase) return false; // Base resources can't be crafted as end product
      
      const recipe = INITIAL_RECIPES.find(r => r.outputItemId === item.id);
      if (!recipe) return false;

      const matchesCat = selectedCategory === 'ALL' || recipe.category === selectedCategory;
      const matchesTier = selectedTier === 'ALL' || recipe.tier === Number(selectedTier);
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesTier && matchesSearch;
    });
  }, [selectedCategory, selectedTier, searchQuery]);

  // Generate Tree Data for chosen Target Item
  const craftTree = useMemo(() => {
    if (!targetItemId) return null;
    return buildCraftTree(targetItemId, craftQuantity, INITIAL_RECIPES, INITIAL_ITEMS, 0, speedMultiplier);
  }, [targetItemId, craftQuantity, speedMultiplier]);

  // Calculate Base Material Totals
  const baseResourceSummary = useMemo(() => {
    if (!targetItemId) return { totals: {}, totalTimeSec: 0 };
    return calculateTotalBaseResources(
      targetItemId, 
      craftQuantity, 
      INITIAL_RECIPES, 
      INITIAL_ITEMS, 
      useInventory ? { ...userInventory } : {}
    );
  }, [targetItemId, craftQuantity, useInventory, userInventory]);

  // Helper for formatting craft time
  const formatTime = (seconds) => {
    const adjusted = Math.ceil(seconds / speedMultiplier);
    if (adjusted < 60) return `${adjusted} сек.`;
    const mins = Math.floor(adjusted / 60);
    const secs = adjusted % 60;
    return `${mins} мин. ${secs > 0 ? secs + ' сек.' : ''}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-900">
      
      {/* HEADER BAR */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Anvil className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-400 bg-clip-text text-transparent">
              CRAFT MATRIX <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 ml-2 font-mono">v2.4 PRO</span>
            </h1>
            <p className="text-xs text-slate-400">Интерактивный калькулятор рецептов и древо ресурсов</p>
          </div>
        </div>

        {/* Global Efficiency Quick Controls */}
        <div className="hidden md:flex items-center gap-6 bg-slate-950/60 border border-slate-800 px-4 py-1.5 rounded-xl">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400 font-medium">Множитель скорости:</span>
            <div className="flex items-center gap-1">
              {[1.0, 1.5, 2.0].map(speed => (
                <button
                  key={speed}
                  onClick={() => setSpeedMultiplier(speed)}
                  className={`px-2 py-0.5 text-xs rounded font-mono transition-all ${
                    speedMultiplier === speed
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={useInventory}
              onChange={(e) => setUseInventory(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/30"
            />
            <span>Учитывать инвентарь</span>
          </label>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:p-6 max-w-[1800px] w-full mx-auto">
        
        {/* LEFT COLUMN: ITEM SELECTOR & FILTERS (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* CATEGORY TABS */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> Категории
              </span>
              <span className="text-xs font-mono text-slate-500">{craftableItems.length} предметов</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
                  selectedCategory === 'ALL'
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                Все категории
              </button>
              {Object.entries(CATEGORIES).map(([catKey, cat]) => {
                const Icon = cat.icon;
                const active = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-1.5 ${
                      active
                        ? `${cat.bg} ${cat.border} ${cat.text} shadow-lg`
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* TIER FILTER & SEARCH */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Поиск по названию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Tier Filter */}
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="ALL">Все Tiers</option>
                <option value="1">Tier 1</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
              </select>
            </div>
          </div>

          {/* ITEM SELECTION LIST */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex-1 flex flex-col min-h-[350px]">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Выберите продукт</span>
              {selectedCategory !== 'ALL' && (
                <span className={`text-[10px] px-2 py-0.5 rounded ${CATEGORIES[selectedCategory]?.bg} ${CATEGORIES[selectedCategory]?.text} border ${CATEGORIES[selectedCategory]?.border}`}>
                  {selectedCategory}
                </span>
              )}
            </span>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[480px] custom-scrollbar">
              {craftableItems.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Ничего не найдено по вашему запросу
                </div>
              ) : (
                craftableItems.map((item) => {
                  const recipe = INITIAL_RECIPES.find(r => r.outputItemId === item.id);
                  const isSelected = targetItemId === item.id;
                  const cat = CATEGORIES[recipe?.category] || CATEGORIES.Medic;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setTargetItemId(item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-cyan-950/30 border-cyan-500/80 shadow-md shadow-cyan-500/5 ring-1 ring-cyan-500/30'
                          : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {item.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${cat.bg} ${cat.text}`}>
                              T{recipe?.tier} • {recipe?.category}
                            </span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {recipe?.craftTimeSec}с
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectRecipe(recipe);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                          title="Детали рецепта"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                        <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : ''}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* QUANTITY & QUICK STATS PANEL */}
          {targetItemId && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Количество для крафта</span>
                <span className="text-xs text-cyan-400 font-mono font-bold">Итого: {craftQuantity} шт.</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCraftQuantity(Math.max(1, craftQuantity - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800 active:scale-95 transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  type="number"
                  min="1"
                  max="999"
                  value={craftQuantity}
                  onChange={(e) => setCraftQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 text-center text-sm font-bold font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />

                <button
                  onClick={() => setCraftQuantity(craftQuantity + 1)}
                  className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Время изготовления</span>
                  <span className="text-xs font-bold font-mono text-amber-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatTime(baseResourceSummary.totalTimeSec)}
                  </span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Базовые ресурсы</span>
                  <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Box className="w-3.5 h-3.5" />
                    {Object.keys(baseResourceSummary.totals).length} видов
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: INTERACTIVE VISUALIZER & SUMMARY (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* BASE RESOURCE SUMMARY CARD */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Сводка сырья и ингредиентов
                </h2>
              </div>
              {useInventory && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Учтён имеющийся инвентарь
                </span>
              )}
            </div>

            {/* Base Materials Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.keys(baseResourceSummary.totals).length === 0 ? (
                <div className="col-span-full py-4 text-center text-slate-500 text-xs">
                  Все необходимые ресурсы уже есть на складе!
                </div>
              ) : (
                Object.entries(baseResourceSummary.totals).map(([itemId, amount]) => {
                  const item = INITIAL_ITEMS[itemId];
                  return (
                    <div
                      key={itemId}
                      className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-lg">
                        {item?.icon || '📦'}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-medium text-slate-300 truncate">
                          {item?.name || itemId}
                        </div>
                        <div className="text-sm font-bold font-mono text-cyan-400">
                          x{amount}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* INTERACTIVE CRAFT TREE VISUALIZER (Simulated React Flow Graph) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Дерево крафта и рецептурные связки
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Визуальный граф рекурсивного расчёта цепочки производства
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  Глубина: {getCraftTreeDepth(craftTree)} ур.
                </span>
              </div>
            </div>

            {/* Tree Container */}
            <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded-xl p-6 overflow-x-auto custom-scrollbar flex items-center justify-start min-h-[400px]">
              {craftTree ? (
                <div className="py-4 px-2 min-w-max">
                  <TreeNodeView node={craftTree} onInspect={(recipe) => setInspectRecipe(recipe)} />
                </div>
              ) : (
                <div className="m-auto text-center text-slate-500 text-xs">
                  Выберите предмет для генерации дерева
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* INSPECT RECIPE MODAL */}
      {inspectRecipe && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setInspectRecipe(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 text-sm font-bold p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl">
                {INITIAL_ITEMS[inspectRecipe.outputItemId]?.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  {INITIAL_ITEMS[inspectRecipe.outputItemId]?.name}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${CATEGORIES[inspectRecipe.category]?.bg} ${CATEGORIES[inspectRecipe.category]?.text}`}>
                  {inspectRecipe.category} • Tier {inspectRecipe.tier}
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-b border-slate-800/80 py-4 my-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Верстак / Станция:</span>
                <span className="font-semibold text-slate-200">{inspectRecipe.craftStation}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Базовое время:</span>
                <span className="font-semibold text-amber-400 font-mono">{inspectRecipe.craftTimeSec} сек.</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Выход за 1 крафт:</span>
                <span className="font-semibold text-cyan-400 font-mono">x{inspectRecipe.outputYield}</span>
              </div>
            </div>

            <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Требуемые ресурсы:</h4>
            <div className="space-y-1.5">
              {inspectRecipe.inputs.map(input => (
                <div key={input.itemId} className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800/60 text-xs">
                  <span className="text-slate-300 flex items-center gap-2">
                    <span>{INITIAL_ITEMS[input.itemId]?.icon}</span>
                    <span>{INITIAL_ITEMS[input.itemId]?.name}</span>
                  </span>
                  <span className="font-bold font-mono text-cyan-400">x{input.amount}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setInspectRecipe(null)}
              className="mt-6 w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

    </div>
  );
}


// Calculate tree max depth helper
function getCraftTreeDepth(node) {
  if (!node || !node.children || node.children.length === 0) return 1;
  return 1 + Math.max(...node.children.map(getCraftTreeDepth));
}

// Tree Node UI component with connecting SVG lines
function TreeNodeView({ node, onInspect }) {
  const catColor = CATEGORIES[node.category] || CATEGORIES.Medic;

  return (
    <div className="flex items-center gap-8 my-2">
      {/* Current Node Box */}
      <div
        className={`relative z-10 w-64 p-3.5 rounded-xl border backdrop-blur-md shadow-lg transition-all group hover:scale-[1.02] ${
          node.isBase
            ? 'bg-slate-900/90 border-slate-700/80 shadow-slate-950/50'
            : `${catColor.bg} ${catColor.border} shadow-cyan-950/20`
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-center text-xl shrink-0">
              {node.icon}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-slate-100 truncate group-hover:text-cyan-300 transition-colors">
                {node.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                {node.isBase ? (
                  <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded font-mono">
                    СЫРЬЁ
                  </span>
                ) : (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${catColor.bg} ${catColor.text}`}>
                    T{node.tier} • {node.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {!node.isBase && node.recipe && (
            <button
              onClick={() => onInspect(node.recipe)}
              className="p-1 text-slate-400 hover:text-slate-200 rounded bg-slate-900/60 border border-slate-800"
              title="Инфо рецепта"
            >
              <Info className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Quantities & Time Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <span>Нужно:</span>
            <span className="font-bold font-mono text-cyan-400 text-sm">x{node.amountNeeded}</span>
          </div>

          {!node.isBase && (
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-amber-400 font-mono">
                <Clock className="w-3 h-3" /> {node.totalCraftTime}с
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Children Sub-nodes */}
      {node.children && node.children.length > 0 && (
        <div className="relative flex flex-col justify-center space-y-4 pl-4 border-l-2 border-slate-800">
          {node.children.map((child) => (
            <div key={child.id} className="relative flex items-center">
              {/* Branch connecting bar */}
              <div className="absolute -left-4 w-4 h-0.5 bg-slate-800" />
              <TreeNodeView node={child} onInspect={onInspect} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}