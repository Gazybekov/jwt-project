import React, { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import Loader from "../homePage/Loader";

const Login = () => {
  const { handleLogin, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSave = () => {
    if (!email.trim() || !password.trim()) {
      alert("Заполните все поля!");
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      handleLogin(formData, email);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Login Page</h1>
      {error ? <h2>{error}</h2> : null}
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        type="text"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <button onClick={handleSave}>Login</button>
    </div>
  );
};

export default Login;
