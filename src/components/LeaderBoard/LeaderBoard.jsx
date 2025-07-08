import React from "react";
import "./LeaderBoard.css";

const users = [
  { id: 1, name: "Ayaan", points: 150, photo: "https://i.pravatar.cc/100?img=1" },
  { id: 2, name: "Riya", points: 135, photo: "https://i.pravatar.cc/100?img=2" },
  { id: 3, name: "Arjun", points: 120, photo: "https://i.pravatar.cc/100?img=3" },
  { id: 4, name: "Zoya", points: 100, photo: "https://i.pravatar.cc/100?img=4" },
  { id: 5, name: "Kunal", points: 98, photo: "https://i.pravatar.cc/100?img=5" },
  { id: 6, name: "Fatima", points: 95, photo: "https://i.pravatar.cc/100?img=6" },
  { id: 7, name: "Vikram", points: 90, photo: "https://i.pravatar.cc/100?img=7" },
  { id: 8, name: "Sara", points: 85, photo: "https://i.pravatar.cc/100?img=8" },
  { id: 9, name: "Ravi", points: 80, photo: "https://i.pravatar.cc/100?img=9" },
  { id: 10, name: "Neha", points: 75, photo: "https://i.pravatar.cc/100?img=10" },
];

const getMedalEmoji = (index) => {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return "";
};

const LeaderBoard = () => {
  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 FaceSnack Leaderboard</h2>

      {/* Top 3 Special Podium */}
      <div className="top-three-container">
        {topThree.map((user, index) => (
          <div className={`podium-card place-${index + 1}`} key={user.id}>
            <div className="avatar-container">
              <img src={user.photo} alt={user.name} className="avatar" />
              <div className="medal">{getMedalEmoji(index)}</div>
            </div>
            <div className="user-name">{user.name}</div>
            <div className="user-points">{user.points} pts</div>
          </div>
        ))}
      </div>

      {/* Remaining 4–10 Users */}
      <div className="grid-container">
        {rest.map((user, index) => (
          <div className="grid-item" key={user.id}>
            <img src={user.photo} alt={user.name} className="avatar" />
            <div className="user-name">{user.name}</div>
            <div className="user-points">{user.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
