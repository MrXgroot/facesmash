import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import "./Login.css";

const Login = ({ onClose }) => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <motion.div
      className="login-page"
      initial={{ y: "40px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "40px", opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="login-box">
        <button onClick={onClose} className="close-button">
          <IoMdClose size={28} />
        </button>
        <h1 className="login-title">SnapRank</h1>
        <p className="login-subtitle">Login with your Google account</p>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <FcGoogle size={24} style={{ marginRight: 8 }} />
          Continue with Google
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
