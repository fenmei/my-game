import React from 'react';

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="rules-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="rules-header">
          <h3>📖 遊戲規則與技巧</h3>
          <button className="close-btn" onClick={onClose} aria-label="關閉說明">
            ✕
          </button>
        </div>

        <div className="rules-content">
          <div className="rule-step">
            <span className="step-num">1</span>
            <div>
              <strong>點擊翻牌</strong>
              <p>桌面共有 16 張蓋著的牌（8 對相同的圖案），點擊卡牌翻開查看圖案。</p>
            </div>
          </div>

          <div className="rule-step">
            <span className="step-num">2</span>
            <div>
              <strong>配對消除</strong>
              <p>連續翻開兩張相同的牌即可成功消除；若不同，卡牌將在短暫停留後蓋回。</p>
            </div>
          </div>

          <div className="rule-step">
            <span className="step-num">3</span>
            <div>
              <strong>通關評價</strong>
              <p>當 16 張卡牌全部消除即為通關！系統會記錄你的步數與總耗時，爭取 3 星完美評級吧！</p>
            </div>
          </div>
        </div>

        <div className="rules-footer">
          <button className="action-btn primary-btn" onClick={onClose}>
            我知道了，開始挑戰
          </button>
        </div>
      </div>
    </div>
  );
}
