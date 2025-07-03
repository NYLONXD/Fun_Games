import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import FlipCoin from './components/FlipCoin.jsx'; 
import './App.css'; 
import RandomNumber from './components/RandomNumber.jsx';
import RandomWord from './components/RandomWord.jsx'; // Import your new component
import SpinWheel from './components/SpinnerWheel.jsx';
import RandomTeamGenerator from './components/RandomTeam.jsx';
import PasswordGenerator from './components/PasswordGenerator.jsx';
import YesNoGenerator from './components/YesNo.jsx';
import DiceRoller from './components/DiceRoller.jsx';
import EmojiPicker from './components/EmojiPicker.jsx'; // Import EmojiPicker if you have it
import PickCard from './components/PickCard.jsx';
const App = () => {
  return (
    <div className="app-root bg-[#041f79]">

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more tool routes below like this: */}
        <Route path="/flip-coin" element={<FlipCoin />} />
        <Route path="/random-number" element={<RandomNumber />} />
        {/* Add more routes for other tools as needed */}
      <Route path="/random-word" element={<RandomWord />} />
        <Route path="/random-team" element={<RandomTeamGenerator />} />
        <Route path="/spinner-wheel" element={<SpinWheel />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/yes-no" element={<YesNoGenerator />} />
        <Route path="/dice-roller" element={<DiceRoller />} />
        <Route path="/emoji-picker" element={<EmojiPicker />} />
        {/* Add more routes for other tools as needed */}
        <Route path="/pick-card" element={<PickCard />} />

      </Routes>
    </Router>
    </div>
  );
};

export default App;
