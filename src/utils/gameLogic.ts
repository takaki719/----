import { Symbol } from '../types';

export const SYMBOLS: Symbol[] = ['🍒', '🍋', '🍇', '💎', '🔔', '🌠'];

const BASE_SYMBOL_WEIGHTS = {
  '🍒': 1,   // Fixed 5% occupancy rate
  '🍋': 23.75,
  '🍇': 23.75,
  '💎': 23.75,
  '🔔': 23.75,
  '🌠': 4.5,   // 0.5% chance (very rare for premium)
};

export function generateWeightedSymbol(): Symbol {
  const totalWeight = Object.values(BASE_SYMBOL_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (const [symbol, weight] of Object.entries(BASE_SYMBOL_WEIGHTS)) {
    random -= weight;
    if (random <= 0) {
      return symbol as Symbol;
    }
  }
  
  return '🍋'; // fallback
}

export function generateSpinResult(shouldIncludeCherry: boolean = false, shouldMakeSmallYaku: boolean = false): Symbol[] {
  if (shouldIncludeCherry) {
    const cherryCount = Math.random() < 0.3 ? 3 : (Math.random() < 0.5 ? 2 : 1);
    const result: Symbol[] = [];
    
    for (let i = 0; i < 3; i++) {
      if (i < cherryCount) {
        result.push('🍒');
      } else {
        result.push(generateWeightedSymbol());
      }
    }
    
    return result.sort(() => Math.random() - 0.5);
  }
  
  if (shouldMakeSmallYaku) {
    const yakuSymbol = SYMBOLS.filter(s => s !== '🍒')[Math.floor(Math.random() * 4)];
    return [yakuSymbol, yakuSymbol, yakuSymbol];
  }
  
  return [
    generateWeightedSymbol(),
    generateWeightedSymbol(),
    generateWeightedSymbol()
  ];
}

export function checkSmallYakuMatch(symbols: Symbol[]): boolean {
  if (symbols.length !== 3) return false;
  return symbols[0] === symbols[1] && symbols[1] === symbols[2] && symbols[0] !== '🍒' && symbols[0] !== '🌠';
}

export function countCherries(reels: (Symbol | null)[][]): number {
  let count = 0;
  for (const reel of reels) {
    for (const symbol of reel) {
      if (symbol === '🍒') count++;
    }
  }
  return count;
}

export function checkPremiumFlag(): boolean {
  // 1/319 chance for premium flag
  return Math.random() < 1;
}

export function generatePremiumFlag(): Symbol[] {
  return ['🌠', '🌠', '🌠'];
}

export function isPremiumFlag(symbols: Symbol[]): boolean {
  return symbols.length === 3 && symbols.every(s => s === '🌠');
}

export function generateGameRound(): Symbol[][] {
  const roll = Math.random();
  const results: Symbol[][] = [];
  
  if (roll < 0.10) {
    // 10% chance - include cherry
    for (let i = 0; i < 3; i++) {
      results.push(generateSpinResult(i === 0, false));
    }
  } else if (roll < 0.60) {
    // 50% chance - small yaku
    const yakuSpinIndex = Math.floor(Math.random() * 3);
    for (let i = 0; i < 3; i++) {
      results.push(generateSpinResult(false, i === yakuSpinIndex));
    }
  } else {
    // 40% chance - random
    for (let i = 0; i < 3; i++) {
      results.push(generateSpinResult(false, false));
    }
  }
  
  return results;
}