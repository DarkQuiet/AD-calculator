import React, { useState } from 'react';
import type { CraftedTreeNode } from '../types/crafting';
import { ChevronRight, ChevronDown, Package } from 'lucide-react';

interface CraftedTreeItemViewProps {
  node: CraftedTreeNode;
  depth?: number;
  excludedItemIds: Record<string, boolean>;
  onToggle: (itemId: string) => void;
}

export const CraftedTreeItemView: React.FC<CraftedTreeItemViewProps> = ({
  node,
  depth = 0,
  excludedItemIds,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isIncluded = !excludedItemIds[node.item.id];
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="space-y-1">
      <div
        className={`p-2 border rounded-xs flex items-center justify-between transition-colors ${
          isIncluded
            ? 'bg-[#0a0b0d] border-zinc-800/80'
            : 'bg-zinc-950/50 border-zinc-900 opacity-60'
        }`}
        style={{ marginLeft: `${depth * 16}px` }}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-2">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-0.5 text-zinc-500 hover:text-zinc-300 focus:outline-none flex-shrink-0"
              title={isOpen ? 'Свернуть' : 'Развернуть'}
            >
              {isOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-orange-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
              )}
            </button>
          ) : (
            <div className="w-3.5 flex-shrink-0 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 block" />
            </div>
          )}

          <label className="flex items-center gap-2 min-w-0 cursor-pointer select-none flex-1">
            <input
              type="checkbox"
              checked={isIncluded}
              onChange={() => onToggle(node.item.id)}
              className="w-3.5 h-3.5 accent-orange-600 rounded cursor-pointer flex-shrink-0"
            />
            <Package className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
            <span
              className={`text-xs font-mono uppercase truncate ${
                isIncluded ? 'text-zinc-300' : 'text-zinc-500 line-through'
              }`}
              title={node.item.name}
            >
              {node.item.name}
            </span>
          </label>
        </div>

        <span
          className={`text-xs font-mono font-bold flex-shrink-0 ${
            isIncluded ? 'text-orange-400' : 'text-zinc-600'
          }`}
        >
          x{node.amount}
        </span>
      </div>

      {hasChildren && isOpen && (
        <div className="space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-2 before:w-[1px] before:bg-zinc-800/60">
          {node.children.map((child, idx) => (
            <CraftedTreeItemView
              key={`${child.item.id}-${idx}`}
              node={child}
              depth={depth + 1}
              excludedItemIds={excludedItemIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};
