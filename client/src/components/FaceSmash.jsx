import React from "react";
import model1 from "../assets/model1.jpg";
import model2 from "../assets/model2.jpg";
import model3 from "../assets/model3.jpg";
import model4 from "../assets/model4.jpg";
import model5 from "../assets/model5.jpg";

const FaceSmash = () => {
  return (
    <div>
      <div className=" w-full h-screen items-center justify-center flex  flex-col">
        <h1 className="text-2xl mb-6 font-semibold text-start">Face Smash</h1>
        <p className="">Pick the one that vibes harder!</p>
        <div className="flex flex-col w-[60%] gap-6">
          <div className="w-full aspect-square overflow-hidden ">
            <img src={model1} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="w-full  aspect-square bg-white overflow-hidden">
            <img src={model2} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceSmash;
