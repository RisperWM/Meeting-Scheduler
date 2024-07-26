import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../login/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await dispatch(signupUser({ email, password })).unwrap();
      navigate("/login");
    } catch {
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <br />
            <div className={styles["password-container"]}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span onClick={toggleShowConfirmPassword} className={styles["toggle-password"]}>
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20}/>}
              </span>
            </div>
          </div>
          {status === "failed" && <p className={styles["error"]}>{error}</p>}
          <button type="submit" disabled={status === "loading"}>
            Sign Up
          </button>

          <div className={styles["account"]}>
            <p>Already have an account?</p>
            <a href="/login">Log in</a>
          </div>
        </form>
      </div>
      <div className={styles["right-side"]}></div>
    </div>
  );
};

export default Signup;
