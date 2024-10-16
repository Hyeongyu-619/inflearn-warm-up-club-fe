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

export default function QuizPage() {
  const [category, setCategory] = useState<string>("math");
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  const data: QuestionsData = questionsData;

  useEffect(() => {
    setQuizQuestions(data[category].slice(0, 4));
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  }, [category, data]);

  const handleSelectAnswer = (optionIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  const handleRestartQuiz = () => {
    setStartQuiz(false);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="quiz-container">
      {!startQuiz ? (
        <>
          <h1>퀴즈</h1>
          <div className="category-select">
            <label htmlFor="category-select">카테고리:</label>
            <select
              id="category-select"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="category-dropdown large-dropdown"
            >
              <option value="math">수학</option>
              <option value="alphabet">알파벳</option>
              <option value="korean">국어</option>
            </select>
          </div>
          <button className="startButton" onClick={handleStartQuiz}>
            테스트 시작
          </button>
        </>
      ) : !showResults ? (
        <>
          <h1>퀴즈</h1>
          {quizQuestions.length > 0 && (
            <div className="question-box">
              <p>{quizQuestions[currentQuestion]?.question}</p>
              {quizQuestions[currentQuestion]?.options.map(
                (option: string, optionIndex: number) => (
                  <label key={optionIndex}>
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      onChange={() => handleSelectAnswer(optionIndex)}
                      checked={selectedAnswers[currentQuestion] === optionIndex}
                    />
                    {option}
                  </label>
                )
              )}
            </div>
          )}
          <button onClick={handleNextQuestion}>
            {currentQuestion < quizQuestions.length - 1 ? "다음" : "결과 확인"}
          </button>
        </>
      ) : (
        <div>
          <h2>결과</h2>
          <p>
            총 {quizQuestions.length} 문제 중{" "}
            {
              selectedAnswers.filter(
                (answer, index) => answer === quizQuestions[index].correctAnswer
              ).length
            }{" "}
            개를 맞췄습니다.
          </p>
          <p>
            {selectedAnswers.filter(
              (answer, index) => answer === quizQuestions[index].correctAnswer
            ).length >= 3
              ? "합격"
              : "불합격"}
          </p>
          <button onClick={handleRestartQuiz}>다시 하기</button>
        </div>
      )}
    </div>
  );
}
