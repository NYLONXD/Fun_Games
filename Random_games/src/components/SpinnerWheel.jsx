import React, { useState, useRef, useEffect } from "react";

const SpinWheel = () => {
  const [items, setItems] = useState(["", "", "", ""]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  // Draw wheel
  const drawWheel = (entries) => {
    const canvas = canvasRef.current;
    if (!canvas || entries.length === 0) return;

    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const radius = size / 2;
    const angle = (2 * Math.PI) / entries.length;

    ctx.clearRect(0, 0, size, size);

    entries.forEach((item, i) => {
      const start = i * angle;
      const end = start + angle;

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, start, end);
      ctx.fillStyle = `hsl(${(i * 360) / entries.length}, 80%, 60%)`;
      ctx.fill();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(start + angle / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(item.slice(0, 15), radius - 10, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(radius, radius, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#1e293b";
    ctx.fill();

    // No need to draw pointer here (it's in HTML)
  };

  // Redraw when items change
  useEffect(() => {
    const validItems = items.filter((i) => i.trim() !== "");
    drawWheel(validItems);
  }, [items]);

  // Spin logic with corrected math
  const handleSpin = () => {
    const validItems = items.filter((i) => i.trim() !== "");
    if (validItems.length === 0) return;

    setSpinning(true);
    setResult(null);

    const fullRotations = 5;
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = fullRotations * 360 + extraDegrees;

    const canvas = canvasRef.current;
    canvas.style.transition = "transform 4s ease-out";
    canvas.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
      const normalized = (totalRotation % 360 + 360) % 360;
      const corrected = (normalized + 90) % 360; // Because canvas starts at 3 o'clock

      const anglePerSlice = 360 / validItems.length;
      const winnerIndex = Math.floor(corrected / anglePerSlice) % validItems.length;

      setResult(validItems[winnerIndex]);
      setSpinning(false);
    }, 4200);
  };

  // Handle input box value
  const handleInputChange = (value, index) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);

    // Add one more empty input if last one filled
    if (index === items.length - 1 && value.trim() !== "") {
      setItems([...updated, ""]);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-pink-400 mb-2">🎡 Spinny Wheel of Chaos</h2>
        <p className="text-md md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          Enter options below — friends, food, dares, anything. Hit spin and let destiny decide 😈💥
        </p>

        {/* Dynamic Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {items.map((value, i) => (
            <input
              key={i}
              className="rounded-md p-3 bg-white/10 border border-pink-400 text-white placeholder:text-pink-200"
              value={value}
              placeholder={`Option ${i + 1}`}
              onChange={(e) => handleInputChange(e.target.value, i)}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          <button
            onClick={() => drawWheel(items.filter((i) => i.trim() !== ""))}
            className="bg-pink-600 hover:bg-pink-700 transition-all px-6 py-2 rounded-lg font-semibold"
          >
            🎨 Update Wheel
          </button>
          <button
            onClick={handleSpin}
            disabled={spinning}
            className={`${
              spinning ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            } transition-all px-6 py-2 rounded-lg font-semibold`}
          >
            🎲 Spin
          </button>
        </div>

        {/* Wheel */}
        <div className="flex justify-center mb-8 relative">
          <div className="w-[320px] h-[320px] relative">
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="rounded-full border-4 border-pink-500"
            ></canvas>
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-400" />
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 text-2xl font-bold text-yellow-400 animate-pulse">
            🎯 Result: <span className="text-white">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
