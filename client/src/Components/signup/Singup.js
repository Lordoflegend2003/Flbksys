import React, { useState } from "react";
import "./Signup1.css";
import MyComponent from "../Mainpage/Mainpage";

export default function RegisterForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const switchAuth = (word) => {
    if (word === "signup") {
      setIsSignup(true);
      setIsLogin(false);
    } else {
      setIsLogin(true);
      setIsSignup(false);
    }
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <>
      {formSubmitted ? (
        <MyComponent />
      ) : (
        <div>
          <div id="buttons">
            <p
              id="signupButton"
              onClick={() => switchAuth("signup")}
              className={isSignup ? "yellow" : "blue"}
            >
              Sign Up
            </p>
            <p
              id="loginButton"
              onClick={() => switchAuth("login")}
              className={isLogin ? "yellow" : "blue"}
            >
              Login
            </p>
          </div>

          {isSignup ? (
            <div id="signup">
              <input type="text" id="first" placeholder="First Name" />
              <input type="text" id="last" placeholder="Last Name" />
              <input type="email" id="email" placeholder="Email" />
              <input type="password" id="password" placeholder="Password" />
              <input
                type="password"
                id="confirm"
                placeholder="Confirm Password"
              />
              <button id="send" onClick={handleSubmit}>
                Send
              </button>
            </div>
          ) : null}

          {isLogin ? (
            <div id="login">
              <input type="email" id="email" placeholder="Email" />
              <input type="password" id="password" placeholder="Password" />
              <button id="send" onClick={handleSubmit}>
                Send
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
