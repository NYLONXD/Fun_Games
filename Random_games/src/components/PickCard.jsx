import React, { useState, useEffect } from 'react';

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const valueScores = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  '10': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
};

const generateDeck = () => {
  const deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value });
    });
  });
  return deck;
};

const shuffleDeck = (deck) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

const getCardImagePath = (value, suit) => {
  const suitMap = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
  return `/cards/${suitMap[suit]}_${value}.png`;
};

const Card = ({ card }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setFlipped(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-24 h-36 m-2">
      {flipped && (
        <img
          src={getCardImagePath(card.value, card.suit)}
          alt={`${card.value} of ${card.suit}`}
          className="w-full h-full object-contain rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

const PickCardMultiplayer = () => {
  const [deck, setDeck] = useState(() => shuffleDeck(generateDeck()));
  const [players, setPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6"]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [scores, setScores] = useState(Array(6).fill(0));

  const drawCard = () => {
    if (deck.length < players) return alert('Not enough cards for all players!');
    const newCards = deck.slice(0, players);
    setDrawnCards(prev => [...prev, newCards]);
    setDeck(prev => prev.slice(players));

    const roundScores = [...scores];
    newCards.forEach((card, i) => {
      roundScores[i] += valueScores[card.value];
    });
    setScores(roundScores);
  };

  const resetGame = () => {
    setDeck(shuffleDeck(generateDeck()));
    setDrawnCards([]);
    setScores(Array(6).fill(0));
  };

  const sortedLeaderboard = scores.slice(0, players)
    .map((score, i) => ({ player: playerNames[i], score }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Multiplayer Pick A Card 🎴</h1>

      {/* Player Name Inputs */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {Array.from({ length: players }).map((_, i) => (
          <input
            key={i}
            value={playerNames[i]}
            onChange={(e) => {
              const updated = [...playerNames];
              updated[i] = e.target.value;
              setPlayerNames(updated);
            }}
            className="px-2 py-1 border border-gray-300 rounded-md w-40"
            placeholder={`Player ${i + 1} name`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <button onClick={drawCard} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Draw Cards
        </button>
        <button onClick={resetGame} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Reset
        </button>
        <select
          value={players}
          onChange={(e) => setPlayers(parseInt(e.target.value))}
          className="px-4 py-2 rounded-lg border border-gray-300"
        >
          {[2, 3, 4, 5, 6].map(num => (
            <option key={num} value={num}>Players: {num}</option>
          ))}
        </select>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold text-center mb-2">Leaderboard 🏆</h2>
        {sortedLeaderboard.map(({ player, score }, index) => (
          <div key={index} className="flex justify-between px-4 py-1 border-b last:border-none">
            <span>{player}</span>
            <span className="font-bold text-gray-700">{score}</span>
          </div>
        ))}
      </div>

      {/* Drawn Cards */}
      <div className="space-y-8 w-full">
        {drawnCards.map((round, roundIndex) => (
          <div key={roundIndex} className="w-full flex flex-wrap justify-center gap-6">
            {round.map((card, i) => (
              <div key={i}>
                <p className="text-center font-semibold mb-1">{playerNames[i]}</p>
                <Card card={card} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickCardMultiplayer;