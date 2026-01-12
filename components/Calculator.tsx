
import React, { useState, useCallback, useEffect } from 'react';
import { History as HistoryIcon, Sun, Moon, ArrowLeftRight } from 'lucide-react';
import * as math from 'mathjs';
import { HistoryItem, Theme } from '../types';
import Display from './Display';
import Keypad from './Keypad';
import History from './History';

interface CalculatorProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ theme, toggleTheme }) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isScientific, setIsScientific] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVibrate = () => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch (e) {
        // Safe catch for browsers that might block vibration
      }
    }
  };

  const calculate = useCallback((expr: string) => {
    if (!expr) return null;
    try {
      // Basic validation for division by zero
      if (/\/0(?!\d)/.test(expr)) {
        throw new Error("Division by Zero");
      }
      
      const sanitizedExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
      const evalResult = math.evaluate(sanitizedExpr);
      
      let formattedResult: string;
      if (typeof evalResult === 'number') {
        formattedResult = Number.isInteger(evalResult) 
          ? evalResult.toString() 
          : parseFloat(evalResult.toFixed(8)).toString();
      } else if (evalResult && typeof evalResult.toString === 'function') {
        formattedResult = evalResult.toString();
      } else {
        formattedResult = String(evalResult);
      }
      
      setResult(formattedResult);
      setError(null);
      return formattedResult;
    } catch (err: any) {
      // Silence errors during typing for a smoother live preview experience
      setResult(null);
      return null;
    }
  }, []);

  const handleInput = (val: string) => {
    handleVibrate();
    setError(null);

    if (val === 'AC') {
      setExpression('');
      setResult(null);
      return;
    }

    if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
      return;
    }

    if (val === '=') {
      try {
        const sanitizedExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
        const evalResult = math.evaluate(sanitizedExpr);
        
        let finalResult: string;
        if (typeof evalResult === 'number') {
          finalResult = Number.isInteger(evalResult) 
            ? evalResult.toString() 
            : parseFloat(evalResult.toFixed(8)).toString();
        } else {
          finalResult = evalResult.toString();
        }

        const newItem: HistoryItem = {
          expression,
          result: finalResult,
          timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev].slice(0, 10));
        setExpression(finalResult);
        setResult(null);
      } catch (err: any) {
        setError(err.message || 'Invalid Expression');
      }
      return;
    }

    setExpression(prev => prev + val);
  };

  const copyToClipboard = () => {
    const textToCopy = result || expression;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      handleVibrate();
    }
  };

  useEffect(() => {
    // Attempt real-time calculation only if the expression doesn't end with an operator
    if (expression && !/[\+\-\×\÷\(\%\.\^]$/.test(expression)) {
        calculate(expression);
    } else {
        setResult(null);
    }
  }, [expression, calculate]);

  return (
    <div className="relative w-full max-w-md h-[780px] sm:h-[720px] bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800 transition-colors">
      
      {/* Header Controls */}
      <div className="px-8 pt-8 flex items-center justify-between z-10">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
          title="History"
        >
          <HistoryIcon size={20} />
        </button>

        <div className="flex gap-2">
           <button 
            onClick={() => setIsScientific(!isScientific)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${isScientific ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}
          >
            <ArrowLeftRight size={14} />
            {isScientific ? 'Scientific' : 'Basic'}
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      {/* Output Display */}
      <div className="flex-1 flex flex-col justify-end px-8 py-6">
        <Display 
          expression={expression} 
          result={result} 
          error={error} 
          onCopy={copyToClipboard}
        />
      </div>

      {/* Input Keypad */}
      <div className="px-6 pb-8">
        <Keypad 
          isScientific={isScientific} 
          onInput={handleInput} 
        />
      </div>

      {/* History Slide-over Layer */}
      {showHistory && (
        <History 
          items={history} 
          onClose={() => setShowHistory(false)} 
          onSelect={(item) => {
            setExpression(item.expression);
            setShowHistory(false);
          }}
          onClear={() => setHistory([])}
        />
      )}
    </div>
  );
};

export default Calculator;
