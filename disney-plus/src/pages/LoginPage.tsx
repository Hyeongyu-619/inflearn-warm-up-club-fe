import React from "react";
import { useAuth } from "../hooks/useAuth";
import "./styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="login-page">
      <h1>Disney+ 로그인</h1>
      <button onClick={login} className="google-login-btn">
        Google로 로그인
      </button>
    </div>
  );
};

export default LoginPage;
