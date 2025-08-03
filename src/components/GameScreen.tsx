import React, { useState, useEffect, useCallback } from 'react';
import { Symbol, ContinueRate } from '../types';
import { generateWeightedSymbol, countCherries, checkSmallYakuMatch, checkPremiumFlag, generatePremiumFlag, isPremiumFlag } from '../utils/gameLogic';
import DrinkModal from './DrinkModal';
import PremiumModal from './PremiumModal';

interface GameScreenProps {
  continueRate: ContinueRate;
  onGameEnd: (continueCount: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ continueRate, onGameEnd }) => {
  const [remainingStops, setRemainingStops] = useState(9);
  const [continueCount, setContinueCount] = useState(0);
  const [reels, setReels] = useState<Symbol[]>([null, null, null]);
  const [isSpinning, setIsSpinning] = useState<boolean[]>([false, false, false]);
  const [currentSpinIndex, setCurrentSpinIndex] = useState(0);
  const [showDrinkModal, setShowDrinkModal] = useState(false);
  const [drinkCount, setDrinkCount] = useState(0);
  const [showRushEffect, setShowRushEffect] = useState(false);
  const [rushNumber, setRushNumber] = useState(0);
  const [allSpinResults, setAllSpinResults] = useState<Symbol[][]>([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    setAllSpinResults([]);
    setRemainingStops(9);
    setCurrentSpinIndex(0);
    setReels([null, null, null]);
    setIsSpinning([false, false, false]);
    setShowGameOver(false);
    startSpin(0);
  };

  const startSpin = (spinIndex: number) => {
    if (spinIndex >= 3) return;
    
    setCurrentSpinIndex(spinIndex);
    setIsSpinning([true, true, true]);
    
    // Show spinning symbols
    setReels(['❓', '❓', '❓']);
  };

  const stopReel = useCallback((reelIndex: number) => {
    if (!isSpinning[reelIndex]) return;
    
    // Normal symbol generation with continue rate
    const newSymbol = generateWeightedSymbol(continueRate);
    
    const newReels = [...reels];
    newReels[reelIndex] = newSymbol;
    setReels(newReels);
    
    const newSpinning = [...isSpinning];
    newSpinning[reelIndex] = false;
    setIsSpinning(newSpinning);
    setRemainingStops(remainingStops - 1);
    
    // Check if all reels for current spin are stopped
    if (newSpinning.every(s => !s)) {
      // Save current spin result
      const newAllSpinResults = [...allSpinResults, newReels];
      setAllSpinResults(newAllSpinResults);
      
      // Check if current spin has cherry or small yaku
      const hasCherry = newReels.includes('🍒');
      const hasSmallYaku = checkSmallYakuMatch(newReels);
      
      if (hasCherry || hasSmallYaku) {
        // Found winning combination, end round immediately
        setTimeout(() => {
          checkRoundResult(newAllSpinResults);
        }, 300);
      } else {
        // Continue to next spin or check final results
        setTimeout(() => {
          if (currentSpinIndex < 2) {
            // Start next spin
            startSpin(currentSpinIndex + 1);
          } else {
            // All spins completed, check for continuation rate
            checkRoundResult(newAllSpinResults);
          }
        }, 300);
      }
    }
  }, [isSpinning, remainingStops, reels, currentSpinIndex, allSpinResults, continueRate]);

  const checkRoundResult = (finalSpinResults: Symbol[][]) => {
    let cherryCount = 0;
    let hasSmallYaku = false;
    let hasPremiumFlag = false;
    
    // Check all spin results
    for (const spinResult of finalSpinResults) {
      // Count cherries
      cherryCount += spinResult.filter(s => s === '🍒').length;
      
      // Check for small yaku
      if (checkSmallYakuMatch(spinResult)) {
        hasSmallYaku = true;
      }
      
      // Check for premium flag (🌠🌠🌠)
      if (isPremiumFlag(spinResult)) {
        hasPremiumFlag = true;
      }
    }
    
    if (hasPremiumFlag) {
      // Premium flag appeared - show premium modal
      setShowPremiumModal(true);
    } else if (cherryCount > 0) {
      // Cherry appeared - guaranteed continue
      if (cherryCount >= 3) {
        // 3+ cherries - guaranteed drink modal
        setDrinkCount(cherryCount);
        setShowDrinkModal(true);
      } else if (cherryCount >= 2) {
        // 2 cherries - 30% chance for drink modal
        if (Math.random() < 0.3) {
          setDrinkCount(cherryCount);
          setShowDrinkModal(true);
        } else {
          showBlackoutAndProceed();
        }
      } else {
        showBlackoutAndProceed();
      }
    } else if (hasSmallYaku) {
      // Small yaku appeared - guaranteed continue
      if (Math.random() < 0.2) {
        setDrinkCount(1);
        setShowDrinkModal(true);
      } else {
        showBlackoutAndProceed();
      }
    } else {
      // No special symbols - use continue rate
      if (Math.random() < continueRate) {
        showBlackoutAndProceed();
      } else {
        // Outside continue rate - game over
        showBlackoutAndEnd();
      }
    }
  };

  const showBlackoutAndProceed = () => {
    const newCount = continueCount + 1;
    setShowRushEffect(true);
    setShowGameOver(false);
    setContinueCount(newCount);
    setRushNumber(newCount + 1); // RUSH display starts from 2
    
    // Show RUSH for 2 seconds
    setTimeout(() => {
      setShowRushEffect(false);
      startNewRound();
    }, 2000);
  };

  const showBlackoutAndEnd = () => {
    setShowRushEffect(true);
    setShowGameOver(true);
    
    // Show "Game Over" for 2 seconds then end
    setTimeout(() => {
      setShowRushEffect(false);
      setShowGameOver(false);
      onGameEnd(continueCount);
    }, 2000);
  };

  const proceedToNextRound = () => {
    showBlackoutAndProceed();
  };

  const handleDrinkModalClose = () => {
    setShowDrinkModal(false);
    // Show blackout after drink modal closes
    showBlackoutAndProceed();
  };

  const handlePremiumModalClose = () => {
    setShowPremiumModal(false);
    // Premium flag guarantees continuation
    showBlackoutAndProceed();
  };

  // Handle Space key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault(); // Prevent page scroll
        
        // Find the first spinning reel from left to right
        const firstSpinningIndex = isSpinning.findIndex(spinning => spinning);
        
        if (firstSpinningIndex !== -1) {
          stopReel(firstSpinningIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSpinning, stopReel]);

  return (
    <div className="game-screen">
      {showRushEffect && (
        <div className="rush-overlay">
          {showGameOver ? (
            <div className="game-over-text">ゲーム終了</div>
          ) : rushNumber > 0 ? (
            <div className="rush-text">RUSH {rushNumber}</div>
          ) : (
            <div className="game-over-text">ゲーム終了</div>
          )}
        </div>
      )}
      
      <div className="game-header">
        <div className="continue-count">継続: {continueCount}回</div>
        <div className="remaining-stops">残り: {remainingStops}回</div>
      </div>

      <div className="slot-machine">
        {reels.map((symbol, reelIndex) => (
          <div key={reelIndex} className="reel-container">
            <div className="reel">
              <div className={`symbol ${isSpinning[reelIndex] ? 'spinning' : ''}`}>
                {symbol || '❓'}
              </div>
            </div>
            <button
              className="stop-button"
              onClick={() => stopReel(reelIndex)}
              disabled={!isSpinning[reelIndex]}
            >
              STOP
            </button>
          </div>
        ))}
      </div>
      
      {isSpinning.some(s => s) && (
        <div className="enter-hint">Press SPACE to stop reel (left to right)</div>
      )}

      {showDrinkModal && (
        <DrinkModal
          drinkCount={drinkCount}
          onClose={handleDrinkModalClose}
        />
      )}

      {showPremiumModal && (
        <PremiumModal
          onClose={handlePremiumModalClose}
        />
      )}
    </div>
  );
};

export default GameScreen;