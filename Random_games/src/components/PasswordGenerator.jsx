// src/components/SmartPasswordGenerator.jsx
import React, { useState } from "react";

const questions = [
  { id: "favColor", label: "What's your favorite color?" },
  { id: "birthYear", label: "What's your birth year?" },
  { id: "favAnimal", label: "Your favorite animal?" },
  { id: "luckyNumber", label: "Your lucky number?" },
  { id: "nickname", label: "Your nickname?" },
];

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const generatePassword = (answers) => {
  const color = capitalize(answers.favColor || "Color");
  const animal = capitalize(answers.favAnimal || "Animal");
  const nick = capitalize(answers.nickname || "User");
  const number = answers.luckyNumber || "99";
  const year = answers.birthYear?.toString() || "2000";

  const options = [
    `${nick}@${year}`,
    `${animal}#${number}`,
    `${color}_${nick}${number}`,
    `${nick}${number}@${color}`,
    `${color}${year}#${animal}`,
  ];

  return options[Math.floor(Math.random() * options.length)];
};

export default function SmartPasswordGenerator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [password, setPassword] = useState(null);

  const handleChange = (e) => {
    setAnswers({ ...answers, [questions[step].id]: e.target.value });
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const pwd = generatePassword(answers);
      setPassword(pwd);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setPassword(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-purple-400 animate-pulse">
        🔐 Smart Password Generator
      </h1>

      {!password ? (
        <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-md w-full">
          <label className="block mb-4 text-lg font-semibold">
            {questions[step].label}
          </label>
          <input
            type="text"
            value={answers[questions[step].id] || ""}
            onChange={handleChange}
            className="w-full p-2 rounded-lg text-black"
            placeholder="Type your answer..."
          />
          <button
            onClick={nextStep}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded-lg font-bold"
          >
            {step === questions.length - 1 ? "Generate Password" : "Next"}
          </button>
        </div>
      ) : (
        <div className="bg-white/10 p-6 rounded-xl text-center shadow-lg max-w-md w-full">
          <h2 className="text-lg font-semibold mb-2 text-green-400">
            🎉 Your Smart Password:
          </h2>
          <p className="text-2xl font-mono bg-white/20 py-2 px-4 rounded-xl inline-block select-all">
            {password}
          </p>
          <button
            onClick={reset}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 transition-all py-2 rounded-lg font-bold"
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
}
