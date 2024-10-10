import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const generatePassword = () => {
    if (length < 5 || length > 70) {
      setError("비밀번호 길이는 5에서 70 사이여야 합니다.");
      return;
    }

    setError(null);
    const numbers = "0123456789";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!@#$%^&*()_+[]{}";

    let charset = "";
    if (includeNumbers) charset += numbers;
    if (includeLowercase) charset += lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeSymbols) charset += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="app">
      <h1>비밀번호 생성하기!</h1>

      <div className="input-group">
        <label>길이</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="5"
          max="70"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          숫자 (0-9)
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          소문자 (a-z)
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          대문자 (A-Z)
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          특수문자 (@, !, #, $, %)
        </label>
      </div>

      <button onClick={generatePassword}>비밀번호 생성하기</button>

      {generatedPassword && (
        <div className="password-result">
          <p>{generatedPassword}</p>
          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(generatedPassword)}
          >
            📋
          </button>
        </div>
      )}

      <div className="info-box">
        <p>최소 길이는 5입니다.</p>
        <p>최대 길이는 70입니다.</p>
        <p>강력한 비밀번호는 10~16자여야 합니다.</p>
      </div>
    </div>
  );
};

export default App;
