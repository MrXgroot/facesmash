import React from "react";
import { Award } from "lucide-react";

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

const getMedalIcon = (index) => {
  const size = 20;
  if (index === 0)
    return (
      <Award size={size} className="text-yellow-500 bg-white rounded-full" />
    );
  if (index === 1)
    return (
      <Award size={size} className="text-gray-400 bg-white rounded-full" />
    );
  if (index === 2)
    return (
      <Award size={size} className="text-amber-700 bg-white rounded-full" />
    );
  return null;
};

const LeaderBoard = () => {
  return (
    <div className="pt-16 pb-24 px-4 min-h-screen bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white mb-6">
        FaceSmash Leaderboard
      </h2>

      <ul className="flex flex-col gap-4">
        {users.map((user, index) => (
          <li
            key={user.id}
            className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="rounded-full overflow-visible">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                </div>
                {index < 3 && (
                  <div className="absolute -bottom-1.5 -right-1.5 bg-white p-1 rounded-full shadow z-10">
                    {getMedalIcon(index)}
                  </div>
                )}
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-zinc-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-300">
                  {user.points} pts
                </p>
              </div>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-300 font-medium">
              #{index + 1}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
