import React, { useState, useEffect } from "react";
import "./DiceRoller.css"; // You must create this file (see below for content)

const getRotation = (value) => {
  switch (value) {
    case 1: return "rotateX(0deg) rotateY(0deg)";
    case 2: return "rotateX(0deg) rotateY(180deg)";
    case 3: return "rotateX(0deg) rotateY(-90deg)";
    case 4: return "rotateX(0deg) rotateY(90deg)";
    case 5: return "rotateX(-90deg) rotateY(0deg)";
    case 6: return "rotateX(90deg) rotateY(0deg)";
    default: return "rotateX(0deg) rotateY(0deg)";
  }
};

const Dice = ({ value }) => {
  const [rotation, setRotation] = useState("rotateX(0deg) rotateY(0deg)");

  useEffect(() => {
    // First spin randomly
    setRotation("rotateX(720deg) rotateY(720deg)");
    const timeout = setTimeout(() => {
      setRotation(getRotation(value));
    }, 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="dice-container">
      <div className="dice" style={{ transform: rotation }}>
        <div className="face face1">⚀</div>
        <div className="face face2">⚁</div>
        <div className="face face3">⚂</div>
        <div className="face face4">⚃</div>
        <div className="face face5">⚄</div>
        <div className="face face6">⚅</div>
      </div>
    </div>
  );
};

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(1);
  const [results, setResults] = useState([]);

  const rollDice = () => {
    const newResults = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-10 flex flex-col items-center justify-start">
      <h1 className="text-4xl font-extrabold mb-6">🎲 3D Dice Roller</h1>

      <p className="text-center max-w-md mb-6 text-lg">
        Enter how many dice you want to roll (1 to 20). Click the button and roll them!
      </p>

      <input
        type="number"
        min="1"
        max="20"
        value={diceCount}
        onChange={(e) => setDiceCount(Math.min(20, Math.max(1, +e.target.value)))}
        className="w-28 mb-4 px-4 py-2 rounded-md text-black text-lg text-center shadow-md"
      />

      <button
        onClick={rollDice}
        className="bg-purple-700 hover:bg-purple-800 px-6 py-3 mb-8 rounded-full font-semibold text-lg shadow-lg transition-all"
      >
        Roll Dice
      </button>

      <div className="flex flex-wrap gap-6 justify-center">
        {results.map((value, index) => (
          <Dice key={index} value={value} />
        ))}
      </div>
    </div>
  );
}
