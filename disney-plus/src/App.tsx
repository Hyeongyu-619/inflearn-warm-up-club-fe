import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      exchangeAuthCodeForToken(code);
    }
  }, [location]);

  const exchangeAuthCodeForToken = async (code: string) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    const redirectUri = "http://localhost:3000";
    const tokenUrl = "https://oauth2.googleapis.com/token";

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();
    console.log("Access Token:", data.access_token);
    localStorage.setItem("token", data.access_token);
  };

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <MainPage /> : <LoginPage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  );
};

export default App;
