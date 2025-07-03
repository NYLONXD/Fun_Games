// src/components/EmojiPicker.jsx
import React, { useState } from "react";

const emojiList = [
  "😀", "😂", "😍", "😎", "🤔", "😡", "🥳", "😱", "😴", "😇",
  "😷", "🤖", "👻", "👽", "💩", "🎃", "🔥", "🌈", "💥", "✨"
];

export default function EmojiPicker() {
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const getRandomEmoji = () => {
    const index = Math.floor(Math.random() * emojiList.length);
    setPickedEmoji(emojiList[index]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold mb-6">😄 Emoji Picker</h1>

      <p className="text-center max-w-md mb-6 text-lg">
        Click the button to pick a random emoji and express your mood, emotions or pure chaos! 🌀
      </p>

      <button
        onClick={getRandomEmoji}
        className="bg-pink-600 hover:bg-pink-700 px-6 py-3 mb-8 rounded-full font-semibold text-lg shadow-md transition-all"
      >
        Pick Emoji
      </button>

      {pickedEmoji && (
        <div className="text-8xl animate-bounce">
          {pickedEmoji}
        </div>
      )}
    </div>
  );
}
