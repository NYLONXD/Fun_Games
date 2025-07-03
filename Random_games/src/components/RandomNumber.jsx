// RandomNumber.jsx
import React, { useState } from "react";
import "./RandomNumber.css";

const RandomNumber = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [input, setInput] = useState(6); // Default to 6 segments

  const numbers = Array.from({ length: input }, (_, i) => i + 1);

  const spinWheel = () => {
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * numbers.length);

    setTimeout(() => {
      setResult(numbers[randomIndex]);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="wheel-container">
      <h1 className="heading">Dynamic Spin Wheel 🎡</h1>
      <input
        type="number"
        min="2"
        max="20"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        className="number-input"
      />
      <div
        className="wheel"
        style={{ transform: spinning ? "rotate(1440deg)" : "rotate(0deg)" }}
      >
        {numbers.map((num, idx) => (
          <div
            key={idx}
            className="segment"
            style={{
              transform: `rotate(${(360 / numbers.length) * idx}deg)`,
              background: `hsl(${(360 / numbers.length) * idx}, 70%, 50%)`,
            }}
          >
            <span
              className="number"
              style={{ transform: `rotate(-${(360 / numbers.length) * idx}deg)` }}
            >
              {num}
            </span>
          </div>
        ))}
      </div>
      <div className="pointer">▼</div>
      <button className="spin-btn" onClick={spinWheel} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin the Wheel 🎯"}
      </button>
      {result && !spinning && <div className="result">You got: {result} 🎉</div>}
    </div>
  );
};

export default RandomNumber;
