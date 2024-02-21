import React from "react";
import { useAuth } from "./AuthContext";

const Mainrender = () => {
  const { authuser, setAuthuser, isLoggedIn, setIsloggedin } = useAuth();

  const login = (e) => {
    e.preventDefault();
    setIsloggedin(true);
    setAuthuser({
      username: "name of the user",
    });
  };

  const logout = (e) => {
    e.preventDefault();
    setIsloggedin(false);
    setAuthuser({});
  };

  return <div></div>;
};

export default Mainrender;
