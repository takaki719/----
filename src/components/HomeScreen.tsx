import React from 'react';
import { GameMode, ContinueRate } from '../types';

interface HomeScreenProps {
  onStart: (mode: GameMode, rate: ContinueRate) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const [selectedMode, setSelectedMode] = React.useState<GameMode>('continue');
  const [selectedRate, setSelectedRate] = React.useState<ContinueRate>(0.7);

  const handleStart = () => {
    onStart(selectedMode, selectedRate);
  };

  return (
    <div className="home-screen">
      <h1 className="game-title">🎰 スロットゲーム</h1>
      
      <div className="selection-group">
        <h2>モード選択</h2>
        <div className="mode-buttons">
          <button 
            className={selectedMode === 'continue' ? 'selected' : ''}
            onClick={() => setSelectedMode('continue')}
          >
            継続モード
          </button>
          <button 
            className="disabled"
            disabled
          >
            チャレンジモード（準備中）
          </button>
        </div>
      </div>

      <div className="selection-group">
        <h2>継続率選択</h2>
        <div className="rate-buttons">
          {[0.29, 0.5, 0.7, 0.81, 0.9, 0.99].map((rate) => (
            <button
              key={rate}
              className={selectedRate === rate ? 'selected' : ''}
              onClick={() => setSelectedRate(rate as ContinueRate)}
            >
              {Math.round(rate * 100)}%
            </button>
          ))}
        </div>
      </div>

      <button className="start-button" onClick={handleStart}>
        ゲーム開始
      </button>
    </div>
  );
};

export default HomeScreen;