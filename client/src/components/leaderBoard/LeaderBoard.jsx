import React from "react";

const users = [
  {
    id: 1,
    name: "Ayaan",
    points: 150,
    photo: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Riya",
    points: 135,
    photo: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Arjun",
    points: 120,
    photo: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "Zoya",
    points: 100,
    photo: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: 5,
    name: "Kunal",
    points: 98,
    photo: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 6,
    name: "Fatima",
    points: 95,
    photo: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: 7,
    name: "Vikram",
    points: 90,
    photo: "https://i.pravatar.cc/100?img=7",
  },
  { id: 8, name: "Sara", points: 85, photo: "https://i.pravatar.cc/100?img=8" },
  { id: 9, name: "Ravi", points: 80, photo: "https://i.pravatar.cc/100?img=9" },
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
    <div className="px-4 pt-20 pb-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        FaceSnack Leaderboard
      </h2>

      {/* Top 3 Podium */}
      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {topThree.map((user, index) => (
          <div
            key={user.id}
            className="text-center bg-green-300 p-4 rounded-xl w-[100px] relative shadow-md"
          >
            <div className="relative w-[70px] h-[70px] mx-auto mb-2">
              <img
                src={user.photo}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-2 border-white shadow"
              />
              <div className="absolute -bottom-2 -right-2 bg-white text-lg rounded-full px-2 py-0.5 shadow">
                {getMedalEmoji(index)}
              </div>
            </div>
            <div className="font-semibold text-sm">{user.name}</div>
            <div className="text-xs text-gray-600">{user.points} pts</div>
          </div>
        ))}
      </div>

      {/* Remaining Users 4–10 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
        {rest.map((user) => (
          <div key={user.id} className="text-center">
            <div className="w-[70px] h-[70px] mx-auto mb-2">
              <img
                src={user.photo}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-2 border-white shadow"
              />
            </div>
            <div className="font-semibold text-sm">{user.name}</div>
            <div className="text-xs text-gray-600">{user.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
