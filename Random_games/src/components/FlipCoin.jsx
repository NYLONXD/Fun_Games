import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import "./FlipCoin.css";

// Paths to sounds and images
const coinSound = "/assets/coin-flip.mp3";
const winSound = "/assets/win.mp3";
const headsImg = "./assets/heads.png";
const tailsImg = "./assets/tails.png";

const coinFaces = {
  heads: headsImg,
  tails: tailsImg,
};

const FlipCoin = () => {
  const [side, setSide] = useState("heads");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [showing, setShowing] = useState("heads");

  const [playFlip] = useSound(coinSound);
  const [playWin] = useSound(winSound);

  const launchConfetti = () => {
    const coin = document.getElementById("coin-img");
    if (!coin) return;

    const rect = coin.getBoundingClientRect();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  const flipCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    playFlip();

    let flips = 0;
    const maxFlips = 12;

    const interval = setInterval(() => {
      setShowing((prev) => (prev === "heads" ? "tails" : "heads"));
      flips++;

      if (flips >= maxFlips) {
        clearInterval(interval);

        // Pause before showing final result
        setTimeout(() => {
          const result = Math.random() < 0.5 ? "heads" : "tails";
          setSide(result);
          setShowing(result);
          setFlipCount((prev) => prev + 1);
          setIsFlipping(false);
          playWin();

          // Slight delay before confetti
          setTimeout(() => {
            launchConfetti();
          }, 50);
        }, 400); // 400ms pause before reveal
      }
    }, 80);
  };

  return (
    <div className="flip-coin relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-800 to-black text-white">
      {/* Cloud / Star Background */}
      <div className="absolute w-full h-full top-0 left-0 -z-10">
        <div className="absolute animate-cloudMove1 bg-white opacity-10 rounded-full w-64 h-32 top-10 left-10 blur-2xl" />
        <div className="absolute animate-cloudMove2 bg-white opacity-10 rounded-full w-48 h-24 top-40 right-10 blur-xl" />
        <div className="absolute animate-cloudMove3 bg-white opacity-10 rounded-full w-56 h-28 bottom-20 left-20 blur-2xl" />
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full w-1 h-1 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Game UI */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-yellow-300 drop-shadow-md">
          🎮 Welcome to the Flip Coin Arena! 🪙
        </h1>
        <p className="text-lg md:text-xl text-purple-200 mb-8 max-w-xl">
          Think you're lucky? Tap the coin and let fate decide! 🎯
        </p>

        <motion.img
          id="coin-img"
          key={showing}
          src={coinFaces[showing]}
          alt={showing}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipping ? 360 : 0 }}
          transition={{ duration: isFlipping ? 1 : 0.3, ease: "easeInOut" }}
          className="w-64 h-64 object-cover object-center mb-6 rounded-full border-4 border-yellow-400 shadow-xl bg-white hover:scale-110 transition-transform duration-300"
          style={{ aspectRatio: "1/1" }}
        />

        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 hover:from-purple-500 hover:to-yellow-400 text-white font-bold rounded-full shadow-xl transition-all duration-500 disabled:opacity-50 text-lg"
        >
          {isFlipping ? "Flipping..." : "Flip the Coin 🪙"}
        </button>

        {/* Show Result Text */}
        {!isFlipping && (
          <p className="mt-6 text-2xl">
            It's{" "}
            <span className="font-extrabold text-yellow-300">
              {side.toUpperCase()}
            </span>{" "}
            baby 💋
          </p>
        )}

        <p className="text-sm text-purple-300 mt-2">Flipped {flipCount} times</p>
      </div>
    </div>
  );
};

export default FlipCoin;
