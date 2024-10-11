import React, { useState, useEffect } from "react";
import "./App.css";

const INITIAL_TIME = 20;
const sentences = [
  "체다치즈를 최고 많이 먹은 최다은이 체다치즈 먹기 대회 최다 우승자이다.",
  "정희수가 희희낙락하게 희끄무리한 흰머리를 뽑으며",
  "내가 그린 기린 그림은 잘 그린 기린 그림이고 네가 그린 기린 그림은 못 그린 기린 그림이다.",
  "저기 계신 저 분이 박 법학박사이시고 여기 계신 이 분이 백 법학박사이시다.",
  "경찰청 철창살은 외철창살이냐 쌍철창살이냐",
  "간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다.",
  "우리집 옆집 앞집 뒷창살은 흩겹창살이고, 우리집 뒷집 앞집 옆창살은 겹흩창살이다.",
  "목동 로얄 뉴로얄 레스토랑 뉴메뉴 미트소시지소스스파게티, 크림소시지소스스테이크",
  "멍멍이네 꿀꿀이는 멍멍해도 꿀꿀하고 꿀꿀이네 멍멍이는 꿀꿀해도 멍멍하다",
  "박범복군은 밤벚꽃놀이를 가고 방범복양은 낮벚꽃놀이를 간다.",
];

function getRandomSentences() {
  const shuffled = sentences.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}

function App() {
  const [sentenceList, setSentenceList] = useState(getRandomSentences());
  const [currentSentence, setCurrentSentence] = useState(sentenceList[0]);
  const [userInput, setUserInput] = useState("");
  const [errors, setErrors] = useState(0);
  const [time, setTime] = useState(INITIAL_TIME);
  const [accuracy, setAccuracy] = useState(100);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalTypedCharacters, setTotalTypedCharacters] = useState(0);

  useEffect(() => {
    if (isTestRunning && time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      handleNextSentence();
    }
  }, [time, isTestRunning]);

  useEffect(() => {
    if (userInput) {
      calculateErrorsAndAccuracy();
    }
  }, [userInput]);

  const startGame = () => {
    const randomSentences = getRandomSentences();
    setSentenceList(randomSentences);
    setCurrentSentence(randomSentences[0]);
    setCurrentSentenceIndex(0);
    setIsTestRunning(true);
    setTime(INITIAL_TIME);
    setUserInput("");
    setTotalTypedCharacters(0);
    setTotalErrors(0);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setTotalTypedCharacters(e.target.value.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNextSentence();
    }
  };

  const calculateErrorsAndAccuracy = () => {
    let errorCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== currentSentence[i]) {
        errorCount++;
      }
    }

    const accuracyValue =
      ((userInput.length - errorCount) / currentSentence.length) * 100;
    setErrors(errorCount);
    setAccuracy(Math.max(0, Math.floor(accuracyValue)));
  };

  const calculateWpmCpm = () => {
    const elapsedTime = INITIAL_TIME - time;
    if (elapsedTime > 0) {
      const typedCharacters = totalTypedCharacters;
      const calculatedCpm = Math.round((typedCharacters / elapsedTime) * 60);
      const calculatedWpm = Math.round(
        typedCharacters / 5 / (elapsedTime / 60)
      );

      setCpm(calculatedCpm);
      setWpm(calculatedWpm);
    }
  };

  const handleNextSentence = () => {
    setTotalErrors(totalErrors + errors);
    if (currentSentenceIndex < 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setCurrentSentence(sentenceList[1]);
      setUserInput("");
      setTime(INITIAL_TIME);
      setErrors(0);
      setAccuracy(100);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setIsTestRunning(false);
    setIsTestCompleted(true);
    calculateWpmCpm();
  };

  const restartGame = () => {
    setSentenceList(getRandomSentences());
    setCurrentSentence("");
    setUserInput("");
    setTime(INITIAL_TIME);
    setErrors(0);
    setAccuracy(100);
    setTotalErrors(0);
    setTotalTypedCharacters(0);
    setWpm(0);
    setCpm(0);
    setIsTestCompleted(false);
    setIsTestRunning(false);
  };

  return (
    <div className="typing-test-container">
      <h1>타이핑 스피드 측정</h1>
      {isTestCompleted ? (
        <div className="result">
          <div className="stats">
            <div>
              <span>WPM</span>
              <p>{wpm}</p>
            </div>
            <div>
              <span>CPM</span>
              <p>{cpm}</p>
            </div>
            <div>
              <span>Errors</span>
              <p>{totalErrors}</p>
            </div>
            <div>
              <span>Time</span>
              <p>0s</p>
            </div>
            <div>
              <span>%Accuracy</span>
              <p>{accuracy}%</p>
            </div>
          </div>
          <button onClick={restartGame} className="start-btn">
            다시 시작
          </button>
        </div>
      ) : (
        <div>
          <div className="stats">
            <div>
              <span>Errors</span>
              <p>{errors}</p>
            </div>
            <div>
              <span>Time</span>
              <p>{time}s</p>
            </div>
            <div>
              <span>%Accuracy</span>
              <p>{accuracy}%</p>
            </div>
          </div>
          <p className="sentence-box">{currentSentence}</p>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyPress}
            disabled={!isTestRunning}
            placeholder="여기에 타이핑을 하세요."
            className="typing-input"
          />
          {!isTestRunning && (
            <button onClick={startGame} className="start-btn">
              게임 시작
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
