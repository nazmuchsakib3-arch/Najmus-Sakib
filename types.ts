
export type HistoryItem = {
  expression: string;
  result: string;
  timestamp: number;
};

export type Theme = 'light' | 'dark';

export interface CalculatorState {
  display: string;
  expression: string;
  history: HistoryItem[];
  isScientific: boolean;
  theme: Theme;
}
