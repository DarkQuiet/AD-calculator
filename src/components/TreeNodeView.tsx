import React from 'react';
import type { TreeNode } from '../types/crafting';
import { Clock, ShieldAlert, ChevronRight } from 'lucide-react';

interface Props {
    node: TreeNode;
    isRoot?: boolean;
}

export const TreeNodeView: React.FC<Props> = ({ node, isRoot = false }) => {
    return (
        <div className={`p-3 rounded-lg border text-sm transition-all ${isRoot
                ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                : 'bg-slate-800/80 border-slate-700/60'
            }`}>
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{node.recipeName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600">
                        x{node.craftedAmount}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                        T{node.tier}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{node.timeSec}s</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                        <span>-{node.durabilityCost} durability</span>
                    </div>
                </div>
            </div>

            {node.inputs.length > 0 && (
                <div className="mt-3 pl-3 border-l-2 border-slate-700 space-y-2">
                    {node.inputs.map((input, idx) => (
                        <div key={idx} className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <ChevronRight className="w-3 h-3 text-slate-500" />
                                <span>{input.item.name}:</span>
                                <span className="font-mono text-slate-200">{input.amount} шт.</span>
                                {input.item.isBase && (
                                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1 rounded border border-emerald-500/20">
                                        Raw Material
                                    </span>
                                )}
                            </div>
                            {input.subNode && (
                                <div className="ml-2 mt-1">
                                    <TreeNodeView node={input.subNode} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};