import React from 'react';

interface DrinkModalProps {
  drinkCount: number;
  onClose: () => void;
}

const DrinkModal: React.FC<DrinkModalProps> = ({ drinkCount, onClose }) => {
  const drinkEmojis = '🍺'.repeat(drinkCount);

  return (
    <div className="modal-overlay">
      <div className="modal-content drink-modal">
        <h2>おめでとう！</h2>
        <div className="drink-display">
          {drinkEmojis}
        </div>
        <p className="drink-message">
          {drinkCount === 3 ? '大当たり！継続確定！' : '継続確定！'}
        </p>
        <button className="toast-button" onClick={onClose}>
          🍻 乾杯！
        </button>
      </div>
    </div>
  );
};

export default DrinkModal;