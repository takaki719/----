import React, { useState, useEffect } from 'react';

interface PremiumModalProps {
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  const [phase, setPhase] = useState<'selecting' | 'blackout' | 'result'>('selecting');
  const [selectedOption, setSelectedOption] = useState<'everyone' | 'self' | null>(null);
  const [flashingOption, setFlashingOption] = useState<'everyone' | 'self'>('everyone');

  useEffect(() => {
    let flashInterval: number;
    
    const startFlashing = (speed: number) => {
      clearInterval(flashInterval);
      flashInterval = setInterval(() => {
        setFlashingOption(prev => prev === 'everyone' ? 'self' : 'everyone');
      }, speed);
    };

    // Start with slow speed
    startFlashing(800);

    // Speed acceleration schedule
    const speedUp1 = setTimeout(() => {
      startFlashing(600);
    }, 2000);

    const speedUp2 = setTimeout(() => {
      startFlashing(400);
    }, 4000);

    const speedUp3 = setTimeout(() => {
      startFlashing(200);
    }, 6000);

    const speedUp4 = setTimeout(() => {
      startFlashing(100);
    }, 7500);

    // Start blackout after 8.5 seconds
    const blackoutTimer = setTimeout(() => {
      clearInterval(flashInterval);
      setPhase('blackout');
      
      // Show result after 2 seconds of blackout
      setTimeout(() => {
        const result = Math.random() < 0.5 ? 'everyone' : 'self';
        setSelectedOption(result);
        setPhase('result');
        
        // Close modal after 3 seconds (longer display)
        setTimeout(() => {
          onClose();
        }, 3000);
      }, 2000);
    }, 8500);

    return () => {
      clearInterval(flashInterval);
      clearTimeout(speedUp1);
      clearTimeout(speedUp2);
      clearTimeout(speedUp3);
      clearTimeout(speedUp4);
      clearTimeout(blackoutTimer);
    };
  }, [onClose]);

  return (
    <div className="premium-overlay">
      <div className="premium-content">
        {phase !== 'blackout' && (
          <div className="premium-title">🌠 プレミアム 🌠</div>
        )}
        
        {phase === 'selecting' && (
          <div className="premium-options">
            <div className={`premium-option ${flashingOption === 'everyone' ? 'flashing' : 'dimmed'}`}>
              みんなが2杯飲む
            </div>
            <div className="premium-vs">VS</div>
            <div className={`premium-option ${flashingOption === 'self' ? 'flashing' : 'dimmed'}`}>
              自分が2杯飲む
            </div>
          </div>
        )}

        {phase === 'blackout' && (
          <div className="premium-blackout">
            {/* Complete darkness - no content */}
          </div>
        )}

        {phase === 'result' && (
          <div className="premium-result">
            <div className="result-label">結果発表！</div>
            <div className={`premium-option winner`}>
              {selectedOption === 'everyone' ? 'みんなが2杯飲む' : '自分が2杯飲む'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumModal;