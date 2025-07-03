import React, { useEffect, useState } from 'react';

const RandomWordGenerator = () => {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const API_KEY = "YOUR_API_KEY_HERE"; // 🔑 Replace with your actual key

  const fetchWord = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective,adverb&minLength=3&maxLength=12&api_key=${API_KEY}`
      );

      const data = await response.json();
      setWord(data.word);
    } catch (err) {
      setError('Failed to fetch word');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWord(); // Load first word on mount
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 rounded-xl bg-white/10 shadow-lg text-center text-white">
      <h2 className="text-2xl font-bold mb-4">✨ Random Word Generator</h2>
      
      <div className="text-4xl font-extrabold text-purple-300 mb-6">
        {loading ? 'Loading...' : word || 'No word yet'}
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <button
        onClick={fetchWord}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-semibold transition-all"
      >
        Generate Another
      </button>
    </div>
  );
};

export default RandomWordGenerator;
