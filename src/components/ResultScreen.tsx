import React, { useState } from 'react';

interface ResultScreenProps {
  continueCount: number;
  onBackToHome: () => void;
  onRevival?: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ continueCount, onBackToHome, onRevival }) => {
  const [showRevivalEffect, setShowRevivalEffect] = useState(false);

  const handleHomeClick = () => {
    if (onRevival && Math.random() < 0.2) {
      // 20% chance of revival
      setShowRevivalEffect(true);
      setTimeout(() => {
        setShowRevivalEffect(false);
        onRevival();
      }, 2000);
    } else {
      onBackToHome();
    }
  };

  return (
    <div className="result-screen">
      {showRevivalEffect && (
        <div className="revival-overlay">
          <div className="revival-text">復活！</div>
        </div>
      )}
      
      <h1>ゲーム終了</h1>
      
      <div className="result-content">
        <div className="result-label">継続回数</div>
        <div className="result-value">{continueCount}回</div>
      </div>

      <div className="result-message">
        {continueCount === 0 && 'また挑戦してね！'}
        {continueCount > 0 && continueCount <= 5 && 'なかなか良い結果です！'}
        {continueCount > 5 && continueCount <= 10 && 'すごい！よく頑張りました！'}
        {continueCount > 10 && '素晴らしい！最高の結果です！'}
      </div>

      <button className="back-button" onClick={handleHomeClick}>
        ホームに戻る
      </button>
    </div>
  );
};

export default ResultScreen;