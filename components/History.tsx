
import React from 'react';
import { Trash2, X } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryProps {
  items: HistoryItem[];
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ items, onClose, onSelect, onClear }) => {
  return (
    <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md z-20 flex flex-col p-8 transition-all duration-300 animate-in slide-in-from-bottom">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white">History</h2>
        <div className="flex gap-4">
            <button onClick={onClear} className="p-2 text-zinc-400 hover:text-rose-500 transition-colors">
                <Trash2 size={20} />
            </button>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
            <p className="text-sm">No recent calculations</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <button 
              key={item.timestamp + idx} 
              onClick={() => onSelect(item)}
              className="w-full text-right group"
            >
              <div className="mono text-sm text-zinc-400 group-hover:text-indigo-400 transition-colors truncate mb-1">
                {item.expression}
              </div>
              <div className="mono text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
                = {item.result}
              </div>
            </button>
          ))
        )}
      </div>
      
      <button 
        onClick={onClose}
        className="mt-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
};

export default History;
