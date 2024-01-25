import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { API } from "../helpers/const";
import { useNavigate } from "react-router-dom";
const authContext = createContext();
export const useAuth = () => useContext(authContext);
const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [currenUser, setCurrentUser] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  //! REGISTER
  const handleRegister = async (formData) => {
    try {
      await axios.post(`${API}/account/register/`, formData);
      navigate("/register-success");
    } catch (error) {
      setError(error);
    }
  };
  //! LOGIN
  const handleLogin = async (formData, email) => {
    try {
      setloading(true);
      const res = await axios.post(`${API}/account/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      console.log(res);
      navigate("/");
      setCurrentUser(email);
    } catch (error) {
      setError(error);
    } finally {
      setloading(false);
    }
  };
  //! Logout
  const handleLogout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser(null);
    navigate("/login");
  };
  //! checkAuth
  const checkAuth = async () => {
    try {
      setloading(true);
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const res = await axios.post(`${API}/account/token/refresh/`, {
        refresh: tokens.refresh,
      });
      console.log(res);
      localStorage.setItem(
        "tokens",
        JSON.stringify({ access: res.data.access, refresh: tokens.refresh })
      );
      const email = localStorage.getItem("email");
      setCurrentUser(email);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  const values = {
    handleRegister,
    handleLogin,
    loading,
    currenUser,
    handleLogout,
    checkAuth,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
