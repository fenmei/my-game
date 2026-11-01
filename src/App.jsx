import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createShuffledCards } from './data/cardData';
import { soundManager } from './utils/sound';
import { triggerConfetti } from './utils/confetti';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import Card from './components/Card';
import VictoryModal from './components/VictoryModal';
import RulesModal from './components/RulesModal';
import './App.css';

const TOTAL_PAIRS = 8;
const STORAGE_BEST_KEY = 'memory_game_best_record';
const STORAGE_SOUND_KEY = 'memory_game_sound_enabled';

export default function App() {
  const [cards, setCards] = useState(() => createShuffledCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Sound preference state
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem(STORAGE_SOUND_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Best record { moves, time }
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_BEST_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const timerRef = useRef(null);
  const timerValRef = useRef(0);

  // Keep timerValRef synchronized
  useEffect(() => {
    timerValRef.current = timer;
  }, [timer]);

  // Keep soundManager synced
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
    localStorage.setItem(STORAGE_SOUND_KEY, JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Timer interval
  useEffect(() => {
    if (isGameActive && !isCompleted) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameActive, isCompleted]);

  // Restart game
  const handleRestart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCards(createShuffledCards());
    setFlippedIndices([]);
    setIsLocked(false);
    setMoves(0);
    setTimer(0);
    timerValRef.current = 0;
    setIsGameActive(false);
    setIsCompleted(false);
    setIsNewBest(false);
  }, []);

  // Reset historical best record
  const handleResetBest = useCallback(() => {
    if (window.confirm('確定要清除歷史最佳紀錄嗎？')) {
      setBestScore(null);
      localStorage.removeItem(STORAGE_BEST_KEY);
    }
  }, []);

  // Calculate matched pairs count
  const matchedPairs = cards.filter((c) => c.isMatched).length / 2;

  // Handle card click
  const handleCardClick = (index) => {
    if (isLocked) return;
    const clickedCard = cards[index];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Start timer on first move if not active
    if (!isGameActive) {
      setIsGameActive(true);
    }

    soundManager.playFlip();

    // Flip the clicked card
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If this is the second card flipped
    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];
      const nextMoves = moves + 1;
      setMoves(nextMoves);

      // Check match
      if (firstCard.typeId === secondCard.typeId) {
        // MATCHED!
        soundManager.playMatch();

        setTimeout(() => {
          setCards((prevCards) => {
            const updated = prevCards.map((card, i) => {
              if (i === firstIdx || i === secondIdx) {
                return { ...card, isMatched: true, isFlipped: true };
              }
              return card;
            });

            // Check if game won
            const totalMatched = updated.filter((c) => c.isMatched).length / 2;
            if (totalMatched === TOTAL_PAIRS) {
              handleGameCompletion(nextMoves);
            }

            return updated;
          });
          setFlippedIndices([]);
        }, 300);
      } else {
        // MISMATCH!
        setIsLocked(true);
        soundManager.playMismatch();

        // Mark mismatch animation
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) => {
              if (i === firstIdx || i === secondIdx) {
                return { ...card, isMismatch: true };
              }
              return card;
            })
          );
        }, 200);

        // Turn back after 800ms
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, i) => {
              if (i === firstIdx || i === secondIdx) {
                return { ...card, isFlipped: false, isMismatch: false };
              }
              return card;
            })
          );
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  // Trigger game win state
  const handleGameCompletion = (finalMoves) => {
    setIsGameActive(false);
    setIsCompleted(true);
    soundManager.playVictory();
    triggerConfetti();

    const finalTime = timerValRef.current;
    let isNew = false;
    if (!bestScore) {
      isNew = true;
    } else if (finalMoves < bestScore.moves) {
      isNew = true;
    } else if (finalMoves === bestScore.moves && finalTime < bestScore.time) {
      isNew = true;
    }

    if (isNew) {
      const newRecord = { moves: finalMoves, time: finalTime };
      setBestScore(newRecord);
      localStorage.setItem(STORAGE_BEST_KEY, JSON.stringify(newRecord));
      setIsNewBest(true);
    }
  };

  return (
    <div className="game-app">
      {/* Dynamic Background Mesh */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>

      <div className="game-container">
        {/* Header */}
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          onOpenRules={() => setIsRulesOpen(true)}
        />

        {/* Dashboard / Stats bar */}
        <StatsBar
          timer={timer}
          moves={moves}
          matchedPairs={matchedPairs}
          totalPairs={TOTAL_PAIRS}
          bestScore={bestScore}
          onRestart={handleRestart}
          onResetBest={handleResetBest}
        />

        {/* Card Grid (4x4 = 16 cards) */}
        <main className="board-section">
          <div className="cards-grid" role="region" aria-label="16張水果記憶翻牌區域">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                onClick={() => handleCardClick(index)}
                disabled={isLocked || card.isMatched || card.isFlipped}
              />
            ))}
          </div>
        </main>

        {/* Footer info */}
        <footer className="game-footer">
          <span>🍓 水果翻牌小撇步：記住不同水果的位置，連擊配對能大幅節省步數！</span>
        </footer>
      </div>

      {/* Completion Modal */}
      <VictoryModal
        isOpen={isCompleted}
        timer={timer}
        moves={moves}
        bestScore={bestScore}
        isNewBest={isNewBest}
        onRestart={handleRestart}
      />

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
