import React, { useState } from "react";
import photo from "../assets/photo1.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import avatar from "../assets/logo.jpeg";
const Post = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(24); // default like count

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      setLikeCount(likeCount + 1);
    } else {
      setLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      if (liked) setLikeCount(likeCount - 1);
    } else {
      setDisliked(false);
    }
  };

  return (
    <div className="relative">
      <div className="w-full overflow-hidden flex flex-col border-gray-300   rounded-lg">
        <div className="flex gap-3 px-4 py-2 items-center font-medium shadow-md">
          <div className="w-9 h-9 rounded-full overflow-hidden ">
            <img src={avatar} alt="" className="w-full h-full object-cover" />
          </div>

          <p className="text-base text-gray-700 ">Lost gamer</p>
        </div>

        {/* Image */}
        <div onDoubleClick={handleLike} className="h-[300px] cursor-pointer">
          <img
            src={photo}
            alt="Post"
            className="object-contain w-full h-full"
          />
        </div>

        <div className="py-3 px-4">
          <ActionButtons
            handleLike={handleLike}
            liked={liked}
            handleDislike={handleDislike}
            disliked={disliked}
            likeCount={likeCount}
          />
        </div>

        <div className="pb-4 px-4">
          <p className="text-xs">Wonderfull day with colleagues....</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

const ActionButtons = ({
  handleLike,
  liked,
  handleDislike,
  disliked,
  likeCount,
}) => (
  <div className="">
    <div className="flex items-center gap-4 text-gray-700">
      <AnimatePresence mode="wait" initial={false}>
        <motion.button
          key={liked ? "liked" : "unliked"}
          onClick={handleLike}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
          }}
          className="flex items-center"
        >
          {liked ? (
            <AiFillHeart size={28} className="text-pink-600" />
          ) : (
            <AiOutlineHeart size={28} />
          )}
        </motion.button>
      </AnimatePresence>

      {/* COMMENT Button */}
      <button className="flex items-center hover:text-green-600 transition">
        <HiOutlineChatBubbleLeft size={26} />
      </button>

      {/* DISLIKE Button */}
      <motion.button
        onClick={handleDislike}
        whileTap={{ scale: 1.3 }}
        className="flex items-center transition-all"
      >
        {disliked ? (
          <BiSolidDislike size={28} className="text-red-600 transition" />
        ) : (
          <BiDislike size={28} className="transition" />
        )}
      </motion.button>

      {/* Like Count */}
      <span className="ml-auto text-sm text-gray-600">{likeCount} likes</span>
    </div>
  </div>
);
