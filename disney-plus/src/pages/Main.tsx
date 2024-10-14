// /src/pages/Main.tsx
import React, { useState } from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../utils/requests";
import LoginButton from "../components/LoginButton";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="main">
      <Nav />
      {isLoggedIn ? (
        <>
          <Banner />
          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        </>
      ) : (
        <LoginButton onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Main;
