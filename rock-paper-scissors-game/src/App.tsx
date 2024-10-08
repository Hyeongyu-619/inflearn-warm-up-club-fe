import React, { useState } from "react";
import "./App.css";

const choices = ["✌️", "✊", "🖐️"];

const App: React.FC = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const handlePlayerChoice = (choice: string) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computer);
    determineWinner(choice, computer);
  };

  const determineWinner = (player: string, computer: string) => {
    if (player === computer) {
      setResult("비겼다!");
    } else if (
      (player === "✌️" && computer === "🖐️") ||
      (player === "✊" && computer === "✌️") ||
      (player === "🖐️" && computer === "✊")
    ) {
      setPlayerScore(playerScore + 1);
      setResult("플레이어 승리!");
    } else {
      setComputerScore(computerScore + 1);
      setResult("컴퓨터 승리!");
    }
    setRound(round + 1);
  };

  const handleRestart = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRound(1);
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
  };

  return (
    <div className="App">
      <h1>가위 바위 보</h1>
      <div className="scoreboard">
        <div>플레이어: {playerScore}</div>
        <div>컴퓨터: {computerScore}</div>
      </div>
      <div className="selection">
        <p>선택하기 (남은 횟수: {10 - round + 1})</p>
        {round <= 10 ? (
          <div>
            <button onClick={() => handlePlayerChoice("✌️")}>✌️</button>
            <button onClick={() => handlePlayerChoice("✊")}>✊</button>
            <button onClick={() => handlePlayerChoice("🖐️")}>🖐️</button>
            <div className="result">
              <p>플레이어 선택: {playerChoice}</p>
              <p>컴퓨터 선택: {computerChoice}</p>
              <p>{result}</p>
            </div>
          </div>
        ) : (
          <div className="restart">
            <h2>
              게임 끝!{" "}
              {playerScore > computerScore ? "플레이어 승리!" : "컴퓨터 승리!"}
            </h2>
            <button onClick={handleRestart}>재시작</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
