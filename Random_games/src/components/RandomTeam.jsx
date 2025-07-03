import React, { useState } from "react";

const RandomTeamGenerator = () => {
  const [namesInput, setNamesInput] = useState("");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  const handleGenerateTeams = () => {
    const names = namesInput
      .split(/[\n,]+/)
      .map(name => name.trim())
      .filter(name => name);

    if (names.length < teamCount) {
      setError("Not enough players for that many teams.");
      return;
    }

    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const newTeams = Array.from({ length: teamCount }, () => []);

    shuffled.forEach((name, idx) => {
      newTeams[idx % teamCount].push(name);
    });

    setTeams(newTeams);
    setError("");
  };

  const handleReset = () => {
    setNamesInput("");
    setTeamCount(2);
    setTeams([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 🎯 Info */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold mb-2 text-purple-400">
            ⚔️ Random Team Generator
          </h2>
          <p className="text-lg text-gray-300">
            Turn friends into rivals. Let randomness decide your fate 😈
          </p>
        </div>

        {/* 🧾 Input Area */}
        <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow-xl">
          <label className="block mb-2 font-semibold text-purple-200">
            👥 Enter names (comma or newline separated)
          </label>
          <textarea
            rows={5}
            className="w-full p-3 rounded-md bg-white/5 border border-purple-400 text-white placeholder:text-purple-300"
            value={namesInput}
            onChange={e => setNamesInput(e.target.value)}
            placeholder="e.g. Alice, Bob, Charlie..."
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-purple-200 font-semibold">Number of Teams:</label>
              <input
                type="number"
                min={2}
                max={10}
                value={teamCount}
                onChange={e => setTeamCount(parseInt(e.target.value))}
                className="w-20 p-2 rounded bg-white/10 text-white border border-purple-300"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleGenerateTeams}
                className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold transition-all"
              >
                🎲 Generate Teams
              </button>

              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg font-semibold"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>

        {/* 📦 Results */}
        {teams.length > 0 && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {teams.map((team, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-lg p-6 border border-purple-400 shadow-md hover:shadow-purple-500/30 transition-all"
              >
                <h3 className="text-xl font-bold text-purple-300 mb-4">🚩 Team {idx + 1}</h3>
                <ul className="list-disc pl-5 text-purple-100">
                  {team.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomTeamGenerator;
