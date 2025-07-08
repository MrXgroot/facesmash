import React from "react";
import Post from "./components/Post";
import Modal from "./components/modals/modal";
import FaceSmash from "./components/FaceSmash";
const App = () => {
  return (
    <div className=" min-h-screen ">
      <div className="flex flex-col h-full overflow-y-auto">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      {/* <FaceSmash /> */}
      <div className="fixed w-full bottom-0  z-40 ">{/* <Modal /> */}</div>
    </div>
  );
};

export default App;
