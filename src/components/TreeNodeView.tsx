import React, { useState } from 'react';
import type { TreeNode, CraftTier } from '../types/crafting';
import { Clock, ShieldAlert, ChevronRight, ChevronDown, Box, Wrench, Flame, RefreshCw } from 'lucide-react';

interface Props {
    node: TreeNode;
    isRoot?: boolean;
    depth?: number;
    onComponentTierChange?: (itemId: string, tier: CraftTier) => void;
}

export const TreeNodeView: React.FC<Props> = ({
    node,
    isRoot = false,
    depth = 0,
    onComponentTierChange
}) => {
    const [expandedInputs, setExpandedInputs] = useState<Record<number, boolean>>({});

    const toggleExpand = (index: number) => {
        setExpandedInputs((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const matchYield = node.recipeName.match(/x(\d+)/i);
    const baseYieldPerCraft = matchYield ? parseInt(matchYield[1], 10) : 1;
    const nodeCraftsCount = Math.ceil(node.craftedAmount / (baseYieldPerCraft || 1));

    return (
        <div className={`my-2 font-mono border rounded-none text-xs transition-all ${isRoot
                ? 'bg-[#121419] border-orange-600/80 shadow-lg shadow-orange-950/20'
                : 'bg-[#0f1115] border-zinc-800'
            }`}>
            {/* 1. ШАПКА УЗЛА */}
            <div className={`px-3 py-2 flex items-center justify-between border-b gap-2 ${isRoot
                    ? 'bg-orange-950/30 border-orange-600/40'
                    : 'bg-[#161920] border-zinc-800'
                }`}>
                <div className="flex items-center gap-2 min-w-0 flex-wrap">
                    {isRoot ? (
                        <Flame className="w-4 h-4 text-orange-500 flex-shrink-0 animate-pulse" />
                    ) : (
                        <Wrench className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    )}

                    <span className={`font-bold uppercase tracking-wider truncate text-xs ${isRoot ? 'text-orange-400' : 'text-zinc-200'
                        }`}>
                        {node.recipeName}
                    </span>

                    <span className="text-[10px] px-1.5 py-0.2 font-bold bg-zinc-900 text-zinc-300 border border-zinc-700">
                        x{node.craftedAmount} шт.
                    </span>

                    <span className="text-[10px] px-1.5 py-0.2 font-bold bg-amber-950/80 text-amber-300 border border-amber-600/50 flex items-center gap-1 font-mono">
                        <RefreshCw className="w-2.5 h-2.5 text-amber-400" />
                        {nodeCraftsCount} {nodeCraftsCount === 1 ? 'крафт' : nodeCraftsCount < 5 ? 'крафта' : 'крафтов'}
                    </span>

                    <span className="text-[9px] px-1.5 py-0.2 font-bold bg-zinc-900/90 text-amber-500/90 border border-amber-600/30">
                        T{node.tier}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-zinc-400 text-[10px] flex-shrink-0">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {node.timeSec}s
                    </span>
                    <span className="flex items-center gap-1 text-red-400 font-bold">
                        <ShieldAlert className="w-3 h-3" />
                        -{node.durabilityCost} HP
                    </span>
                </div>
            </div>

            {/* 2. ИНГРЕДИЕНТЫ */}
            {node.inputs && node.inputs.length > 0 && (
                <div className="p-2 space-y-1.5 bg-[#0a0b0e]">
                    {node.inputs.map((input, idx) => {
                        const isCraftable = !input.item.isBase && Boolean(input.subNode);
                        const isExpanded = Boolean(expandedInputs[idx]);

                        const inputMatch = input.subNode?.recipeName.match(/x(\d+)/i);
                        const yieldPerCraft = inputMatch ? parseInt(inputMatch[1], 10) : (input.subNode?.craftedAmount || 1);
                        const craftsNeeded = isCraftable ? Math.ceil(input.amount / yieldPerCraft) : 0;

                        return (
                            <div key={idx} className="space-y-1.5">
                                <div className={`flex items-center justify-between p-1.5 border transition-colors select-none ${isCraftable
                                        ? 'bg-[#14171e] hover:bg-[#1a1e27] border-orange-500/30'
                                        : 'bg-[#0e1014] border-zinc-800/60'
                                    }`}>
                                    <div
                                        onClick={() => isCraftable && toggleExpand(idx)}
                                        className="flex items-center gap-2 min-w-0 cursor-pointer flex-1"
                                    >
                                        {isCraftable ? (
                                            isExpanded ? (
                                                <ChevronDown className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                            )
                                        ) : (
                                            <span className="w-4 h-4 flex-shrink-0" />
                                        )}

                                        {isCraftable ? (
                                            <Wrench className="w-3.5 h-3.5 text-orange-400/80 flex-shrink-0" />
                                        ) : (
                                            <Box className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                                        )}

                                        <span className={`uppercase font-bold text-[11px] truncate ${isCraftable ? 'text-zinc-100' : 'text-zinc-400'
                                            }`}>
                                            {input.item.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className={`font-bold text-[11px] ${isCraftable ? 'text-orange-400' : 'text-zinc-300'
                                            }`}>
                                            x{input.amount} шт.
                                        </span>

                                        {/* СЕЛЕКТОР ТИРА ДЛЯ КОМПОНЕНТА */}
                                        {isCraftable && input.availableTiers && input.availableTiers.length > 1 && (
                                            <div className="flex items-center gap-1 bg-zinc-950 p-0.5 border border-zinc-800 rounded-xs">
                                                {input.availableTiers.map(t => {
                                                    const isSelected = input.subNode?.tier === t;
                                                    return (
                                                        <button
                                                            key={t}
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                if (onComponentTierChange) {
                                                                    onComponentTierChange(input.item.id, t);
                                                                }
                                                            }}
                                                            className={`px-1.5 py-0.5 text-[9px] font-mono font-bold transition rounded-xs ${isSelected
                                                                    ? 'bg-orange-600 text-black shadow'
                                                                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700'
                                                                }`}
                                                        >
                                                            T{t}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {isCraftable && (
                                            <span className="text-[9px] font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.2 border border-amber-600/40 font-mono flex items-center gap-1">
                                                <RefreshCw className="w-2.5 h-2.5 text-amber-400" />
                                                {craftsNeeded} {craftsNeeded === 1 ? 'крафт' : craftsNeeded < 5 ? 'крафта' : 'крафтов'}
                                            </span>
                                        )}

                                        {isCraftable ? (
                                            <span className="text-[9px] uppercase font-bold text-orange-400 bg-orange-950/50 px-1 py-0.2 border border-orange-600/40">
                                                Крафт
                                            </span>
                                        ) : (
                                            <span className="text-[9px] uppercase text-emerald-400 bg-emerald-950/30 px-1 py-0.2 border border-emerald-600/30">
                                                Сырьё
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {isCraftable && isExpanded && input.subNode && (
                                    <div className="pl-3 border-l-2 border-orange-500/40 ml-2 my-1">
                                        <TreeNodeView
                                            node={input.subNode}
                                            depth={depth + 1}
                                            onComponentTierChange={onComponentTierChange}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};