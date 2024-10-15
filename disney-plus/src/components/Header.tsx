import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./styles/Header.css";
import logo from "../assets/images/disney-logo.svg";

const Header: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <header className="header">
      <img src={logo} alt="Disney+" className="logo" width={80} />
      <div className="profile-section">
        {isLoggedIn && user ? (
          <>
            <img
              src={user.profileImage || "/path/to/default-profile.png"}
              alt="프로필"
              className="profile-image"
            />
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
