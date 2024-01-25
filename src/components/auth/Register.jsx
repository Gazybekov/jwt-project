import React, { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";

const Register = () => {
  const { handleRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleSave = () => {
    if (!email.trim() || !password || !passwordConfirm.trim()) {
      alert("Заполните все поля");
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirm", passwordConfirm);
      console.group(formData);
      handleRegister(formData);
    }
  };
  return (
    <div>
      <h1>Register</h1>
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
      <input
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="password"
        type="password"
      />
      <button onClick={handleSave}>register</button>
    </div>
  );
};

export default Register;
