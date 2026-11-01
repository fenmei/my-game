import React, { useState } from 'react';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function VictoryModal({
  isOpen,
  timer,
  moves,
  bestScore,
  isNewBest,
  onRestart,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Rating algorithm
  // Perfect: <= 12 moves -> 3 stars
  // Good: <= 18 moves -> 2 stars
  // Passed: > 18 moves -> 1 star
  const stars = moves <= 12 ? 3 : moves <= 18 ? 2 : 1;

  const handleShare = () => {
    const text = `🍓 我在「水果記憶翻牌」中完成挑戰！\n⏱️ 耗時：${formatTime(
      timer
    )}\n👣 步數：${moves} 步\n⭐ 評級：${'⭐'.repeat(stars)}\n快來挑戰打破我的紀錄！`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="victory-card-modal">
        {/* Glow ambient background effect */}
        <div className="modal-glow"></div>

        {/* Big Celebration Icon */}
        <div className="victory-icon-container">
          <div className="trophy-bounce">🏆</div>
        </div>

        {/* Title */}
        <h2 className="victory-title">完成！恭喜通關</h2>
        <p className="victory-subtitle">所有 16 張水果卡牌已全數配對消除</p>

        {isNewBest ? (
          <div className="new-record-badge">
            <span className="badge-sparkle">✨</span> 🎉 恭喜刷新歷史最佳紀錄！ <span className="badge-sparkle">✨</span>
          </div>
        ) : bestScore ? (
          <div className="best-record-banner">
            🏆 歷史最佳：{bestScore.moves} 步 ({formatTime(bestScore.time)})
          </div>
        ) : null}

        {/* Star Rating */}
        <div className="star-rating-container" title={`${stars} 星評價`}>
          {[1, 2, 3].map((starIndex) => (
            <span
              key={starIndex}
              className={`rating-star ${starIndex <= stars ? 'active' : 'inactive'}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Stats summary grid */}
        <div className="victory-stats-grid">
          <div className="victory-stat-item">
            <span className="victory-stat-name">⏱️ 本局耗時</span>
            <span className="victory-stat-number font-mono">{formatTime(timer)}</span>
          </div>
          <div className="victory-stat-item">
            <span className="victory-stat-name">👣 本局步數</span>
            <span className="victory-stat-number font-mono">{moves} 步</span>
          </div>
          <div className="victory-stat-item">
            <span className="victory-stat-name">🏆 最佳紀錄</span>
            <span className="victory-stat-number font-mono">
              {bestScore ? `${bestScore.moves} 步` : `${moves} 步`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-action-buttons">
          <button
            id="btn-restart-game"
            className="action-btn primary-btn pulse-glow"
            onClick={onRestart}
            autoFocus
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            重新開始
          </button>

          <button
            id="btn-share-record"
            className="action-btn secondary-btn"
            onClick={handleShare}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
            {copied ? '已複製戰績！' : '分享成績'}
          </button>
        </div>
      </div>
    </div>
  );
}
