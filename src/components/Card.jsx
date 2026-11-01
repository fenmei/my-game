import React from 'react';

export default function Card({ card, onClick, disabled }) {
  const { isFlipped, isMatched, isMismatch, icon, name, gradient, shadowColor } = card;

  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`card-wrapper ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${
        isMismatch ? 'mismatch' : ''
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isMatched ? -1 : 0}
      role="button"
      aria-label={isFlipped || isMatched ? `${name} 卡牌` : '未翻開的卡牌'}
      aria-pressed={isFlipped}
    >
      <div className="card-inner">
        {/* Card Back (hidden state) */}
        <div className="card-face card-back">
          <div className="card-pattern">
            <div className="pattern-circle"></div>
            <div className="pattern-inner-diamond">
              <span className="pattern-symbol">✦</span>
            </div>
          </div>
          <div className="card-glow-reflection"></div>
        </div>

        {/* Card Front (revealed state) */}
        <div
          className="card-face card-front"
          style={{
            '--card-gradient': gradient,
            '--card-shadow': shadowColor,
          }}
        >
          <div className="card-front-content">
            <div className="card-icon">{icon}</div>
            <span className="card-name">{name}</span>
          </div>

          {isMatched && (
            <div className="matched-badge" title="已消除">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
