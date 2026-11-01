import React from 'react';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function StatsBar({
  timer,
  moves,
  matchedPairs,
  totalPairs,
  bestScore,
  onRestart,
  onResetBest,
}) {
  return (
    <div className="stats-bar-container">
      <div className="stats-grid">
        {/* Timer Card */}
        <div className="stat-card" id="stat-timer">
          <div className="stat-icon-wrapper timer-color">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">遊戲計時</span>
            <span className="stat-value font-mono">{formatTime(timer)}</span>
          </div>
        </div>

        {/* Moves Card */}
        <div className="stat-card" id="stat-moves">
          <div className="stat-icon-wrapper moves-color">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">累計步數</span>
            <span className="stat-value font-mono">{moves} <span className="stat-unit">步</span></span>
          </div>
        </div>

        {/* Matched Pairs Card */}
        <div className="stat-card" id="stat-progress">
          <div className="stat-icon-wrapper progress-color">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-label">配對進度</span>
            <span className="stat-value font-mono">
              {matchedPairs} <span className="stat-unit">/ {totalPairs} 對</span>
            </span>
          </div>
        </div>

        {/* Best Score */}
        <div className={`stat-card stat-card-best ${bestScore ? 'has-record' : ''}`} id="stat-best">
          <div className="stat-icon-wrapper trophy-color">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1c1.94-.38 3.5-1.92 3.61-3.96C19.08 11.63 21 9.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
            </svg>
          </div>
          <div className="stat-info">
            <div className="stat-label-row">
              <span className="stat-label">最佳紀錄</span>
              {bestScore && onResetBest && (
                <button
                  className="reset-record-btn"
                  onClick={onResetBest}
                  title="重設歷史最佳紀錄"
                  aria-label="重設歷史最佳紀錄"
                >
                  重設
                </button>
              )}
            </div>
            <span className="stat-value font-mono">
              {bestScore ? (
                <>
                  <span className="best-highlight">{bestScore.moves}</span>
                  <span className="stat-unit"> 步</span>
                  <span className="best-divider">·</span>
                  <span className="best-time">{formatTime(bestScore.time)}</span>
                </>
              ) : (
                <span className="no-record">尚未紀錄</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="restart-btn-wrapper">
        <button
          id="btn-quick-restart"
          className="control-button restart-action"
          onClick={onRestart}
          title="重新洗牌開局"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
          重新開始
        </button>
      </div>
    </div>
  );
}
