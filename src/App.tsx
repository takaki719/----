import React, { useState } from 'react';
import { GameScreen as GameScreenType, GameMode, ContinueRate } from './types';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreenType>('home');
  const [gameMode, setGameMode] = useState<GameMode>('continue');
  const [continueRate, setContinueRate] = useState<ContinueRate>(0.9);
  const [finalContinueCount, setFinalContinueCount] = useState(0);

  const handleGameStart = (mode: GameMode, rate: ContinueRate) => {
    setGameMode(mode);
    setContinueRate(rate);
    setCurrentScreen('game');
  };

  const handleGameEnd = (continueCount: number) => {
    setFinalContinueCount(continueCount);
    setCurrentScreen('result');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleRevival = () => {
    setCurrentScreen('game');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomeScreen onStart={handleGameStart} />
      )}
      {currentScreen === 'game' && (
        <GameScreen
          continueRate={continueRate}
          onGameEnd={handleGameEnd}
        />
      )}
      {currentScreen === 'result' && (
        <ResultScreen
          continueCount={finalContinueCount}
          onBackToHome={handleBackToHome}
          onRevival={handleRevival}
        />
      )}
    </>
  );
}

export default App;