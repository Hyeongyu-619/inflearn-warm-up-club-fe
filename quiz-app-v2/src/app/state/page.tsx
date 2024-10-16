"use client";

import React, { useState, useEffect } from "react";
import questionsData from "../../../public/questions.json";
import "../styles/styles.css";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionsData {
  [key: string]: Question[];
}

const getRandomQuestions = (arr: Question[], n: number): Question[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export default function StatePage() {
  const [category, setCategory] = useState<string>("math");
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number | null;
  }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const data: QuestionsData = questionsData;

  useEffect(() => {
    const randomQuestions = getRandomQuestions(data[category], 2);
    setQuestions(randomQuestions);
    setShowResults(false);
    setSelectedAnswers({});
  }, [category, data]);

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
    setShowResults(false);
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  return (
    <div className="quiz-container">
      <h1>퀴즈 카테고리 선택</h1>
      <div className="category-select">
        <label htmlFor="category-select">카테고리:</label>
        <select
          id="category-select"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="category-dropdown"
        >
          <option value="math">수학</option>
          <option value="alphabet">알파벳</option>
          <option value="korean">국어</option>
        </select>
      </div>
      {questions.map((q, questionIndex: number) => (
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
                showResults && optionIndex === q.correctAnswer
                  ? "correctOption"
                  : showResults &&
                    optionIndex === selectedAnswers[questionIndex]
                  ? "incorrectOption"
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
