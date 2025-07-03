import React from "react";
import { Link } from "react-router-dom";
import DotGrid from "../animation/DotGrid";
import TiltedCard from "../animation/TiltedCard";
import { motion } from "framer-motion";

const Home = () => {
  const tools = [
    { path: "/flip-coin", label: "Flip Coin", image: "flip-coin.png" },
    {
      path: "/random-number",
      label: "Random Number",
      image: "random-number.png",
    },
    { path: "/random-word", label: "Random Word", image: "random-word.png" },
    { path: "/random-team", label: "Random Team", image: "random-team.png" },
    {
      path: "/spinner-wheel",
      label: "Spinner Wheel",
      image: "spinner-wheel.png",
    },
    {
      path: "/password-generator",
      label: "Password Generator",
      image: "password-generator.png",
    },
    { path: "/yes-no", label: "Yes / No", image: "yes-no.png" },
    { path: "/dice-roller", label: "Dice Roller", image: "dice-roller.png" },
    { path: "/emoji-picker", label: "Emoji Picker", image: "emoji-picker.png" },
    { path: "/pick-card", label: "Pick a Card", image: "pick-card.png" },
  ];

  return (
    <div className="home-main bg-[#041f79]">
      <div className="relative bg-[#041f79] min-h-screen text-gray-800 backdrop-blur-sm overflow-hidden dot-bg-overlay">
        {/* 🌀 Animated Dot Background */}
        <div className="fixed top-0 left-0 w-full h-full -z-0">
          <DotGrid
            dotSize={4}
            gap={6}
            baseColor="#000000"
            activeColor="#6D28D9" // purple glow on hover
            proximity={65}
            shockRadius={200}
            shockStrength={3}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        {/* 🎉 Header */}
        <header className="relative  z-10 text-center py-10 bg-gradient-to-b from-black to-transparent">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            className="absolute top-4 left-6 z-50 flex flex-col items-start space-y-1"
          >
            <img
              src="/assets/my-avatar.png"
              alt="NyloNXD Avatar"
              className="w-24 md:w-24 rounded-full border-4 border-purple-500 shadow-xl hover:scale-105 transition-all duration-300"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl text-sm md:text-base shadow-lg neon-glow"
            >
              NyloNXD ⚡
            </motion.div>
          </motion.div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight bg-white/10 backdrop-blur rounded-xl inline-block px-4 py-2">
            Welcome to <span className="text-blue-500">NyloNXD</span>-
            <span className="text-purple-500">FunZone</span> 🔥
          </h1>
          <p className="mt-4 text-lg font-medium text-gray-300">
            One site. Infinite randomness. Zero logic. Infinite laughter. 😜
          </p>
        </header>

        {/* 🧩 Tools as TiltedCards */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 mb-12 place-items-center">
          {tools.map((tool, index) => (
            <Link to={tool.path} key={index}>
              <TiltedCard
                imageSrc={`/assets/${tool.image}`}
                altText={tool.label}
                captionText={tool.label}
                containerHeight="220px"
                containerWidth="220px"
                imageHeight="220px"
                imageWidth="220px"
                rotateAmplitude={14}
                scaleOnHover={1.1}
                displayOverlayContent={true}
                overlayContent={
<div className="text-pink-500 font-semibold text-sm text-center p-2 [text-shadow:2px_2px_6px_rgba(0,0,0,0.5)]">
                    {tool.label}
                  </div>
                }
              />
            </Link>
          ))}
        </main>

        {/* 👣 Footer */}
        <footer className="text-center py-6 text-xs text-gray-400 bg-black/70 backdrop-blur-sm">
          Built with ❤️ and a bit of chaos by{" "}
          <span className="font-bold text-purple-400">Nylon</span> 😎
          <br />
          Used{" "}
          <span className="text-pink-500 font-bold">
            {localStorage.getItem("totalUsed") || 0}
          </span>{" "}
          times by equally jobless legends like you 🚀
        </footer>
      </div>
    </div>
  );
};

export default Home;
