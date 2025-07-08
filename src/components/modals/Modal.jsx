import React, { useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";

// Dummy comments array
const dummyComments = [
  {
    id: 1,
    name: "sneha_12",
    avatar: "https://i.pravatar.cc/40?img=1",
    text: "Wow this is amazing!",
  },
  {
    id: 2,
    name: "john_doe",
    avatar: "https://i.pravatar.cc/40?img=2",
    text: "Great shot!🔥",
  },
  {
    id: 3,
    name: "ananya",
    avatar: "https://i.pravatar.cc/40?img=3",
    text: "Where is this place?",
  },
  {
    id: 4,
    name: "rahulvibes",
    avatar: "https://i.pravatar.cc/40?img=4",
    text: "Beautiful capture 💯",
  },
  {
    id: 5,
    name: "sneha_12",
    avatar: "https://i.pravatar.cc/40?img=1",
    text: "Wow this is amazing!",
  },
  {
    id: 6,
    name: "john_doe",
    avatar: "https://i.pravatar.cc/40?img=2",
    text: "Great shot!🔥",
  },
  {
    id: 7,
    name: "ananya",
    avatar: "https://i.pravatar.cc/40?img=3",
    text: "Where is this place?",
  },
  {
    id: 8,
    name: "rahulvibes",
    avatar: "https://i.pravatar.cc/40?img=4",
    text: "Beautiful capture 💯",
  },
];

const Modal = () => {
  const [comment, setComment] = useState("");

  const handleSend = () => {
    if (comment.trim() !== "") {
      console.log("Send comment:", comment);
      setComment("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="  bg-white border border-gray-300 rounded-t-3xl px-4 py-6 flex flex-col">
        <div className="flex">
          <BiArrowBack size={24} />
        </div>
        {/* Comments list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 py-6 ">
          {dummyComments.map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-sm text-gray-700">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="pt-2 border-t mt-2 flex items-center gap-2">
          <FaRegSmile size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 outline-none text-sm p-2"
          />
          <button
            onClick={handleSend}
            className="text-blue-500 hover:text-blue-600"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
