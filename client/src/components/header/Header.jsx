import React from "react";
import { PiUserFocusDuotone } from "react-icons/pi"; // Optional icon

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-700 shadow-sm shadow-gray-900 flex items-center px-4">
      <div className="flex items-center gap-2">
        {/* Optional Icon */}
        <PiUserFocusDuotone className="text-indigo-600 dark:text-white text-2xl" />

        {/* Logo Text */}
        <h1 className="text-[22px] font-semibold tracking-tight text-gray-900 dark:text-gray-200 font-logo select-none">
          FaceSmash
        </h1>
      </div>
    </header>
  );
};

export default Header;
