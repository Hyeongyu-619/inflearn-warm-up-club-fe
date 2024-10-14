// /src/App.tsx
import React from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <LoginButton
        onLoginSuccess={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Main />
    </div>
  );
}

export default App;
