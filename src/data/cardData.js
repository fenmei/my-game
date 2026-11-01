export const CARD_ITEMS = [
  {
    typeId: 0,
    icon: '🍎',
    name: '甜蘋果',
    gradient: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    shadowColor: 'rgba(255, 75, 43, 0.4)',
  },
  {
    typeId: 1,
    icon: '🍌',
    name: '香甜蕉',
    gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    shadowColor: 'rgba(255, 210, 0, 0.4)',
  },
  {
    typeId: 2,
    icon: '🍓',
    name: '紅草莓',
    gradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
    shadowColor: 'rgba(255, 8, 68, 0.4)',
  },
  {
    typeId: 3,
    icon: '🍇',
    name: '紫葡萄',
    gradient: 'linear-gradient(135deg, #8a2387 0%, #e94057 50%, #f27121 100%)',
    shadowColor: 'rgba(138, 35, 135, 0.4)',
  },
  {
    typeId: 4,
    icon: '🍉',
    name: '脆西瓜',
    gradient: 'linear-gradient(135deg, #0575e6 0%, #00f260 100%)',
    shadowColor: 'rgba(0, 242, 96, 0.4)',
  },
  {
    typeId: 5,
    icon: '🍊',
    name: '多汁橙',
    gradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
    shadowColor: 'rgba(245, 175, 25, 0.4)',
  },
  {
    typeId: 6,
    icon: '🍍',
    name: '金鳳梨',
    gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
    shadowColor: 'rgba(248, 87, 166, 0.4)',
  },
  {
    typeId: 7,
    icon: '🍒',
    name: '雙櫻桃',
    gradient: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    shadowColor: 'rgba(235, 51, 73, 0.4)',
  },
];

// Generate and shuffle 16 cards (8 pairs)
export function createShuffledCards() {
  const cards = [];
  
  CARD_ITEMS.forEach((item) => {
    // Add two instances for each pair
    cards.push({
      id: `${item.typeId}-a-${Math.random().toString(36).substring(2, 7)}`,
      typeId: item.typeId,
      icon: item.icon,
      name: item.name,
      gradient: item.gradient,
      shadowColor: item.shadowColor,
      isFlipped: false,
      isMatched: false,
      isMismatch: false,
    });
    cards.push({
      id: `${item.typeId}-b-${Math.random().toString(36).substring(2, 7)}`,
      typeId: item.typeId,
      icon: item.icon,
      name: item.name,
      gradient: item.gradient,
      shadowColor: item.shadowColor,
      isFlipped: false,
      isMatched: false,
      isMismatch: false,
    });
  });

  // Fisher-Yates Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}
