import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/dashboard");
    } catch {
      console.log('error occured');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["left-side"]}></div>
      <div className={styles["center"]}>
        <div className={styles["header"]}>
          <img src="../../assets/icon.png" alt="" />
          <h2>Welcome to Meeting Scheduler</h2>
          <p>Login to schedule up a meeting</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address:</label>
            <br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <br />
            <div className={styles["password-container"]}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={toggleShowPassword} className={styles["toggle-password"]}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {status === "failed" && <p className={styles["error"]}>{error}</p>}
          <button type="submit" disabled={status === "loading"}>
            Login
          </button>

          <div className={styles["account"]}>
            <p>Don't have an account?</p>
            <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
      <div className={styles["right-side"]}></div>
    </div>
  );
};

export default Login;
