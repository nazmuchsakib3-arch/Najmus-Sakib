
import React from 'react';
import { Copy } from 'lucide-react';

interface DisplayProps {
  expression: string;
  result: string | null;
  error: string | null;
  onCopy: () => void;
}

const Display: React.FC<DisplayProps> = ({ expression, result, error, onCopy }) => {
  return (
    <div className="text-right flex flex-col items-end gap-1">
      <div className="w-full relative group">
        <div className="flex items-center justify-end overflow-hidden">
             <div className="mono text-2xl text-zinc-400 dark:text-zinc-500 min-h-[2rem] whitespace-nowrap overflow-x-auto scrollbar-hide">
                {expression || '0'}
            </div>
        </div>
      </div>
      
      <div className="w-full flex items-center justify-between mt-2">
        <button 
            onClick={onCopy}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
            title="Copy result"
        >
            <Copy size={16} />
        </button>
        <div className={`mono text-5xl font-semibold tracking-tight overflow-hidden text-ellipsis ${error ? 'text-red-500 text-2xl' : 'text-zinc-800 dark:text-white'}`}>
            {error ? error : (result ? `= ${result}` : '')}
        </div>
      </div>
    </div>
  );
};

export default Display;
