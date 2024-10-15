import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // React Router의 useNavigate 훅 사용

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogoClick = () => {
    navigate("/"); // 로고 클릭 시 메인 페이지로 이동
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "rgba(248, 249, 250, 0.8)", // 불투명한 배경색
        position: "fixed", // 상단에 고정
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000, // 다른 요소보다 앞에 표시
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src="/pokedex-logo.png"
        alt="Pokemon Logo"
        style={{ height: "50px", cursor: "pointer" }}
        onClick={handleLogoClick}
      />
    </header>
  );
};

export default Header;
