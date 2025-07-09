import React from "react";
import Post from "./components/Post";
import Modal from "./components/modals/modal";
import FaceSmash from "./components/FaceSmash";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LeaderBoard from "./pages/LeaderBoardPage";
import Header from "./components/header/Header";
import Login from "./components/Login/Login";
import { useState } from "react";
const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className=" min-h-screen bg-white dark:bg-gray-900">
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
      </Routes>
      <Navbar />

      <div className="fixed w-full bottom-0  z-40 ">{/* <Modal /> */}</div>
    </div>
  );
};

export default App;
