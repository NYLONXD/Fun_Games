// src/components/YesNoGenerator.jsx
import React, { useState } from "react";

const options = ["Yes", "No", "Maybe", "Definitely", "Absolutely Not", "Try Again"];

export default function YesNoGenerator() {
  const [answer, setAnswer] = useState(null);
  const [animating, setAnimating] = useState(false);

  const generateAnswer = () => {
    setAnimating(true);
    setTimeout(() => {
      const random = options[Math.floor(Math.random() * options.length)];
      setAnswer(random);
      setAnimating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-pulse">🤔 Ask Me Anything!</h1>

      <p className="text-center mb-6 text-lg max-w-md">
        Got a dilemma? A love life mess? A midnight snack debate? Let the universe (aka me 😎) decide for you.
      </p>

      <button
        onClick={generateAnswer}
        disabled={animating}
        className="bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-full font-semibold text-lg shadow-lg transition-all"
      >
        Ask the Question
      </button>

      {answer && (
        <div className="mt-10 text-6xl font-extrabold animate-bounce">
          {answer}
        </div>
      )}
    </div>
  );
}
