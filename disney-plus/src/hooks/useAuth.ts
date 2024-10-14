import { useState, useEffect } from "react";

interface User {
  profileImage?: string;
  name?: string;
  email?: string;
}

interface AuthContext {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuth = (): AuthContext => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      const url = "https://oauth2.googleapis.com/token";

      const params = new URLSearchParams();
      params.append("code", code);
      params.append("client_id", process.env.REACT_APP_GOOGLE_CLIENT_ID || "");
      params.append(
        "client_secret",
        process.env.REACT_APP_GOOGLE_CLIENT_SECRET || ""
      );
      params.append("redirect_uri", "http://localhost:3000");
      params.append("grant_type", "authorization_code");

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.access_token) {
            return fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            });
          } else {
            throw new Error("Access token not found");
          }
        })
        .then((response) => response.json())
        .then((userData) => {
          const user: User = {
            profileImage: userData.picture,
            name: userData.name,
            email: userData.email,
          };

          localStorage.setItem("token", userData.access_token);
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("OAuth 인증 중 오류 발생:", error);
        });
    }
  }, []);

  const login = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:3000";
    const responseType = "code";
    const scope = "openid profile email";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&prompt=consent&access_type=offline`;

    window.location.href = url;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
};
