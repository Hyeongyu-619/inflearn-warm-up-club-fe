import React from "react";
import { useAuth } from "../hooks/useAuth";
import "./styles/Header.css";

const Header: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className="header">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/disney-logo.jpg`}
        alt="Disney+"
        className="logo"
      />

      <div className="profile-section">
        {isLoggedIn && user ? (
          <>
            <img
              src={
                user.profileImage ||
                `${process.env.PUBLIC_URL}/assets/images/default-profile.png`
              }
              alt="프로필"
              className="profile-image"
            />
            <button onClick={logout} className="logout-btn">
              로그아웃
            </button>
          </>
        ) : (
          <a href="/login" className="login-btn">
            로그인
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
