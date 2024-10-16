"use client";

import React, { useState, useEffect } from "react";
import questionsData from "../../../public/questions.json";
import "../styles/styles.css";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

// 랜덤하게 배열에서 n개의 요소 선택 함수
const getRandomQuestions = (arr: Question[], n: number): Question[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export default function QuestionPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const questions = getRandomQuestions(questionsData.math, 2);
    setRandomQuestions(questions);
  }, []);

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);
    setShowResults(false);
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz-container">
      <h1>랜덤 퀴즈</h1>
      {randomQuestions.map((q: Question, questionIndex: number) => (
        <div
          key={questionIndex}
          className={`question-box ${
            showResults
              ? selectedAnswers[questionIndex] === q.correctAnswer
                ? "correct"
                : "incorrect"
              : ""
          }`}
        >
          <p>{q.question}</p>
          {q.options.map((option: string, optionIndex: number) => (
            <label
              key={optionIndex}
              className={`${
                showResults
                  ? optionIndex === q.correctAnswer
                    ? "correctOption"
                    : optionIndex === selectedAnswers[questionIndex]
                    ? "incorrectOption"
                    : ""
                  : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${questionIndex}`}
                onChange={() => handleSelectAnswer(questionIndex, optionIndex)}
                checked={selectedAnswers[questionIndex] === optionIndex}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button className="checkButton" onClick={handleCheckAnswers}>
        정답 확인
      </button>
    </div>
  );
}
