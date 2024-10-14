import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface LoginButtonProps {
  onLoginSuccess: () => void;
}

const generateCodeVerifier = () => {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

const LoginButton: React.FC<LoginButtonProps> = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    onSuccess: async (codeResponse) => {
      console.log("Authorization Code:", codeResponse);

      const codeVerifier = generateCodeVerifier();

      try {
        console.log("Requesting Access Token...");

        const tokenResponse = await axios.post(
          "https://oauth2.googleapis.com/token",
          {
            code: codeResponse.code,
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: "http://localhost:3000",
            grant_type: "authorization_code",
            code_verifier: codeVerifier,
          }
        );

        console.log("Access Token Response:", tokenResponse.data);

        localStorage.setItem("access_token", tokenResponse.data.access_token);
        console.log("Access Token Stored:", tokenResponse.data.access_token);

        onLoginSuccess();
      } catch (error) {
        console.error("Token Request Failed:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return <button onClick={() => login()}>Login with Google</button>; // 로그인 버튼
};

export default LoginButton;
