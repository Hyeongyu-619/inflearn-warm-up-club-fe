import React, { useState } from "react";
import "./App.css";

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let correctAnswer: number;
  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      while (num1 % num2 !== 0) {
        num2 = Math.floor(Math.random() * 10) + 1;
      }
      correctAnswer = num1 / num2;
      break;
    default:
      correctAnswer = 0;
  }

  const options = [
    correctAnswer,
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
  ].sort(() => Math.random() - 0.5);

  return {
    question: `${num1} ${operator} ${num2} = ?`,
    correctAnswer,
    options,
  };
};

const App: React.FC = () => {
  const [quiz, setQuiz] = useState(generateQuestion());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  const handleOptionClick = (option: number) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
      if (option === quiz.correctAnswer) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    }
  };

  const handleNext = () => {
    setQuiz(generateQuestion());
    setSelectedOption(null);
    setIsCorrect(null);
    setAnswered(false);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>{quiz.question}</h2>
        <ul>
          {quiz.options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="option"
                  checked={selectedOption === option}
                  onChange={() => handleOptionClick(option)}
                  disabled={answered}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        {isCorrect === true && <p className="correct-msg">정답입니다!</p>}
        {isCorrect === false && (
          <p className="wrong-msg">틀렸습니다. 다시 시도하세요.</p>
        )}

        {answered && (
          <button onClick={handleNext} className="next-btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
