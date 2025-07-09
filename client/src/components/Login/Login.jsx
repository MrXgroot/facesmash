import { FcGoogle } from "react-icons/fc";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const dropIn = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const Login = ({ onClose }) => {
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 200], [1, 0.4]);
  const scale = useTransform(y, [0, 200], [1, 0.95]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 120) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-90 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        variants={dropIn}
        // initial="hidden"
        animate="visible"
        exit="exit"
        drag="y"
        dragElastic={0.2}
        dragConstraints={{ top: 0 }}
        onDragEnd={handleDragEnd}
        style={{ y, opacity, scale }}
        className="relative w-full max-w-md rounded-t-3xl bg-white px-6 py-8 text-center shadow-[0_-8px_24px_rgba(0,0,0,0.15)]"
      >
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close Login"
        >
          <IoMdClose size={24} />
        </button>

        {/* Branding */}
        <h1 className="mb-1 text-2xl font-semibold text-gray-900">
          Welcome to SnapRank
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Sign in with your Google account to continue
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 hover:scale-[1.02]"
        >
          <FcGoogle size={22} />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
