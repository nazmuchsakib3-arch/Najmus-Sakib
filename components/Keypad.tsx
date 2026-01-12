
import React from 'react';

interface KeypadProps {
  isScientific: boolean;
  onInput: (val: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ isScientific, onInput }) => {
  const basicKeys = [
    { label: 'AC', type: 'function', val: 'AC' },
    { label: 'DEL', type: 'function', val: 'DEL' },
    { label: '%', type: 'operator', val: '%' },
    { label: '÷', type: 'operator', val: '÷' },
    { label: '7', type: 'number', val: '7' },
    { label: '8', type: 'number', val: '8' },
    { label: '9', type: 'number', val: '9' },
    { label: '×', type: 'operator', val: '×' },
    { label: '4', type: 'number', val: '4' },
    { label: '5', type: 'number', val: '5' },
    { label: '6', type: 'number', val: '6' },
    { label: '-', type: 'operator', val: '-' },
    { label: '1', type: 'number', val: '1' },
    { label: '2', type: 'number', val: '2' },
    { label: '3', type: 'number', val: '3' },
    { label: '+', type: 'operator', val: '+' },
    { label: '0', type: 'number', val: '0', span: 2 },
    { label: '.', type: 'number', val: '.' },
    { label: '=', type: 'equal', val: '=' },
  ];

  const scientificKeys = [
    { label: 'sin', val: 'sin(' },
    { label: 'cos', val: 'cos(' },
    { label: 'tan', val: 'tan(' },
    { label: 'log', val: 'log10(' },
    { label: '√', val: 'sqrt(' },
    { label: 'x²', val: '^2' },
    { label: '(', val: '(' },
    { label: ')', val: ')' },
  ];

  const getKeyStyles = (type: string) => {
    switch (type) {
      case 'operator':
        return 'bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-zinc-700';
      case 'function':
        return 'bg-zinc-50 dark:bg-zinc-800 text-rose-500 dark:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-bold';
      case 'equal':
        return 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none';
      default:
        return 'bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-medium';
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {isScientific && (
        <div className="grid grid-cols-4 col-span-4 gap-3 mb-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          {scientificKeys.map((key) => (
            <button
              key={key.label}
              onClick={() => onInput(key.val)}
              className="h-10 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-all flex items-center justify-center"
            >
              {key.label}
            </button>
          ))}
        </div>
      )}
      
      {basicKeys.map((key) => (
        <button
          key={key.label}
          onClick={() => onInput(key.val)}
          className={`
            ${key.span ? 'col-span-2' : 'col-span-1'}
            h-16 sm:h-14 flex items-center justify-center rounded-2xl text-xl sm:text-lg transition-all duration-100 active:scale-95
            ${getKeyStyles(key.type || 'number')}
          `}
        >
          {key.label}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
